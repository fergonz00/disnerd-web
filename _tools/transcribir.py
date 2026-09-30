# -*- coding: utf-8 -*-
"""Transcribe un audio o video (mp4/mov/wav/m4a) a texto, en la maquina, sin subir nada.

    python transcribir.py <archivo> [--modelo small|medium]

Nota: faster-whisper 1.2.1 llama a PyAV con un argumento que PyAV 19 ya no acepta
(`metadata_errors`), y PyAV 14 no compila en este Python. Por eso decodificamos el
audio aca y le pasamos a Whisper el array ya listo, salteando ese camino roto.
"""
import sys, time, argparse
import numpy as np
import av
from faster_whisper import WhisperModel

MUESTREO = 16000


def leer_audio(ruta):
    """Devuelve el audio como float32 mono a 16 kHz, que es lo que espera Whisper."""
    with av.open(ruta, mode="r") as cont:
        pistas = [s for s in cont.streams if s.type == "audio"]
        if not pistas:
            raise SystemExit("El archivo no tiene pista de audio: " + ruta)
        pista = pistas[0]
        remuestreador = av.audio.resampler.AudioResampler(
            format="s16", layout="mono", rate=MUESTREO)
        trozos = []
        for cuadro in cont.decode(pista):
            for salida in remuestreador.resample(cuadro):
                trozos.append(salida.to_ndarray().reshape(-1))
        for salida in remuestreador.resample(None):      # vacia lo que quedo en el buffer
            trozos.append(salida.to_ndarray().reshape(-1))
    if not trozos:
        raise SystemExit("No se pudo decodificar audio de: " + ruta)
    return np.concatenate(trozos).astype(np.float32) / 32768.0


def transcribir(ruta, modelo="small"):
    audio = leer_audio(ruta)
    print("audio: %.1f segundos" % (len(audio) / MUESTREO), flush=True)
    t0 = time.time()
    m = WhisperModel(modelo, device="cpu", compute_type="int8")
    segs, info = m.transcribe(audio, language="es", beam_size=5, vad_filter=True)
    partes = [(s.start, s.end, s.text.strip()) for s in segs]
    print("transcripto en %.0f s con el modelo %s" % (time.time() - t0, modelo), flush=True)
    return partes


if __name__ == "__main__":
    p = argparse.ArgumentParser()
    p.add_argument("archivo")
    p.add_argument("--modelo", default="small")
    p.add_argument("--con-tiempos", action="store_true",
                   help="antepone el minuto de cada frase (util para cortar los reels)")
    a = p.parse_args()
    for ini, fin, txt in transcribir(a.archivo, a.modelo):
        if a.con_tiempos:
            print("[%02d:%02d] %s" % (int(ini // 60), int(ini % 60), txt))
        else:
            print(txt)

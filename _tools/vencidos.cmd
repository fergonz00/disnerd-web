@echo off
REM Chequeo diario de los presupuestos de disnerd.com.ar: da de baja los que ya
REM vencieron (el dia del check in) y avisa a Fer por WhatsApp. Si no hay nada
REM que hacer no molesta a nadie; el dia 1 de cada mes avisa igual, para que el
REM silencio no se confunda con "se murio la tarea".
REM
REM Tarea programada: "Disnerd - presupuestos vencidos", 09:20 todos los dias, con
REM "iniciar lo antes posible si se paso la hora": si la PC estaba apagada, corre
REM al prenderla. No importa cuantos dias falte: compara contra la fecha de hoy,
REM no contra la ultima corrida.
REM
REM OJO: hay que apuntar al python del venv. El Programador de tareas no hereda
REM el PATH y "python" le resuelve al del sistema.
cd /d "%~dp0"
set PYTHONIOENCODING=utf-8
set PY=C:\proyectos\scraper-autoahorro\.venv\Scripts\python.exe
if not exist "%PY%" (
  echo ERROR: no encuentro el interprete %PY% >> "_vencidos.log"
  exit /b 9
)
echo. >> "_vencidos.log"
echo ===== %DATE% %TIME% ===== >> "_vencidos.log"
"%PY%" -u vencidos.py >> "_vencidos.log" 2>&1
exit /b %ERRORLEVEL%

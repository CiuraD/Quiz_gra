@echo off

rem Uruchamianie API w osobnym oknie CMD
start "Uruchamianie API" cmd /k "cd /d ./quiz_backend && mvn spring-boot:run"

rem Uruchamianie Aplikacji Internetowej w osobnym oknie CMD
start "Uruchamianie Aplikacji Internetowej" cmd /k "cd /d ./quiz_game && ng serve"

pause
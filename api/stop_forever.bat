echo off
echo Stopping forever process

call forever stop %1 || goto :1

goto :2

:1
echo There is not a forever process running

goto end
:2
echo Sopped the process susseccfully
goto end

:end
call powershell -Command  Stop-Process -Id (Get-NetTCPConnection -LocalPort 8099).OwningProcess
set errorLevel = 0
echo Finishing....
exit /b 0
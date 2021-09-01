$app_location = "E:\WebDev\MusicUtils\"

& ($app_location + "env\Scripts\Activate.ps1")

$env:FLASK_APP = $app_location + "API.py"
$env:FLASK_ENV = "development"
$env:FLASK_RUN_PORT = 5001

flask run

pause

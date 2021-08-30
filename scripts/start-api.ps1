$app_location = "E:\WebDev\MusicUtils\"

& ($app_location + "env\Scripts\Activate.ps1")
$env:FLASK_APP = $app_location + "API.py"
flask run --port 5001

pause

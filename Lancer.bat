@echo off
:: Affiche les commandes exécutées
echo Building Docker images...
docker-compose build

:: Vérifie si la commande précédente a réussi
if %errorlevel% neq 0 (
    echo Error building Docker images. Exiting...
    exit /b %errorlevel%
)

echo Starting Docker containers...
start /b docker-compose up

:: Vérifie si la commande précédente a réussi
if %errorlevel% neq 0 (
    echo Error starting Docker containers. Exiting...
    exit /b %errorlevel%
)

:: Attendre quelques secondes pour s'assurer que les conteneurs démarrent
timeout /t 5 /nobreak

:: Ouvre le navigateur web avec l'URL de l'application
echo Opening web browser...
start http://localhost:3001

:: Attendre une touche pour fermer le script
echo Press any key to exit...
pause >nul
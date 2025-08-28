@echo off
title Hapus Remote GitHub
echo 🚀 Mencari repo Git di folder ini dan subfolder...
echo.

REM Loop semua folder yang ada .git
for /r %%i in (.git) do (
    set "repo=%%~dpi"
    echo 📂 Repo ditemukan: %%~dpi
    cd /d %%~dpi

    git remote remove origin 2>nul
    if %errorlevel%==0 (
        echo ✅ Remote 'origin' dihapus.
    ) else (
        echo ⚠️ Tidak ada remote 'origin' atau sudah dihapus.
    )
    echo.
)

echo 🔒 Logout GitHub dari VS Code (jika terbuka)...
code --command "github.signout"

echo.
echo 🔥 Semua remote GitHub sudah diputus!
pause

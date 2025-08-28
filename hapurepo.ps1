# =========================================
# Script: hapurepo.ps1
# Fungsi : Hapus semua remote GitHub (origin) di folder ini & subfolder
# =========================================

Write-Host "🚀 Mencari semua repo Git di folder: $PWD" -ForegroundColor Cyan

# Cari semua folder yang punya .git
$repos = Get-ChildItem -Recurse -Force -Directory -ErrorAction SilentlyContinue | Where-Object { Test-Path "$($_.FullName)\.git" }

foreach ($repo in $repos) {
    Write-Host "📂 Repo ditemukan: $($repo.FullName)" -ForegroundColor Yellow
    Set-Location $repo.FullName

    try {
        # Hapus remote origin
        git remote remove origin
        Write-Host "✅ Remote 'origin' dihapus." -ForegroundColor Green
    }
    catch {
        Write-Host "⚠️ Tidak ada remote 'origin' atau error lain." -ForegroundColor Red
    }

    # Balik ke folder utama setelah selesai tiap repo
    Set-Location $PSScriptRoot
}

# Logout GitHub dari VS Code (opsional, hanya kalau VS Code terbuka)
try {
    Write-Host "🔒 Logout GitHub dari VS Code..."
    code --command "github.signout"
} catch {
    Write-Host "⚠️ VS Code tidak terbuka atau perintah tidak didukung." -ForegroundColor Red
}

Write-Host "🔥 Semua remote GitHub sudah diputus!" -ForegroundColor Cyan

# AutoCommit.ps1
Set-Location "D:\OneDrive\Documents\02. Web Project\Dental"

git add .
git commit -m "auto commit on $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
git push origin main

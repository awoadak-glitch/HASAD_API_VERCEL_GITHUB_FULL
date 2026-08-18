param(
  [string]$Base = "https://hasad-api-vercel-github-full.vercel.app"
)

Write-Host "=== HEALTH ==="
curl.exe -s "$Base/api/health"
Write-Host "`n"

Write-Host "=== V10 LOGIN ==="
curl.exe -s -X POST "$Base/connect" `
  -H "Content-Type: application/x-www-form-urlencoded" `
  --data "game=PUBG&user_key=AWR-2026&serial=TEST-V10&verrr=1.0.0"
Write-Host "`n"

Write-Host "=== V2 LOGIN ==="
curl.exe -s -X POST "$Base/connect" `
  -H "Content-Type: application/x-www-form-urlencoded" `
  --data "game=VIP&user_key=AWR-2026&serial=TEST-V2"
Write-Host "`n"

Write-Host "=== VERIFY ==="
curl.exe -s -X POST "$Base/verify.php" `
  -H "Content-Type: application/x-www-form-urlencoded" `
  --data "license_key=FAHAD41&package=pubgm.loader&signature=0123456789abcdef0123456789abcdef"
Write-Host "`n"

Write-Host "=== V10 CONFIG ==="
curl.exe -s "$Base/bypass/HASADVIP1/Hasad.json"
Write-Host "`n"

Write-Host "=== V2 CONFIG ==="
curl.exe -s "$Base/bypass/furybbox1.json"
Write-Host "`n"

Write-Host "=== V2 RUNTIME PLACEHOLDER ==="
curl.exe -s "$Base/bypass/FAHAD.json"
Write-Host "`n"

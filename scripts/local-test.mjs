const base = process.argv[2] || "http://localhost:3000";

const body = new URLSearchParams({
  game: "PUBG",
  user_key: "AWR-2026",
  serial: "TEST-DEVICE",
  verrr: "1.0.0"
});

const r = await fetch(`${base}/connect`, {
  method: "POST",
  headers: {"content-type": "application/x-www-form-urlencoded"},
  body
});

console.log("HTTP", r.status);
console.log(await r.text());

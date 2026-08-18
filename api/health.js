import { respond } from "./_common.js";

export async function GET(request) {
  const url = new URL(request.url);
  const origin = `${url.protocol}//${url.host}`;

  return respond({
    ok: true,
    service: "HASAD V10 + IRAQ-BX V2 API",
    time: new Date().toISOString(),
    endpoints: {
      connect: `${origin}/connect`,
      verify: `${origin}/verify.php`,
      v10Config: `${origin}/bypass/HASADVIP1/Hasad.json`,
      v2Config: `${origin}/bypass/furybbox1.json`,
      v2Resource: `${origin}/bypass/furybbox1.zip`,
      v2Runtime: `${origin}/bypass/FAHAD.json`
    }
  });
}

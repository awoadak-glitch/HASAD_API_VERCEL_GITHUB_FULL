export async function GET() {
  return Response.json({
    ok: true,
    service: "HASAD API",
    time: new Date().toISOString()
  });
}

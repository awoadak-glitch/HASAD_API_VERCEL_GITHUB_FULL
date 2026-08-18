import crypto from "node:crypto";

export function respond(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store, max-age=0"
    }
  });
}

export async function parseBody(request) {
  const type = (request.headers.get("content-type") || "").toLowerCase();

  if (type.includes("application/json")) {
    return await request.json();
  }

  const raw = await request.text();
  return Object.fromEntries(new URLSearchParams(raw).entries());
}

export function usersFromEnv() {
  try {
    const parsed = JSON.parse(process.env.USERS_JSON || "{}");
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function expiryToMs(exp) {
  if (typeof exp !== "string") return NaN;
  return Date.parse(exp.replace(" ", "T"));
}

export function md5(value) {
  return crypto.createHash("md5").update(value, "utf8").digest("hex");
}

export function allowedForGame(user, game) {
  if (!Array.isArray(user?.games) || user.games.length === 0) return true;
  return user.games.includes(game);
}

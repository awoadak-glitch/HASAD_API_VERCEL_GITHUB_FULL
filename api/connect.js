import crypto from "node:crypto";

function respond(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store, max-age=0"
    }
  });
}

function usersFromEnv() {
  try {
    const value = JSON.parse(process.env.USERS_JSON || "{}");
    return value && typeof value === "object" ? value : {};
  } catch {
    return {};
  }
}

function expiryToMs(exp) {
  if (typeof exp !== "string") return NaN;
  return Date.parse(exp.replace(" ", "T"));
}

async function requestBody(request) {
  const type = (request.headers.get("content-type") || "").toLowerCase();

  if (type.includes("application/json")) {
    return await request.json();
  }

  const raw = await request.text();
  return Object.fromEntries(new URLSearchParams(raw).entries());
}

export async function GET() {
  return respond({
    status: true,
    service: "connect",
    message: "API is running"
  });
}

export async function POST(request) {
  let body;
  try {
    body = await requestBody(request);
  } catch {
    return respond({ status: false, reason: "INVALID_REQUEST" }, 400);
  }

  const game = String(body?.game || "");
  const userKey = String(body?.user_key || "");
  const serial = String(body?.serial || "");
  const version = String(body?.verrr || "");

  if (!game || !userKey || !serial || !version) {
    return respond({ status: false, reason: "MISSING_FIELDS" }, 400);
  }

  if (game !== "PUBG") {
    return respond({ status: false, reason: "INVALID_GAME" }, 403);
  }

  const expectedVersion = process.env.APP_VERSION || "1.0.0";
  if (version !== expectedVersion) {
    return respond({ status: false, reason: "UPDATE_REQUIRED" }, 403);
  }

  const users = usersFromEnv();
  const user = users[userKey];

  if (!user || user.enabled !== true) {
    return respond({ status: false, reason: "INVALID_KEY" }, 403);
  }

  if (user.serial && user.serial !== "*" && user.serial !== serial) {
    return respond({ status: false, reason: "DEVICE_MISMATCH" }, 403);
  }

  const exp = String(user.exp || "");
  const expMs = expiryToMs(exp);

  if (!Number.isFinite(expMs)) {
    return respond({ status: false, reason: "INVALID_EXPIRY" }, 500);
  }

  if (Date.now() >= expMs) {
    return respond({ status: false, reason: "EXPIRED" }, 403);
  }

  const rng = Math.floor(Date.now() / 1000);
  const salt = process.env.TOKEN_SALT || "Vm8Lk7Uj2JmsjCPVPVjrLa7zgfx3uz9E";
  const real = `PUBG-${userKey}-${serial}-${salt}`;
  const token = crypto.createHash("md5").update(real, "utf8").digest("hex");

  return respond({
    status: true,
    data: {
      token,
      EXP: exp,
      rng
    }
  });
}

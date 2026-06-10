// Rate limiting simple en memoria por IP (suficiente para el MVP en una instancia).
// Para multi-instancia en producción, migrar a KV/Upstash.

const WINDOW_MS = 60 * 60 * 1000; // 1 hora
const MAX_REQUESTS = 6; // 6 estudios por hora por IP

const hits = new Map<string, number[]>();

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
}

export function checkRateLimit(ip: string): RateLimitResult {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) {
    hits.set(ip, recent);
    return { allowed: false, remaining: 0 };
  }

  recent.push(now);
  hits.set(ip, recent);
  return { allowed: true, remaining: MAX_REQUESTS - recent.length };
}

export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

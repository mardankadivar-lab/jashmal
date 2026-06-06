// Envío de correos vía Resend (sin SDK, con fetch). Por ahora: el enlace
// mágico del login de la Comunidad. RESEND_API_KEY y RESEND_FROM en .env.local.
const FROM = process.env.RESEND_FROM || "Jashmal <onboarding@resend.dev>";

export async function sendMagicLink(to: string, link: string): Promise<{ ok: boolean; error?: string }> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { ok: false, error: "RESEND_API_KEY no configurada" };
  const html = `
  <div style="background:#05050a;color:#e8e4d8;font-family:Georgia,'Times New Roman',serif;padding:44px 24px;text-align:center">
    <div style="font-size:32px;color:#c9a43e;letter-spacing:.06em">חַשְׁמַל</div>
    <div style="font-size:12px;letter-spacing:.32em;text-transform:uppercase;color:#c9a43e99;margin:6px 0 30px">Jashmal · La Comunidad</div>
    <p style="font-size:17px;line-height:1.6;margin:0 0 30px;color:#e8e4d8">Toca el botón para entrar a tu cielo de estudio.</p>
    <a href="${link}" style="display:inline-block;background:#c9a43e;color:#05050a;text-decoration:none;font-weight:bold;padding:14px 34px;border-radius:999px;letter-spacing:.05em">Entrar a Jashmal →</a>
    <p style="font-size:12px;color:#9a8a5a;margin:30px 0 0">El enlace caduca en 30 minutos. Si no lo pediste, ignora este correo.</p>
  </div>`;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: FROM, to, subject: "Tu enlace para entrar a Jashmal 🕯️", html }),
    });
    if (!res.ok) {
      const detail = (await res.text().catch(() => "")).slice(0, 200);
      return { ok: false, error: `Resend ${res.status}: ${detail}` };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

import Link from "next/link";
import { getSession } from "@/lib/communitySession";
import { getUserByEmail } from "@/lib/community";
import LoginForm from "@/components/community/LoginForm";

export const dynamic = "force-dynamic";

const LEVELS: Record<string, { he: string; es: string }> = {
  talmid: { he: "תַּלְמִיד", es: "Talmid" },
  shoel: { he: "שׁוֹאֵל", es: "Shoel" },
  javer: { he: "חָבֵר", es: "Javer" },
  maguid: { he: "מַגִּיד", es: "Maguid" },
  jajam: { he: "חָכָם", es: "Jajam" },
  mekubal: { he: "מְקֻבָּל", es: "Mekubal" },
};

export default async function ComunidadPage() {
  const session = await getSession();
  const user = session ? await getUserByEmail(session.email) : null;
  const lvl = user ? LEVELS[user.level] ?? { he: "", es: user.level } : null;

  return (
    <div className="always-dark min-h-screen" style={{ background: "#05050a" }}>
      <div className="mx-auto max-w-md px-6 py-20 text-center text-parchment">
        <p className="hebrew text-3xl text-gold" style={{ filter: "drop-shadow(0 0 10px #c9a43e55)" }}>
          חַשְׁמַל
        </p>
        <p className="mb-12 font-cinzel text-xs uppercase tracking-[0.3em] text-gold/50">
          La Comunidad de Jashmal
        </p>

        {user ? (
          <div>
            <p className="font-cinzel text-2xl text-gold">Tu Cielo</p>
            <p className="mt-2 text-sm text-parchment/70">Shalom{user.name ? `, ${user.name}` : ""} 🕯️</p>
            <div className="mt-8 rounded-2xl border border-gold/20 bg-gold/[0.04] p-6">
              <p className="hebrew text-3xl text-gold" style={{ filter: "drop-shadow(0 0 8px #c9a43e44)" }}>{lvl?.he}</p>
              <p className="mt-1 font-cinzel text-sm uppercase tracking-widest text-parchment/80">{lvl?.es}</p>
              <div className="mt-5 flex justify-center gap-10 text-sm">
                <div>
                  <span className="font-cinzel text-2xl text-gold">{user.stars}</span>
                  <br />
                  <span className="text-[11px] uppercase tracking-wide text-muted/60">estrellas</span>
                </div>
                <div>
                  <span className="font-cinzel text-2xl text-gold">{user.light}</span>
                  <br />
                  <span className="text-[11px] uppercase tracking-wide text-muted/60">luz</span>
                </div>
              </div>
            </div>
            <p className="mt-8 text-sm italic leading-relaxed text-muted/60">
              Pronto podrás compartir tus revelaciones y encender tu primera estrella en la galaxia Comunidad.
            </p>
            <Link
              href="/universo"
              className="mt-8 inline-block rounded-full border border-gold/30 px-5 py-2 font-cinzel text-xs uppercase tracking-widest text-gold transition-all hover:bg-gold/10"
            >
              Ver el universo →
            </Link>
          </div>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
}

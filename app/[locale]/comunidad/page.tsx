import Link from "next/link";
import { getSession } from "@/lib/communitySession";
import { getUserByEmail } from "@/lib/community";
import { levelForStars } from "@/lib/communityLevels";
import LoginForm from "@/components/community/LoginForm";
import ShareRevelation from "@/components/community/ShareRevelation";

export const dynamic = "force-dynamic";

export default async function ComunidadPage() {
  const session = await getSession();
  const user = session ? await getUserByEmail(session.email) : null;
  const prog = user ? levelForStars(user.stars, user.level) : null;
  const lvl = prog ? { he: prog.current.he, es: prog.current.es } : null;

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
              {prog?.next ? (
                <p className="mt-5 border-t border-gold/10 pt-4 text-xs leading-relaxed text-parchment/65">
                  {prog.toNext === 0 ? (
                    <>Estás a las puertas de <span className="text-gold/90">{prog.next.es}</span>.</>
                  ) : (
                    <>
                      Te {prog.toNext === 1 ? "falta" : "faltan"}{" "}
                      <span className="font-cinzel text-gold/90">{prog.toNext}</span>{" "}
                      {prog.toNext === 1 ? "estrella" : "estrellas"} para{" "}
                      <span className="text-gold/90">{prog.next.es}</span>{" "}
                      <span className="hebrew">{prog.next.he}</span>.
                    </>
                  )}
                </p>
              ) : prog ? (
                <p className="mt-5 border-t border-gold/10 pt-4 text-xs leading-relaxed text-gold/60">
                  Has alcanzado la cima del ascenso por estrellas. <span className="hebrew">מְקֻבָּל</span> (Mekubal) se otorga a mano.
                </p>
              ) : null}
            </div>
            <div className="mt-10 border-t border-gold/10 pt-8 text-center">
              <p className="hebrew mb-1 text-2xl text-gold" style={{ filter: "drop-shadow(0 0 8px #c9a43e44)" }}>חִדּוּשׁ</p>
              <p className="mb-6 font-cinzel text-xs uppercase tracking-[0.25em] text-gold/50">Comparte tu revelación</p>
              <ShareRevelation />
            </div>
            <Link
              href="/universo"
              className="mt-8 inline-block rounded-full border border-gold/30 px-5 py-2 font-cinzel text-xs uppercase tracking-widest text-gold transition-all hover:bg-gold/10"
            >
              Ver la Mente Cósmica →
            </Link>
          </div>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
}

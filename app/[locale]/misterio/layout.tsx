import MisterioTutor from "@/components/MisterioTutor";

// Layout de las páginas de misterio: añade el tutor flotante a todas
// (/misterio/358, /26, /linaje, /habakuk...) sin repetirlo en cada una.
export default function MisterioLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <MisterioTutor />
    </>
  );
}

import { useAvisos } from "../context/AvisosContext";

export default function AvisoRapido() {
  const { aviso } = useAvisos();

  return (
    <div className="aviso-rapido-area" role="status" aria-live="polite">
      {aviso && (
        <div className="aviso-rapido" key={aviso.id}>
          {aviso.texto}
        </div>
      )}
    </div>
  );
}

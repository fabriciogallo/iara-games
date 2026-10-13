import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { CHAVES, gravarJson, lerJson } from "../utils/armazenamento";

const FavoritosContext = createContext(null);

function lerFavoritos() {
  const salvos = lerJson(CHAVES.favoritos, []);
  return Array.isArray(salvos) ? salvos.filter((id) => typeof id === "string") : [];
}

export function FavoritosProvider({ children }) {
  const [ids, setIds] = useState(lerFavoritos);

  useEffect(() => {
    gravarJson(CHAVES.favoritos, ids);
  }, [ids]);

  const alternar = useCallback((id) => {
    setIds((atuais) => (atuais.includes(id) ? atuais.filter((outro) => outro !== id) : [...atuais, id]));
  }, []);

  const valor = useMemo(() => ({ favoritos: new Set(ids), alternar }), [ids, alternar]);
  return <FavoritosContext.Provider value={valor}>{children}</FavoritosContext.Provider>;
}

export function useFavoritos() {
  const contexto = useContext(FavoritosContext);
  if (!contexto) throw new Error("useFavoritos precisa estar dentro de <FavoritosProvider>");
  return contexto;
}

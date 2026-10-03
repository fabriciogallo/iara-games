import { AvisosProvider } from "./context/AvisosContext";
import { CarrinhoProvider } from "./context/CarrinhoContext";
import { FavoritosProvider } from "./context/FavoritosContext";

// Tudo que as telas compartilham: avisos rápidos, favoritos e carrinho
export default function Providers({ children }) {
  return (
    <AvisosProvider>
      <FavoritosProvider>
        <CarrinhoProvider>{children}</CarrinhoProvider>
      </FavoritosProvider>
    </AvisosProvider>
  );
}

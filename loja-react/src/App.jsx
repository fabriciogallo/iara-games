import { HashRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Carrinho from "./pages/Carrinho";
import Jogo from "./pages/Jogo";
import Loja from "./pages/Loja";
import NaoEncontrado from "./pages/NaoEncontrado";
import Providers from "./Providers";

// As rotas ficam separadas do roteador pra os testes usarem um roteador de memória
export function Rotas() {
  return (
    <Providers>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Loja />} />
          <Route path="jogo/:id" element={<Jogo />} />
          <Route path="carrinho" element={<Carrinho />} />
          <Route path="*" element={<NaoEncontrado />} />
        </Route>
      </Routes>
    </Providers>
  );
}

// HashRouter (endereços como /#/jogo/dandara) funciona em hospedagem estática, que não sabe redirecionar rotas de React
export default function App() {
  return (
    <HashRouter>
      <Rotas />
    </HashRouter>
  );
}

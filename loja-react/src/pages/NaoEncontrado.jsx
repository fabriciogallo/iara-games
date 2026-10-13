import { Link } from "react-router-dom";
import { useTituloDaPagina } from "../hooks/usePagina";

export default function NaoEncontrado({ mensagem = "Não encontramos essa página." }) {
  useTituloDaPagina("Página não encontrada — Iara Games");

  return (
    <main className="py-5">
      <div className="container text-center py-5">
        <i className="bi bi-compass display-1 text-warning mb-4 d-block" aria-hidden="true"></i>
        <h1 className="fw-bold mb-3">Ops!</h1>
        <p className="mb-4 text-secondary">{mensagem}</p>
        <Link to="/" className="btn btn-warning fw-bold px-4 py-2">
          Voltar para a loja
        </Link>
      </div>
    </main>
  );
}

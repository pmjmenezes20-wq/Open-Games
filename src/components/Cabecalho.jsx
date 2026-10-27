import { NavLink } from "react-router-dom";

export default function Cabecalho() {
    return (
        <header className="cabecalho">
            <a className="pular-conteudo" href="#conteudo">Pular para o conteúdo</a>
            <div className="container cabecalho-conteudo">
                <span className="marca">Game Explorer</span>
                <nav aria-label="Navegação principal">
                    <NavLink to="/" end>Catálogo</NavLink>
                    <NavLink to="/minha-estante">Minha estante</NavLink>
                    <NavLink to="/sobre">Sobre</NavLink>
                </nav>
            </div>
        </header>
    );
}

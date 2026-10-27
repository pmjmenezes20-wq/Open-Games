import { Route, Routes } from "react-router-dom";
import Cabecalho from "./components/Cabecalho.jsx";
import Catalogo from "./pages/Catalogo.jsx";
import MinhaEstante from "./pages/MinhaEstante.jsx";
import NaoEncontrada from "./pages/NaoEncontrada.jsx";
import Sobre from "./pages/Sobre.jsx";

export default function App() {
    return (
        <>
            <Cabecalho />
            <main id="conteudo" className="container">
                <Routes>
                    <Route path="/" element={<Catalogo />} />
                    <Route path="/minha-estante" element={<MinhaEstante />} />
                    <Route path="/sobre" element={<Sobre />} />
                    <Route path="*" element={<NaoEncontrada />} />
                </Routes>
            </main>
        </>
    );
}

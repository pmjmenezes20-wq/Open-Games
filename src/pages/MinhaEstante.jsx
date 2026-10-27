import { useState } from "react";
import JogoCard from "../components/JogoCard.jsx";
import { useEstante } from "../hooks/useEstante.js";

export default function MinhaEstante() {
    const { jogos, remover } = useEstante();
    const [erro, setErro] = useState("");

    function removerDaEstante(id) {
        try {
            remover(id);
            setErro("");
        } catch (falha) {
            setErro(falha.message);
        }
    }

    return (
        <section aria-labelledby="titulo-estante">
            <h1 id="titulo-estante">Minha estante</h1>
            <p>Seus jogos salvos ficam guardados neste navegador.</p>

            {erro && <p role="alert">{erro}</p>}

            {jogos.length === 0 ? (
                <p>Sua estante está vazia. Acesse o catálogo e selecione “Salvar na estante” em qualquer jogo.</p>
            ) : (
                <>
                    <p role="status">Você salvou {jogos.length} {jogos.length === 1 ? "jogo" : "jogos"}.</p>
                    <div className="grade-jogos">
                        {jogos.map((jogo) => (
                            <JogoCard
                                key={jogo.id}
                                jogo={jogo}
                                onRemover={removerDaEstante}
                            />
                        ))}
                    </div>
                </>
            )}
        </section>
    );
}

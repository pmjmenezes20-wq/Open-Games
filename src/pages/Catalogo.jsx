import { useEffect, useState } from "react";
import FormularioBusca from "../components/FormularioBusca.jsx";
import JogoCard from "../components/JogoCard.jsx";
import { pesquisarJogos } from "../service/freeToGame.js";
import { useEstante } from "../hooks/useEstante.js";

export default function Catalogo() {
    const [consulta, setConsulta] = useState({ termo: "", tentativa: 0 });
    const [jogos, setJogos] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState("");
    const [pesquisou, setPesquisou] = useState(false);
    const { jogos: jogosSalvos, salvar } = useEstante();
    const [mensagemEstante, setMensagemEstante] = useState("");

    // A FreeToGame não oferece pesquisa textual; o serviço filtra os títulos localmente.
    useEffect(() => {
        const controller = new AbortController();
        let ativa = true;

        async function carregar() {
            setCarregando(true);
            setErro("");
            setPesquisou(true);

            try {
                const resultado = await pesquisarJogos(consulta.termo, {
                    signal: controller.signal,
                });
                if (ativa) setJogos(resultado);
            } catch (falha) {
                if (falha.name === "AbortError") return;
                console.error(falha);
                if (ativa) {
                    setErro("Não foi possível buscar os jogos. Verifique a conexão e tente novamente.");
                }
            } finally {
                if (ativa) setCarregando(false);
            }
        }

        carregar();
        return () => {
            ativa = false;
            controller.abort();
        };
    }, [consulta]);

    function buscar(termo) {
        setConsulta((anterior) => ({
            termo,
            tentativa: anterior.tentativa + 1,
        }));
    }

    return (
        <section aria-labelledby="titulo-catalogo">
            <h1 id="titulo-catalogo">Catálogo de jogos gratuitos</h1>
            <p>Explore jogos free-to-play para PC e navegador.</p>
            <FormularioBusca onBuscar={buscar} carregando={carregando} />
            {mensagemEstante && <p role="status">{mensagemEstante}</p>}

            {!consulta.termo && !pesquisou && (
                <p>Digite o nome de um jogo para pesquisar.</p>
            )}
            {carregando && <p role="status">Consultando a FreeToGame...</p>}

            {!carregando && erro && (
                <div role="alert">
                    <p>{erro}</p>
                    <button type="button" onClick={() => buscar(consulta.termo)}>
                        Tentar novamente
                    </button>
                </div>
            )}

            {pesquisou && !carregando && !erro && (
                <>
                    <p role="status">
                        Jogos encontrados nesta busca: {jogos.length}.
                    </p>
                    {jogos.length === 0 ? (
                        <p>Nenhum jogo encontrado. Tente outro termo.</p>
                    ) : (
                        <div className="grade-jogos">
                            {jogos.map((jogo) => (
                                <JogoCard
                                    key={jogo.id}
                                    jogo={jogo}
                                    salvo={jogosSalvos.some((salvo) => salvo.id === jogo.id)}
                                    onSalvar={(jogoSelecionado) => {
                                        try {
                                            salvar(jogoSelecionado);
                                            setMensagemEstante(`${jogoSelecionado.titulo} foi salvo na sua estante.`);
                                        } catch (falha) {
                                            setMensagemEstante(falha.message);
                                        }
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}

            <p className="atribuicao-api">
                Dados fornecidos por{" "}
                <a href="https://www.freetogame.com/" target="_blank" rel="noreferrer">
                    FreeToGame
                </a>.
            </p>
        </section>
    );
}

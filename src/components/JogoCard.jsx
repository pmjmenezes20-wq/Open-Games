export default function JogoCard({ jogo, salvo = false, onSalvar, onRemover }) {
    return (
        <article className="jogo-card">
            {jogo.imagem && (
                <img
                    className="jogo-capa"
                    src={jogo.imagem}
                    alt={`Imagem de ${jogo.titulo}`}
                    loading="lazy"
                    onError={(event) => {
                        event.currentTarget.hidden = true;
                    }}
                />
            )}
            <h2>{jogo.titulo}</h2>
            <p>{jogo.descricao}</p>
            <p><strong>Gênero:</strong> {jogo.genero}</p>
            <p><strong>Plataforma:</strong> {jogo.plataforma}</p>
            <p><strong>Desenvolvedora:</strong> {jogo.desenvolvedora}</p>
            <p><strong>Lançamento:</strong> {jogo.lancamento}</p>

            <div className="jogo-acoes">
                {onSalvar && (
                    <button
                        type="button"
                        onClick={() => onSalvar(jogo)}
                        disabled={salvo}
                        aria-label={salvo ? `${jogo.titulo} já está na estante` : `Salvar ${jogo.titulo} na estante`}
                    >
                        {salvo ? "✓ Salvo na estante" : "＋ Salvar na estante"}
                    </button>
                )}
                {onRemover && (
                    <button
                        type="button"
                        className="botao-secundario"
                        onClick={() => onRemover(jogo.id)}
                        aria-label={`Remover ${jogo.titulo} da estante`}
                    >
                        Remover da estante
                    </button>
                )}
                {jogo.url && (
                    <a href={jogo.url} target="_blank" rel="noreferrer">
                        Página do jogo
                    </a>
                )}
            </div>
        </article>
    );
}

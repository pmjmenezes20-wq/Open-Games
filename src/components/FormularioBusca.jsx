export default function FormularioBusca({ onBuscar, carregando }) {
    function enviar(event) {
        event.preventDefault();
        const dados = new FormData(event.currentTarget);
        const termo = String(dados.get("termo") ?? "").trim();
        if (termo) onBuscar(termo);
    }

    return (
        <form onSubmit={enviar} aria-label="Buscar jogos gratuitos">
            <label htmlFor="termo-api">Nome do jogo</label>
            <input
                id="termo-api"
                name="termo"
                type="search"
                required
                placeholder="Ex.: Fortnite"
            />
            <button type="submit" disabled={carregando}>
                {carregando ? "Buscando..." : "Buscar jogos"}
            </button>
        </form>
    );
}

const BASE_URL = "https://www.freetogame.com/api";

let jogosEmCache = null;

export async function pesquisarJogos(termo = "", { signal } = {}) {
    if (!jogosEmCache) {
        const resposta = await fetch(`${BASE_URL}/games`, { signal });

        if (!resposta.ok) {
            throw new Error(`Falha HTTP: ${resposta.status}`);
        }

        const dados = await resposta.json();

        if (!Array.isArray(dados)) {
            throw new Error("A API retornou um formato inesperado.");
        }

        jogosEmCache = dados.map((jogo) => ({
            id: jogo.id,
            titulo: jogo.title || "Título não informado",
            descricao: jogo.short_description || "Descrição não disponível.",
            genero: jogo.genre || "Não informado",
            plataforma: jogo.platform || "Não informada",
            desenvolvedora: jogo.developer || "Não informada",
            publicadora: jogo.publisher || "Não informada",
            lancamento: jogo.release_date || "Não informado",
            imagem: jogo.thumbnail || null,
            url: jogo.game_url || null,
        }));
    }

    const pesquisa = termo.trim().toLocaleLowerCase("pt-BR");

    if (!pesquisa) return jogosEmCache;

    return jogosEmCache.filter((jogo) =>
        jogo.titulo.toLocaleLowerCase("pt-BR").includes(pesquisa)
    );
}

export async function buscarDetalhesJogo(id, { signal } = {}) {
    const parametros = new URLSearchParams({ id: String(id) });
    const resposta = await fetch(`${BASE_URL}/game?${parametros.toString()}`, { signal });

    if (!resposta.ok) {
        throw new Error(`Falha HTTP: ${resposta.status}`);
    }

    return resposta.json();
}

import { useCallback, useSyncExternalStore } from "react";

const CHAVE_ESTANTE = "game-explorer-estante";
const EVENTO_ESTANTE = "game-explorer-estante-atualizada";

function obterSnapshot() {
    try {
        return localStorage.getItem(CHAVE_ESTANTE) || "[]";
    } catch {
        return "[]";
    }
}

function obterSnapshotServidor() {
    return "[]";
}

function notificarMudanca() {
    window.dispatchEvent(new Event(EVENTO_ESTANTE));
}

function observarMudancas(callback) {
    window.addEventListener(EVENTO_ESTANTE, callback);
    window.addEventListener("storage", callback);

    return () => {
        window.removeEventListener(EVENTO_ESTANTE, callback);
        window.removeEventListener("storage", callback);
    };
}

function lerJogosSalvos() {
    try {
        const dados = JSON.parse(obterSnapshot());
        return Array.isArray(dados) ? dados : [];
    } catch {
        return [];
    }
}

export function salvarJogo(jogo) {
    const jogos = lerJogosSalvos();
    if (jogos.some((item) => item.id === jogo.id)) return;

    try {
        localStorage.setItem(CHAVE_ESTANTE, JSON.stringify([...jogos, jogo]));
        notificarMudanca();
    } catch (falha) {
        console.error("Não foi possível salvar o jogo:", falha);
        throw new Error("Não foi possível salvar. Verifique o armazenamento do navegador.");
    }
}

export function removerJogoSalvo(id) {
    const jogos = lerJogosSalvos();

    try {
        localStorage.setItem(
            CHAVE_ESTANTE,
            JSON.stringify(jogos.filter((jogo) => jogo.id !== id)),
        );
        notificarMudanca();
    } catch (falha) {
        console.error("Não foi possível remover o jogo:", falha);
        throw new Error("Não foi possível atualizar a estante.");
    }
}

export function useEstante() {
    const snapshot = useSyncExternalStore(
        observarMudancas,
        obterSnapshot,
        obterSnapshotServidor,
    );

    let jogos = [];
    try {
        const dados = JSON.parse(snapshot);
        jogos = Array.isArray(dados) ? dados : [];
    } catch {
        jogos = [];
    }

    const salvar = useCallback((jogo) => salvarJogo(jogo), []);
    const remover = useCallback((id) => removerJogoSalvo(id), []);

    return { jogos, salvar, remover };
}

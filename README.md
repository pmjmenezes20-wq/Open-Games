# Game Explorer

Catálogo de jogos free-to-play desenvolvido com React e Vite, usando a [FreeToGame API](https://www.freetogame.com/api-doc).

## Executar localmente

```bash
npm install
npm run dev
```

## Verificações

```bash
npm run build
npm run lint
```

O catálogo consulta `https://www.freetogame.com/api/games` e filtra os títulos no navegador, pois a API não oferece busca textual direta. A API não exige chave. Atribuição à FreeToGame está incluída no catálogo.

Se chamadas diretas do navegador forem bloqueadas por CORS, consulte a opção RapidAPI indicada na [documentação oficial](https://www.freetogame.com/api-doc).

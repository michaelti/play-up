const retrieveAllGames = () => {
  const mockJson = [
    { id: "f1babed6-c59f-40c3-9827-29dff355b8d0", name: "Game 1" },
    { id: "9690accb-de10-41bb-9a2b-d1e9ce07ee13", name: "Game 2" },
  ];

  return mockJson;
};

const retrieveSingleGame = (id) => {
  const games = retrieveAllGames();
  return games.find((game) => game.id === id);
};

export { retrieveAllGames, retrieveSingleGame };

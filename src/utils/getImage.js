export const getPlayerImage = (player) => {
  return player.image_url ||
    `https://api.dicebear.com/9.x/initials/svg?seed=${player.name}`;
};

export const getGameImage = (game) => {
  return game.image_url;
};

export const getPlayerImage = (player) => {
  if (player.image_url) {
    return import.meta.env.VITE_BACKEND_URL + player.image_url;
  }

  return `https://api.dicebear.com/9.x/initials/svg?seed=${player.name}`;
};

export const getGameImage = (game) => {
  return import.meta.env.VITE_BACKEND_URL + game.image_url;
};

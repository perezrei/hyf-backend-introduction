import { addChannel } from '../handlers/handlers.js';

export const registerAddChannelListener = () => {
  const footerEl = document.getElementById('footer');
  footerEl.addEventListener('click', addChannel);
};

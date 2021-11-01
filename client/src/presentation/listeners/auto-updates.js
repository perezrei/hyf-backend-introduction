import { updateUI } from '../handlers/handlers.js';

export const registerAutoUpdateHandlers = () => {
  setInterval(updateUI, 300);
};

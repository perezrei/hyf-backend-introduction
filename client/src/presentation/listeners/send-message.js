import { sendMessage } from '../handlers/handlers.js';

export const registerSendMessageListener = () => {
  document.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
      sendMessage();
    }
  });
};

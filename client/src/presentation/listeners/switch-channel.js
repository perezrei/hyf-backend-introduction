import { channelClicked } from '../handlers/handlers.js';

export const registerSwitchChannelListener = () => {
  const channelListingsEl = document.getElementById('channelListings');
  channelListingsEl.addEventListener('click', channelClicked);
};

import { registerAddChannelListener } from './add-channel.js';
import { registerAutoUpdateHandlers } from './auto-updates.js';
import { registerSendMessageListener } from './send-message.js';
import { registerSwitchChannelListener } from './switch-channel.js';

export const registerHandlers = () => {
  registerAddChannelListener();
  registerSendMessageListener();
  registerSwitchChannelListener();
  registerAutoUpdateHandlers();
};

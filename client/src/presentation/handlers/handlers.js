import {
  fetchChannels,
  fetchMessagesForChannel,
  postChannel,
  postMessage,
} from '../../data-access/api-calls/calls.js';
import { getHeaderInnerHtml } from '../components/header.component.js';
import { getMessagesInnerHtml } from '../components/message-history.component.js';
import { getChannelListInnerHtml } from '../components/channel-listings.component.js';
import { insertOrUpdate } from '../../data-access/index.js';
import { find } from '../../data-access/index.js';

export const channelClicked = (event) => {
  if (!event.target.dataset.channelId) {
    return;
  }
  insertOrUpdate('currentChannelId', event.target.dataset.channelId);
  insertOrUpdate('currentChannelName', event.target.dataset.channelName);
};

export const sendMessage = async () => {
  await postMessage(document.getElementById('chat-field').value);
  document.getElementById('chat-field').value = '';
};

export const addChannel = async (event) => {
  if (event.target.type === 'submit') {
    const channelName = prompt('Please enter channel name:');
    await postChannel(channelName);
  }
};

export const updateUI = async () => {
  const headerEl = document.getElementById('header');
  const channelListEl = document.getElementById('channelListings');
  const messagesEl = document.getElementById('messageHistory');
  headerEl.innerHTML = getHeaderInnerHtml();
  const messages = await fetchMessagesForChannel(find('currentChannelId'));
  const channels = await fetchChannels();
  channelListEl.innerHTML = getChannelListInnerHtml(channels);
  messagesEl.innerHTML = getMessagesInnerHtml(messages);
};

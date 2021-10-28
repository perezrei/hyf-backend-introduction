const objectId = require('objectid');

const persistentDataAccess = require('../data-access/persistent');

const messageStore = persistentDataAccess('messages');

const newDate = new Date();

const messageManager = {
  createMessage: async (user, messageContent, channelId) => {
    // TODO: implement
    const id = objectId().toString();
    const message = {
      text: messageContent,
      id: id,
      user: user,
      date: newDate.toLocaleString(),
      channelId: channelId
    }
    await messageStore.create(message);
    return message;
  },
  updateMessage: async (message) => {
    // TODO: implement
    const success = await messageStore.update(message.id, message);
    if (!success) {
      throw new Error("Cannot update a message that doesn't exist!")  
    }
    return message;
  },
  removeMessage: async (messageId) => {
    // TODO: implement
    await messageStore.remove(messageId);
    return true;
  },
  getMessage: async (messageId) => {
    // TODO: implement
    const message = await messageStore.read(messageId);
    if (!message) {
      throw new Error(`Could not find message with id ${messageId}!`);
    }
    return message;
  },
  getAllMessages: async () => {
    // TODO: implement
    return await messageStore.all();
  },
  getMessagesForChannel: async (channelId) => {
    // TODO: implement
    return await messageStore.read(channelId);
  },
};

module.exports = messageManager;
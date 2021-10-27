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
    const success = await messageStore.update(message.id, message);
    if (!success) {
      throw new Error("Cannot update a message that doesn't exist!")  
    }
    return message;
    // TODO: implement
  },
  removeMessage: async (messageId) => {
    await messageStore.remove(messageId);
    return true;
    // TODO: implement
  },
  getMessage: async (messageId) => {
    const message = await messageStore.read(messageId);
    if (!message) {
      throw new Error(`Could not find message with id ${messageId}!`);
    }
    return message;
    // TODO: implement
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

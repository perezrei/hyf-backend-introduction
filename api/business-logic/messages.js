const objectId = require('objectid');

const persistentDataAccess = require('../data-access/persistent');

const messageStore = persistentDataAccess('messages');

// const newDate = new Date();

const messageManager = {
  createMessage: async (user, messageContent, channelId) => {
    // TODO: implement
    // const id = objectId().toString();
    const message = {
      text: messageContent,
      id: objectId().toString(),
      user: user,
      date: newDate(), //  date: newDate.toLocaleString(),
      channelId: channelId
    };
    await messageStore.create(message);
    return message;
  },
  updateMessage: async (message) => {
    // TODO: implement
    // const success = await messageStore.update(message.id, message);
    // if (!success) {
    //   throw new Error("Cannot update a message that doesn't exist!")
    // }
    // return message;
    return await messageStore.update(message.id, message);
  },
  removeMessage: async (messageId) => {
    // TODO: implement
    // await messageStore.remove(messageId);
    // return true;
    return await messageStore.remove(messageId);
  },
  getMessage: async (messageId) => {
    // TODO: implement
    // const message = await messageStore.read(messageId);
    // if (!message) {
    //   throw new Error(`Could not find message with id ${messageId}!`);
    // }
    // return message;
    return await messageStore.read(messageId);
  },
  // getAllMessages: async () => {
  //   // TODO: implement
  //   return await messageStore.all();
  getAllMessages: async () => {
    // TODO: implement
    return await messageStore.all();
  },
  getMessagesForChannel: async (channelId) => {
    // TODO: implement (NOT DONE BY ME)
    const result = [];
    const allMessages = await messageStore.all();
    for (let i = 0; i < allMessages.length; i++) {
      const theMessage = allMessages[i];
      if (theMessage.channelId === channelId) {
        result.push(theMessage);
      }
    }
    return result;
  },
};

module.exports = messageManager;
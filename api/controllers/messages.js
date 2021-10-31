const messageManager = require('../business-logic/messages');

const messageController = {
  get: async (req, res) => {
    // returns all messages currently in the system
    // TODO implement
    try {
      const messages = await messageManager.getAllMessages();
      res.status(200).send(JSON.stringify(messages));
    } catch(error) {
      res.status(500).send(error);
    }
  },
  getMessagesForChannel: async (req, res) => {
    // returns the messages that belong in the channel with the specified id
    // passed as /api/channels/:channelId/messages
    // TODO implement
    res.send(JSON.stringify([]));
  },
  put: async (req, res) => {
    // updates the messages with the specified id
    try {
      const messageId = req.params.messageId;
      const newData = req.body;
      if (newData.id !== messageId) {
        throw Error('Cannot change message ID after creation');
      }
      await messageManager.updateMessage(newData);
      res.status(200).send(JSON.stringify(newData));
    } catch (error) {
      res.status(500).send(error);
    }
    // passed as /api/messages/:messageId
    // TODO implement
    res.send('Not yet implemented');
  },
  post: async (req, res) => {
    // creates a new message based on the passed body
    // TODO implement
    try {
      const body = req.body;
      const message = await messageManager.createMessage(body.name);
      res.status(200).send(JSON.stringify(channel));
    } catch (error) {
      res.status(500).send(error);
    }
    res.send('Not yet implemented');
  },
  delete: async (req, res) => {
    // deleted the message with the specified id
    // passed as /api/messages/:messageId
    // TODO implement
    try {
      const messageId = req.params.messageId;
      await messageManager.removeMessage(messageId);
      res.status(200).send(
        JSON.stringify({
          message: `Message ${messageId} was successfully deleted!`
        })
      )
    } catch (error) {
      res.status(500).send(error);
    }
    res.send('Not yet implemented');
  },
};

module.exports = messageController;

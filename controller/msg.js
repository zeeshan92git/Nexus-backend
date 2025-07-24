import msgModel from '../model/message.js';

const sendMessage = async (req, res) => {
  const { sender, receiver, content, connectionId } = req.body;
  console.log({ sender, receiver, content, connectionId });
  try {
    const message = await msgModel.create({ sender, receiver, content, connectionId });
    return res.status(201).json({ success: true, data: message });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const getMessages = async (req, res) => {
  const { connectionId } = req.params;

  try {
    const messages = await msgModel.find({ connectionId }).populate('sender receiver', 'name').sort({ timestamp: 1 });
    return res.status(200).json({ success: true, data: messages });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export {sendMessage , getMessages};
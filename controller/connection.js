import connectionModel from '../model/connection.js';
import mongoose from 'mongoose';

const requestConnection = async (req, res) => {
  const { from, to } = req.body;
  console.log('Connection req body to and from _ids', to, from);

  try {
    // Check for existing request in both directions
    const existing = await connectionModel.findOne({
      $or: [
        { from, to },
        { from: to, to: from }
      ]
    });
    console.log("Found existing connection:", existing);

    if (existing) {
      return res.status(400).json({ success: false, message: 'Connection already requested or exists.' });
    }

    // Create new request
    const newConnection = await connectionModel.create({ from, to });
    console.log(newConnection);
    res.status(201).json({ success: true, message: 'Connection request sent.', data: newConnection });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const respondToConnection = async (req, res) => {
  const { connectionId, status } = req.body;

  if (!['accepted', 'rejected'].includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status.' });
  }

  try {
    const updated = await connectionModel.findByIdAndUpdate(
      connectionId,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Connection not found.' });
    }

    res.status(200).json({ success: true, message: `Connection ${status}.`, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getConnections = async (req, res) => {

  const userId = req.user.userId;
  console.log('user id',userId);
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ success: false, message: 'Invalid user ID' });
  }

  try {
    const connections = await connectionModel.find({
      $or: [{ from: userId }, { to: userId }],
    })
      .populate('from to')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, message: "Conections Fetched", data: connections });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const deleteConnection = async (req, res) => {
  
  const { connectionId } = req.params;
  try {
    const deleted = await connectionModel.findByIdAndDelete(connectionId);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Connection not found.' });
    }

    res.status(200).json({ success: true, message: 'Connection deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { requestConnection, respondToConnection, getConnections, deleteConnection };

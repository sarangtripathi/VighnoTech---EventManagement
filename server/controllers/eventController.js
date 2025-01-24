import Event from '../models/Event';


exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create({ ...req.body, creator: req.user.id });
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("creator", "username");
    res.json(events);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findOneAndUpdate(
      { _id: req.params.id, creator: req.user.id },
      req.body,
      { new: true }
    );
    if (!event)
      return res
        .status(404)
        .json({ message: "Event not found or unauthorized" });
    res.json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findOneAndDelete({
      _id: req.params.id,
      creator: req.user.id,
    });
    if (!event)
      return res
        .status(404)
        .json({ message: "Event not found or unauthorized" });
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
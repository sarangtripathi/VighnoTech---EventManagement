import Event from "../models/Event.js";

export const createEvent = async (req, res) => {
  try {
    const event = await Event.create({ ...req.body, creator: req.user.id });
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("creator", "username");
    res.json(events);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



export const updateEvent = async (req, res) => {
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

export const deleteEvent = async (req, res) => {
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

// export const getUserEvents = async (req, res) => {
//   try {
//     const events = await Event.find({ creator: req.user.id }).populate("creator", "username");
//     res.json(events);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

export const getUserEvents = async (req, res) => {
  try {
    const events = await Event.find({ creator: req.user.id });
    res.json(events);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


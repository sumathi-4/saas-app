const Task = require("../models/Task");

const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const task = new Task({
      title,
      description,
      organizationId: req.user.organizationId
    });

    await task.save();

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      organizationId: req.user.organizationId
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const updateTask = async (req, res) => {
  try {
    // Find the task and ensure it belongs to the same organisation
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, organizationId: req.user.organizationId },
      req.body,
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found in your organisation" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    // Ensure the task belongs to the same organisation before deleting
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      organizationId: req.user.organizationId
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found in your organisation" });
    }
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask
};
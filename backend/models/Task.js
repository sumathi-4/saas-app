const dns=require("dns");
const mongoose = require("mongoose");
dns.setServers(['8.8.8.8','1.1.1.1'])
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  organizationId: String
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
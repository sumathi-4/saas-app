
const dns=require("dns");
const mongoose = require("mongoose");
dns.setServers(['8.8.8.8','1.1.1.1'])
const userSchema = new mongoose.Schema({
  name: String,
  email:{ type: String, unique: true },
  password: String,
  role:{ type: String, default: "user" }, 
  organizationId: String
},{ timestamps: true });

module.exports = mongoose.model("User", userSchema);
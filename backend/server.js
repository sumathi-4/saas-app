const dns=require("dns");
const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const taskRoutes = require("./routes/TaskRoutes");

const authRoutes = require("./routes/auth.routes");
require("dotenv").config();
dns.setServers(['8.8.8.8','1.1.1.1'])

const app=express();

app.use(cors());
app.use(express.json());
app.use("/api/tasks", taskRoutes);

app.use("/api/auth", authRoutes);
app.get("/",(req,res)=>{
    res.send("api start running")
})


     const connectdb = async () => {
  try {
    await mongoose.connect(process.env.mongourl)
    console.log("db connected")
  } catch (err) {
    console.log("db not connected:", err.message)
  }
}
connectdb()


// const Organization = require("./models/Organization");

// (async () => {
//   const defaultOrg = await Organization.findOne();
//   if (!defaultOrg) {
//     await Organization.create({ _id: "default", name: "Demo Org" });
//     console.log("✅ Default organisation created with id 'default'");
//   }
// })();
     app.listen(5000,()=>{
        console.log("server is running")
     })
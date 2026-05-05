const dns = require("dns");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./routes/TaskRoutes");
const authRoutes = require("./routes/auth.routes");
require("dotenv").config();

dns.setServers(['8.8.8.8', '1.1.1.1']);

const app = express();

// CORS configuration – allow your frontend origin
const allowedOrigins = [
  'https://saas-app-frontend.onrender.com', // your live frontend (update this URL)
  'http://localhost:5173',
  'http://localhost:3000'
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("api start running");
});

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.mongourl);
    console.log("db connected");
  } catch (err) {
    console.log("db not connected:", err.message);
  }
};
connectdb();

// Optional: default organisation creation (commented out because Organization model may not exist)
// const Organization = require("./models/Organization");
// (async () => {
//   const defaultOrg = await Organization.findOne();
//   if (!defaultOrg) {
//     await Organization.create({ _id: "default", name: "Demo Org" });
//     console.log("✅ Default organisation created with id 'default'");
//   }
// })();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
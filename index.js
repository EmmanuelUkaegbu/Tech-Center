const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3001;
const API = process.env.BASE_URL;
const userRoute = require("./Routes/user.route.js");
const courseRoute = require("./Routes/course.route.js");
const RegisterCourseRoute = require("./Routes/courseRegister.route.js");
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/auth", userRoute);
app.use("/api/courses", courseRoute);
app.use("/api/registrations", RegisterCourseRoute);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
mongoose
  .connect(API)
  .then(() => console.log("Connected to MongoDB"))
  .catch(() => console.error("Error connecting to MongoDB:"));

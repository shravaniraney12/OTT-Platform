const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");

dotenv.config();
const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Successfully connected to mongo cluster");
  })
  .catch((error) => {
    console.log("Error connecting to mongo cluster", error);
  });

app.use(cors(
  {
    origin: [https://ott-platform-api.vercel.app/],
    methods: ["POST", "GET"],
    credentials: true
));
app.use(express.json());
app.get("/", (req, res)=>{
  res.join("Hello");
})
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);

const port = process.env.PORT || 8800;
app.listen(port, () => {
  console.log(`Backend server is running at ${port}`);
});

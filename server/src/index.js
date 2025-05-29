const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDb = require("./db/connectDb");
const authRouter = require("./routes/auth.route");

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  connectDb();
  console.log(`Server listening at http://localhost:${PORT}`);
});

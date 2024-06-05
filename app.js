require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");

//Routes
const postRouter = require("./routes/postRoutes");
const publicRouter = require("./routes/publicRoutes");
const authRouter = require("./routes/authRoutes");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandleMiddleware = require("./middleware/error-handler");
const auth = require("./middleware/auth");

const app = express();
app.use(cors());
app.use(express.json());
const port = 3005;

app.use("/api/v0/post", auth, postRouter);
app.use("/api/v0/public/post", publicRouter);
app.use("/api/v0/auth", authRouter);
app.get("/", async (req, res) => {
  res.json({ msg: "hello" });
});

app.use(notFoundMiddleware);
app.use(errorHandleMiddleware);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

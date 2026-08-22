import express from "express";
import dotenv from "dotenv";
import connectDB from "./connecttodb.js";
import trainerRouter from "./routes/Trainerrout.js";
import memberRouter from "./routes/Memberrout.js";
import sessionRouter from "./routes/Sessionsrout.js";
import bookingRouter from "./routes/Bookingsrout.js";
import authRouter from "./routes/Authrout.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

connectDB();
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Server is running!");
});


app.use("/api/Auth", authRouter);
app.use("/api/trainers", trainerRouter);
app.use("/api/members", memberRouter);
app.use("/api/sessions", sessionRouter);
app.use("/api/bookings", bookingRouter);



app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});


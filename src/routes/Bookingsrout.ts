import { Router } from "express";
import { bookSession, cancelAbook } from "../controllers/Bookingsconroller.js";
import { authMiddleware } from "../Middelware/Authentication.js";
import { authorize } from "../Middelware/Authorization.js";
import { UserRole } from "../models/Usersmodel.js";
import { ValidateClassSessions } from "../Middelware/Sessionsvalidation.js";

const router = Router();

router.put(
  "/book/:SessionsID",
authMiddleware,  
ValidateClassSessions,
  authorize(UserRole.Member),
  bookSession
);

router.patch(
  "/cancel/:SessionsID",
  authMiddleware,
  ValidateClassSessions,
  authorize(UserRole.Member, UserRole.Trainer),
  cancelAbook
);

export default router;
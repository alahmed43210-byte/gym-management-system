import { Router } from "express";
import{UserRole}from "../models/Usersmodel.js"
import{
getAvailableSessions

}from "../controllers/Membercontroller.js"
import { authorize } from "../Middelware/Authorization.js";
import { authMiddleware } from "../Middelware/Authentication.js";
import { ValidateClassSessions } from "../Middelware/Sessionsvalidation.js";
import { validatebooking } from "../Middelware/BookingsValidation.js";

const router = Router();

router.get(
  "/available",
authMiddleware, 
 ValidateClassSessions,
  validatebooking,
  authorize(UserRole.Member),
  getAvailableSessions
);

export default router;
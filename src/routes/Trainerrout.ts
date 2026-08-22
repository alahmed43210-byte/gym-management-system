import { Router } from "express";
import {
  createsession,
  updatesessions,
  cdeletsesssion,
  viewbookings,
} from "../controllers/Trainercontroller.js";

import { authMiddleware } from "../Middelware/Authentication.js";
import { authorize } from "../Middelware/Authorization.js";
import { UserRole } from "../models/Usersmodel.js";
import { ValidateClassSessions } from "../Middelware/Sessionsvalidation.js";
import { validatebooking } from "../Middelware/BookingsValidation.js";
const router = Router();


router.post(
  "/",
   authMiddleware,
   ValidateClassSessions,
  authorize(UserRole.Trainer),
  createsession
);


router.put(
  "/:SessionsID",
authMiddleware,
  ValidateClassSessions,
  authorize(UserRole.Trainer),
  updatesessions
);


router.delete(
  "/:SessionsID",
 authMiddleware,
  ValidateClassSessions,
  authorize(UserRole.Trainer),
  cdeletsesssion
);


router.get(
  "/bookings",
  authMiddleware, 
  validatebooking,
  validatebooking,
  authorize(UserRole.Trainer),
  viewbookings
);

export default router;
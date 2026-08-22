import { Router } from "express";

import {

checkcapacity,
getDashboardStats,
getsession,

} from "../controllers/Sessioncontroller.js";

const router = Router();

import { authorize } from "../Middelware/Authorization.js";
import { authMiddleware } from "../Middelware/Authentication.js";
import { UserRole } from "../models/Usersmodel.js";
import { validateuser } from "../Middelware/USERValidation.js";
import { ValidateClassSessions } from "../Middelware/Sessionsvalidation.js";
import { validatebooking } from "../Middelware/BookingsValidation.js";



router.get( "/mysessions",validateuser,authMiddleware,authorize(UserRole.Trainer, UserRole.Member), getsession
);


router.get("/capacitycheck/:SessionsID",ValidateClassSessions, authMiddleware,authorize(UserRole.Member),checkcapacity
);


router.get("/dashboardstatus",validatebooking,ValidateClassSessions,authMiddleware,authorize(UserRole.Trainer),getDashboardStats
);

export default router;

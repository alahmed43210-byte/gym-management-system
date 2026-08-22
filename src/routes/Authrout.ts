import { Router } from "express";
import { register, login } from "../controllers/Authenticationcontroller.js"; // تأكد من ضبط المسار حسب اسم ملف الـ Controller لديك

const router = Router();

router.post("/register", register);

router.post("/login", login);

export default router;
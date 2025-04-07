import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getMessages, getusersForSidebar, sendMessages } from "../controllers/message.controller.js";

const router = Router();

//to display the chats we need the users
router.get("/users", verifyJWT ,getusersForSidebar)

//to get the messages of the user with another user (bole to chat history)
router.get("/:id", verifyJWT, getMessages)

//to send messages
router.post("/send/:id", verifyJWT , sendMessages)

export default router;
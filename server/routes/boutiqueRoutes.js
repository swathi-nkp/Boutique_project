import express from "express";
import {
    createBoutique,
    getAllBoutiques,
    getBoutiqueById,
    getMyBoutique,
    updateBoutique
} from "../controllers/boutiqueControllers.js";
import { protect } from "../middelware/authMiddleware.js";

const router = express.Router();

// Public routes — anyone can see
router.get("/", getAllBoutiques);
router.get("/:id", getBoutiqueById);

// Protected routes — only logged in owner can access
router.post("/", protect, createBoutique);
router.get("/owner/me", getMyBoutique, protect);
router.put("/update", protect, updateBoutique);

export default router;
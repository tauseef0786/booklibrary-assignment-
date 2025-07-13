import express from "express";
import {
  getMyBooks,
  addToMyBooks,
  updateRating,
  updateStatus,
} from "../controllers/mybooks.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

// Protect all routes
router.use(authenticate);

// Routes (all require auth)
router.get("/", getMyBooks);                     // GET /api/mybooks
router.post("/:bookId", addToMyBooks);           // POST /api/mybooks/:bookId
router.patch("/:bookId/status", updateStatus);   // PATCH /api/mybooks/:bookId/status
router.patch("/:bookId/rating", updateRating);   // PATCH /api/mybooks/:bookId/rating

export default router;

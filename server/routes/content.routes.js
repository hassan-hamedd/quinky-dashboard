import express from "express";

import { getAllContent, getContentDetail, createContent, updateContent, deleteContent } from "../controllers/content.controller.js";

const router = express.Router();

router.route("/").get(getAllContent);
router.route("/:id").get(getContentDetail);
router.route("/").post(createContent);
router.route("/:id").patch(updateContent);
router.route("/:id").delete(deleteContent);

export default router;
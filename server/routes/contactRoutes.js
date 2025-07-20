import express from "express";
import contactCtrl from "../controllers/contactController.js";
import authCtrl from "../controllers/auth.controller.js";
import requireAdmin from "../controllers/requireAdmin.js"; 

const router = express.Router();

// Load contact by ID
router.param("contactId", contactCtrl.contactByID);

// Public: Read all contacts
router.get("/api/contacts", contactCtrl.list);

// Admin-only: Create, delete all
router.post("/api/contacts", authCtrl.requireSignin, requireAdmin, contactCtrl.create);
router.delete("/api/contacts", authCtrl.requireSignin, requireAdmin, contactCtrl.removeAll);

// Public: Read single contact
router.get("/api/contacts/:contactId", contactCtrl.read);

// Admin-only: Update, delete single contact
router.put("/api/contacts/:contactId", authCtrl.requireSignin, requireAdmin, contactCtrl.update);
router.delete("/api/contacts/:contactId", authCtrl.requireSignin, requireAdmin, contactCtrl.remove);

export default router;

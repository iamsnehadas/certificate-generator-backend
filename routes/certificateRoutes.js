const express = require("express");
const {
  createCertificate,
  getCertificates,
} = require("../controllers/certificateController");

const router = express.Router();

router.post("/", createCertificate); // Create a new certificate
router.get("/", getCertificates);    // Fetch all certificates

module.exports = router;

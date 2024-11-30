const Certificate = require("../models/Certificate");
const generatePDF = require("../utils/pdfGenerator");
const uploadToDrive = require("../utils/googleDrive");

const FRONTEND_URL = "https://certificate-generator-frontend-hazel.vercel.app/";
const BACKEND_URL = "https://certificate-generator-backend.onrender.com";

exports.createCertificate = async (req, res) => {
  try {
    const { name, course, date } = req.body;

    // Generate PDF
    const pdfPath = await generatePDF({ name, course, approvalDate: date });

    // Upload to Google Drive
    const driveLink = await uploadToDrive(pdfPath);

    // Save to MongoDB
    const newCertificate = new Certificate({
      name,
      course,
      date,
      link: driveLink,
    });
    await newCertificate.save();

    res.status(201).json({
      message: "Certificate created successfully",
      link: `${FRONTEND_URL}certificate/${newCertificate._id}`,  // Add the link to the certificate page on the frontend
    });
  } catch (error) {
    console.error("Error creating certificate:", error);
    res.status(500).json({ message: "Failed to generate certificate" });
  }
};

exports.getCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find();
    res.status(200).json(certificates.map(cert => ({
      ...cert.toObject(),
      frontendLink: `${FRONTEND_URL}certificate/${cert._id}`, // Add link to view certificate on frontend
    })));
  } catch (error) {
    console.error("Error fetching certificates:", error);
    res.status(500).json({ message: "Failed to fetch certificates" });
  }
};

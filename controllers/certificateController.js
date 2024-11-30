const Certificate = require("../models/Certificate");
const generatePDF = require("../utils/pdfGenerator");
const uploadToDrive = require("../utils/googleDrive");

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
      link: driveLink,
    });
  } catch (error) {
    console.error("Error creating certificate:", error);
    res.status(500).json({ message: "Failed to generate certificate" });
  }
};

exports.getCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find();
    res.status(200).json(certificates);
  } catch (error) {
    console.error("Error fetching certificates:", error);
    res.status(500).json({ message: "Failed to fetch certificates" });
  }
};

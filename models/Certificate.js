const mongoose = require("mongoose");

const CertificateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  course: { type: String, required: true },
  date: { type: String, required: true },
  link: { type: String, required: true },
});

module.exports = mongoose.model("Certificate", CertificateSchema);

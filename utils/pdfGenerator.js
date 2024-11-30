const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const generatePDF = async ({ name, course, approvalDate }) => {
  console.log("Starting PDF generation...");

  const folderPath = path.join(__dirname, "../certificates");
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath); 
  }

  const filePath = path.join(folderPath, `${name}_${Date.now()}.pdf`);
  const doc = new PDFDocument();

  doc.pipe(fs.createWriteStream(filePath));
  doc.fontSize(20).text("Certificate of Completion", { align: "center" });
  doc.moveDown();
  doc.fontSize(16).text(`This is to certify that ${name}`);
  doc.text(`${course} course.`);
  doc.text(`Date of Approval: ${approvalDate}`);
  doc.end();

  console.log("PDF generated at:", filePath);
  return filePath;
};

module.exports = generatePDF;

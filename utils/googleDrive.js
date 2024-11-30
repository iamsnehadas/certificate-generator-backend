const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

const uploadToDrive = async (filePath) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.resolve(__dirname, "../certificate-project-443115-bf1ae8e2a43e.json"),
    scopes: ["https://www.googleapis.com/auth/drive.file"],
  });

  const drive = google.drive({ version: "v3", auth });

  const fileMetadata = {
    name: path.basename(filePath),
    parents: ["1kr5HJvYaePyfXuTtGnAImRvo7AkRo-OE"],
  };

  const media = {
    mimeType: "application/pdf",
    body: fs.createReadStream(filePath),
  };

  const response = await drive.files.create({
    resource: fileMetadata,
    media,
    fields: "id",
  });

  return `https://drive.google.com/file/d/${response.data.id}/view`;
};

module.exports = uploadToDrive;

const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

const uploadToDrive = async (filePath) => {
  try {
    
    const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);

    
    const auth = new google.auth.GoogleAuth({
      credentials: serviceAccount,
      scopes: ["https://www.googleapis.com/auth/drive.file"],
    });

    const drive = google.drive({ version: "v3", auth });

    
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

    const fileMetadata = {
      name: path.basename(filePath),
      parents: [folderId], 
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
  } catch (error) {
    console.error("Error uploading file to Google Drive:", error);
    throw error;
  }
};

module.exports = uploadToDrive;

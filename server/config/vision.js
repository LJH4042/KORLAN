const vision = require("@google-cloud/vision");
require("dotenv").config();

const CONFIG = {
  credentials: {
    private_key: process.env.PRIVATE_KEY.split(String.raw`\n`).join("\n"),
    client_email: process.env.CLIENT_EMAIL,
  },
};

const client = new vision.ImageAnnotatorClient(CONFIG);

const detectText = async (file_path) => {
  try {
    const [result] = await client.textDetection(file_path);
    if (result.fullTextAnnotation.text) {
      return result.fullTextAnnotation.text;
    } else {
      console.error("No text found in the image.");
      return "";
    }
  } catch (error) {
    //console.error("Error detecting text:", error);
    return;
  }
};

module.exports = detectText;

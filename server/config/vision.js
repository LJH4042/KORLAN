const vision = require("@google-cloud/vision");

const CREDENTIALS = "사용자 인증 키";

const CONFIG = {
  credentials: {
    private_key: CREDENTIALS.private_key,
    client_email: CREDENTIALS.client_email,
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
    console.error("Error detecting text:", error);
  }
};

module.exports = detectText;

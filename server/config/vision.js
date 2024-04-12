const vision = require("@google-cloud/vision");

const CREDENTIALS = JSON.parse(JSON.stringify("google cloud 사용자 인증 키"));

const CONFIG = {
  credentials: {
    private_key: CREDENTIALS.private_key,
    client_email: CREDENTIALS.client_email,
  },
};

const client = new vision.ImageAnnotatorClient(CONFIG);

const detectText = async (file_path) => {
  try {
    const [result] = await client.documentTextDetection(file_path);
    if (result && result.fullTextAnnotation && result.fullTextAnnotation.text) {
      return result.fullTextAnnotation.text;
    } else {
      console.error("No text found in the image.");
      return "";
    }
  } catch (error) {
    console.error("Error detecting text:", error);
    throw error;
  }
};

module.exports = detectText;

const vision = require("@google-cloud/vision");

const CREDENTIALS = {
  type: "service_account",
  project_id: "ocr-test-420011",
  private_key_id: "e6cbb0bfa755e9df2bf9c91468289b217bf8c02d",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDE3HLQUcHVWkuw\nyg/O7NtHtZmYYxgwcl8bPrj5+hiznKqOX4wwdcDfs6/7s39OAO/2hDJdO20mmoMJ\nPJes+c6+f3Po7WjtAVikV0pRwE2DU2rZR7S33/fZkAlZFx/A+b7VdR+tu8W7F+cy\n79wt9szNsCVRVMVqFBFetmG18glK6eF8WjjgyZhUCrWRfL0Jj+2dGmyaHMwKlEOT\nCwEzsRx9XcHJsZGP9xZKfjqG9mHSEBOwpkR23aCOq6bw1XI1ectaW18pXa2y7klN\nwP5BLhAhmlymOBHi5so3DfvEHUGaxTDUEy12xDnehHVmHGCc+rRwsMaeR/mw+Gh/\nfS+oICndAgMBAAECggEACbyjmyUoEq7sJnrgDEqPz/yt86kXFbJafOT9zjNuDFg3\n4WHdc7onR4lCL49hwRBvzgAc45qgW/Pxfj/2epJChQ6Vw5QWh/50jXBZ1zBNRS0X\nkFapHB0iS6sBo1vu8KMJqtIntnaeoZHdmBngCI/38kZ/mgW42/XRJB+eNpsZlZBk\ni1LejQVSEKcA0ctYtqMDFM6FdJJko9oyUEMxYUKBR8abNmw+fKAASYxI90oL67Na\nBk2x0UdHhuW72QIlbUBS9trbDKsncaLt/MHaNVwGiBxl/ja3WsJ54gzohXwc2tnX\njCFZi0+VOnZpwJ7XjKTst+ZmR+aJCvwr9dsLBdppewKBgQD31Ujvw8eJjuUglku8\nqMTMhnpCHWx5GQ2jcRVsbMbVpLi83hJ0jo/ecesZoM1litXy750HARLN8vXrfMjr\nXng3grzSt/pU2B0S2K3dFKUDbD5FnJ7x7gzkmutwnW4mbgpoGl9ILnFBK5dV8852\nNfzIlAXkfixq2xFuJJ1kKr3j4wKBgQDLWSosQZ+bi+xn3M/mb5Vok2Y3boZKyiE/\nO4wEztJiJlOEYo//H5zFSamOeNtL06n6twdBkam/SOIY5utw5Ifb2qJ3KDNwfCy8\nYq+fcIPYiL5yNMgH8yCHjDLEdNwEPDF+Io0a0L6m4F2bW1q8XEru/tCyy5Qec496\nIrjekhSnPwKBgAG0mwrjWwUsUZFW13CV7LzHlCHOWAfBT2G3joEvgnLH7mmGUbQx\novXR7N9BRwiS2wQP+BGrRTjbmiujsTJFdShUov4EPBnHXvPZP+EMmlIatZb/C+z4\nSWhtVH9y5eYnzbSHse4qO6dKKIFz6xDPME0lD6FR6PZXSZhrchXVYXcnAoGAfYx0\ntFRkBfZzJIE5vy2fkqyHDKxpr51yv4a1YXaMgFrnb7Im876B3XEohbVquDtcFFaS\n3VHg+yA1sGhKby46D2zCqE0izU1tlXZctlUSoktzQjICWp4qtGXEJnV8LgU4DYep\nlSfSvleCk9vofqmA/mRHWEzHC7IPoLn1aD3LEKMCgYEAoFfzvg/iTAnvCBewTwAI\na1YVn3aqNutdmLgcLHahUk1OPJ+s5ycR9nN3j23u1SLLJ5pgwZ/z8QSbs37aPPQO\nbFwBQ2DFvtPL2lNqlxyPT9JaXMHgNX5YefTT16bNKrSMAf6Hb8SEeIzMz4EOEXEE\nuNRXjV5zwIzOkTJih/znO+E=\n-----END PRIVATE KEY-----\n",
  client_email: "ocr-test@ocr-test-420011.iam.gserviceaccount.com",
  client_id: "102132898717022804546",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/ocr-test%40ocr-test-420011.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

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

const vision = require("@google-cloud/vision");

const CREDENTIALS = "사용자 인증 키";
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCtlXF+FNH/U3Pl\nCX3QFDECxcGglvi5eR5JANyA7b9X1ozeUIHkVQxYVuxswKNJJLr4xzSr6mUafwzN\nfYRYqZbPG6An+UDtB5tT5UIYs7WGU4MD7zMvSE0P3BdpQVBzhgFdEz5fg8JPIb/u\ns//Z5rnjTqBaevICgfB49m909HgxXg2+8ID8fZIGvVb/4b70ccjJvAD5KMhx6ZaU\n/ZjI4Af7us0slHYUD5wCnGSSrbk8dQHcYKffsF9koZH0Fa7ecv6Cu+Hl3UUq7Z9R\nsyQz5zzGp17h0TKI3FpJ+RKjQ2y5KtuximOP2wmqZO9z6hJPNi2sh+qBSkX1FHz5\nKPLgB3VdAgMBAAECggEAIdXvVz8KNx2mieb5fAGvkwWGyn2bMpYqIdtV4BjX0zCq\naVxikWZFn4OkFsfPHF8ZRgyYlwk713gcAAM/NMQr9ieBpsEWl42DyMz3vxZqpCor\nr+zkuor6oISLmLQHUVl18xVg81/c1K10uvwhu3EW23jUV4a/HV+ERyPsUm0j76U+\nUJbJ7CgB1ovxXX4muZrtNcfoQ2vT9joxILdFRbq36bEZpH+vJ214p9Y8uMJJfWqS\nmk5NiJftDxOvbTK2BapHPTdbgoXQk07A7zgcEdQMjaWRKfb3aBGujaMrlE8GPGUm\nmutVW0LdW2EzOHn0yJDxRg+YHUF8tOzhIxocIuMqEQKBgQDW86qBDupKWxkajcvr\nfOwtBREtT9jye6yJBXDX/Co+HmNfDXGfnOO8QWFYqL+HTCRuU+xuK9eFbMpYpgmY\nDSopXBXgMLSjdY/84ddro6nxFqWMIXQuJAl9H1ObfRGoXrJDH63zvq5vOutOPTQ/\nmz6pnlO1XJPO8ED73RduCzv7EQKBgQDOu2uLJhVL6vNouCITavvwyrOsYd/FpgmG\nM1hPVfiXrCJakOn7iAmCdGBNye/p2jrc80WIEG42iSHn9jTI9h8EXT09kCjD1VUN\ngPI0W9+u8HymOls8eUhDWMXa4FgzsdSnDpQNsQ5zkFqU3F5V1MrGmghMJtwmZs2A\nUYYhDzldjQKBgFxzAoNtgdEnKz3jfLA003NteXzOmdV44bUxFN6gQx7ifQTVyGfI\n154RVKgINBAh7I1TJR4hVxm4t7K2/utZxidxxqrc5+Rh3OL702YlRyM9BUim3sw1\njas1/QSkHyMWT39VMcDi4y1N3wSQiFdPEv1q7j/TqHLZnGl3Juuag1qxAoGAaWfI\nCpetThsKZn9T6ICo2noPqDnzBWyF+KXfRfw4luTOU00F8BjJeHlrzN3EdICveI6V\nCi4Oc8HxxrqS6VAMOoZrviLtlgQErLDtTWL2ptS5SWwBrtDL1oLBxrqSXjEyksbt\nGBoJm0Sj2riNZMftZ9uLlYBOyUmrR9zJPbvsbNUCgYBx7wnsqIrJz0mjfwjaeaw0\nhfC8oOOhM8IrNFdqQtP4ri+lMEPGZ7MvbDQc8Uj1kTM0ifwQdiuALjieuNKBpdS/\nViVfGYnLns/FEv5JyV2NZrGkpoIKlu9nyxMyd2kFpUhHR41FH+Rr8oNDjX4hVz5K\nrqKoz4QERDihMB5WQJfl9Q==\n-----END PRIVATE KEY-----\n",

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

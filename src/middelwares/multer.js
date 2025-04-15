import multer from "multer";

const storage = multer.memoryStorage();

export const memory = multer({ storage });

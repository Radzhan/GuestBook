import multer from "multer";

const imageStorage = multer.diskStorage({
});

export const imagesUpload = multer({ storage: imageStorage });

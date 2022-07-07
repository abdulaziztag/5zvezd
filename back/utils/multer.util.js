import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'files/');
  },
  filename: (req, file, cb) => {
    const {originalname} = file;
    cb(null, originalname);
  },
});

export const upload = multer({storage});

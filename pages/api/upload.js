import nextConnect from 'next-connect';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDir = './public/uploads';

if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const upload = multer({
  storage: multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
  }),
});

const apiRoute = nextConnect();
apiRoute.use(upload.single('file'));
apiRoute.post((req, res) => {
  res.status(200).json({ url: `/uploads/${req.file.filename}` });
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apiRoute;

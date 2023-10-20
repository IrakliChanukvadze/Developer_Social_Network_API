import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination to the "public" folder
    cb(null, path.join(__dirname, '..', '..', 'public'));
  },
  filename: function (req, file, cb) {
    // Define a unique file name (e.g., timestamp + original name)
    cb(null, Date.now() + '-' + file.originalname);
  },
});

// Create an instance of multer with the specified storage options
const upload = multer({ storage: storage });

export default upload;

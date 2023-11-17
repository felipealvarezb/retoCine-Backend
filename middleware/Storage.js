import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/uploads'); // Define el directorio donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split('.').pop();
      cb(null, Date.now() + '.' + ext);
    },
});
  
export const upload = multer({ storage: storage });
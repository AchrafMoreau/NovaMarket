import express from 'express'
import multer from 'multer'
import path from 'path'


const Route = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload/');
    },
    filename: (req, file, cb) => {
        const filename = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
        cb(null, filename);
    }
});
const checkFile = (file, cb)=>{
    const filetypes = /jpeg|jpg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase()) 
    const mimetype = filetypes.test(file.mimetype)

    if(mimetype && extname){
        return cb(null, true)
    }else{
        cb('images Only!')
    }
}

const uplaod = multer({
    storage,
    fileFilter: function(req, file, cb){
        checkFile(file, cb)
    }
})


Route.post("/", uplaod.single('image'), (req, res)=>{
    const filePath = req.file.path.replace(/\\/g, "/");
    res.json(`/${filePath}`);
})

export default Route
import multer from "multer"

//image upload multer
const storage = multer.diskStorage({
    destination:'public/images/',
    filename : (req,file,cb) =>{
        // cb(null,Date.now(+file+originalname));
        cb(null, file.originalname)
    }
})

export const upload = multer({
    storage:storage
})
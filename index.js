const express=require('express');
const multer=require('multer');
const path = require('path');

const app=express();

const upload=multer({
    storage:multer.diskStorage({
        destination:function(req,file,cb){
            // cb(null,"upload");
            cb(null, path.join(__dirname, '/upload'));
        },
        filename:function(req,file,cb){
            // cb(null,file.fieldname+"-"+Date.now()+ ".jpg");
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
            
            
        }
    })
}).single("user_file");

app.post("/upload", upload,(req,res)=>{
    res.send("file uploaded");
});

app.listen(4000);



// const express = require('express');
// const multer = require('multer');
// const path = require('path');

// const app = express();
// const port = 3000;

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, path.join(__dirname, 'uploads/')); 
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     },
//   });
  

// const upload = multer({ 
//     storage: storage 
// });


// app.post('/upload', upload.single('all_file'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).send('No file uploaded.');
//   }

//   res.send('File uploaded successfully.');
// });

// app.listen(port, () => {
//   console.log(`Server is running on ${port} port`);
// });


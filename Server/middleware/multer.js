// const storage = multer.memoryStorage();
// What does this do?
// 👉 It tells Multer:
// “Do NOT save the file on disk.
// Keep the uploaded file in RAM (memory).”
// So:
// No uploads/ folder
// No local file saved
// File is stored temporarily in memory
// 📌 The file will be available as:
// js
// Copy code
// req.file.buffer

// const upload = multer({ storage });
// 👉 This creates a middleware function named upload.
// Now upload can:
// Read FormData
// Extract file
// Store it in memory
// Used like:
// js
// Copy code
// upload.single("photo")


const multer=require('multer');
const storage=multer.memoryStorage();
const upload=multer({storage});
module.exports=upload;
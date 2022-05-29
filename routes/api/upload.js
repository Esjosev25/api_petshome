
const express = require('express');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

const upload = require('../../middleware/upload');

const connectDB = require('../../config/db');

const router = express.Router();

const conn = mongoose.connection;
let gfs;
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads')
})
router.post('/', upload.single('file'), (req, res) => {
    if (req.file === undefined)
        return res.status(400).json({ error: 'No file uploaded' });
    const imgUrl = `http://localhost:5000/api/upload/file/${req.file.filename}`;
    return res.send({ url: imgUrl });

});

router.get('/file/:filename', async (req, res) => {

    // try {
    //     const file = await gfs.files.findOne({ filename: req.params.filename });
    //     var writestream = gfs.createWriteStream('C:/BDG/Cursos Udemy/MERN/DevConnector/routes', {
    //         filename: file.filename,
    //     });
    //     gfs.createReadStream('').pipe(writestream);
    // } catch (error) {
    //     console.error(error);
    //     res.send({ error: 'Image not found' });
    // }


})
module.exports = router;
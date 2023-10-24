const multer = require("multer");

var blogThumbnailUploader = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads/blogs");
    },
    filename: function (req, file, cb) {
      //   cb(null, file.originalname)
      console.log(req.query)
      cb(null, req.query.blogID + "_thumbnail." + file.mimetype.split("/")[1]);
    },
  }),
});

module.exports = { blogThumbnailUploader };

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


var profileImageUploader = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads/profiles");
    },
    filename: function (req, file, cb) {
      //   cb(null, file.originalname)
      console.log(req.params)
      cb(null, req.params.username + "_profile." + file.mimetype.split("/")[1]);
    },
  }),
});


// var postThumbnailUploader = multer({
//   storage: multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "./uploads/posts");
//     },
//     filename: function (req, file, cb) {
//       //   cb(null, file.originalname)
//       console.log(req.query)
//       cb(null, req.query.postID + "_thumbnail." + file.mimetype.split("/")[1]);
//     },
//   }),
// });

var postImagesUploader = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads/posts");
    },
    filename: function (req, file, cb) {
      //   cb(null, file.originalname)
    //   console.log(req.query)
      cb(null, file.originalname);
    },
  }),
});

module.exports = { blogThumbnailUploader, postImagesUploader, profileImageUploader };

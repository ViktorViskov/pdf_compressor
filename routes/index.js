// libs
var express = require('express');
const fs = require('fs');
var router = express.Router();
var path = require('path');
var busboy = require("busboy");
const { randomUUID } = require('crypto');


/* GET main page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// method for compress file
router.post('/compress', async function (req, res, next) {
  // create manager for loading files with limit 101Mb
  const bb = busboy({ headers: req.headers, limits: { fileSize: 105906176 } });

  // load file from client
  bb.on('file', (name, file, info) => {
    // check for correct type
    if (info.mimeType == "application/pdf") {
      // generate file name and path
      const fileName = randomUUID()
      const saveTo = path.join('/home/viktor/test/upload', `${fileName}.pdf`);

      // save file
      file.pipe(fs.createWriteStream(saveTo));

      // redirect to status page
      res.redirect(`/file/${file}`)
    }

    // show error page
    else {
      res.render("index", { message: "Incorect file type!", desc: "Please select PDF file!" })
    }
  });

  // send response to client
  // bb.on('close', () => {
  //   res.render("load");
  // });
  req.pipe(bb);
  return;
})

// show page with load file
router.get('/file/:uuid', function (req, res, next) {
  res.render("load", { name: req.params.uuid, status: "Compressing..."})
})

// show file status
router.get('/status/:uuid', function (req, res, next) {
  res.json({ status: "Ready!", linkName:"Load", link:"HereLink" })
})

module.exports = router;

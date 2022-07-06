// libs
var express = require('express');
const fs = require('fs');
var router = express.Router();
var path = require('path');
var busboy = require("busboy");
const { randomUUID } = require('crypto');
const { exec, execSync } = require('child_process');

// path to save uploaded files
const upl = "/tmp"
//path to compressed files
const com = "/tmp"

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

      // current date for file name
      let date = new Date()

      // generate file name and path
      const fileName = `${randomUUID().slice(0,5)}_${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}_${date.getHours()}.${date.getMinutes()}`
      const saveTo = path.join(upl, `${fileName}.pdf`);

      // save file
      file.pipe(fs.createWriteStream(saveTo));

      // call system command for compressing
      exec(`sleep 1; gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH -sOutputFile=${com}/${fileName}_compress.pdf ${upl}/${fileName}.pdf &`);

      // redirect to status page
      res.redirect(`/file/${fileName}`);
    }

    // show error page
    else {
      res.render("index", { message: "Incorect file type!", desc: "Please select PDF file!" })
    }
  });

  req.pipe(bb);
  return;
})

// show page with load file
router.get('/file/:fileName', function (req, res, next) {
  res.render("load", { name: req.params.fileName, status: "Checking...", href: `/download/${req.params.fileName}_compress.pdf` })
})

// show file status
router.get('/status/:uuid', function (req, res, next) {
  // variables
  let fileStatus = "Compressing...";

  // check for file is exist
  if (fs.existsSync(`${com}/${req.params.uuid}_compress.pdf`)) {
    // check for process
    try {
      // check for process is finish
      if (!execSync(`ps a | grep ${req.params.uuid} | grep -v grep`).toString()) {
        fileStatus = "Ready!";
      };
    }

    // if error or return status 1 change status message to ready
    catch (RangeError) {
      fileStatus = "Ready!";
    }
  }

  // check for original exist
  else if (!fs.existsSync(`${upl}/${req.params.uuid}.pdf`)) {
    fileStatus = "File was deleted from server";
  }

  // result to client
  res.json({ status: fileStatus })
})

// download file
router.get("/download/:uuid", function (req, res, next) {
  // check for file is exist
  if (fs.existsSync(`${com}/${req.params.uuid}`)) {
    // send file
    res.sendFile(`${com}/${req.params.uuid}`);
  }
  else {
    res.redirect(`/file/${fileName}`);
  }
})

module.exports = router;

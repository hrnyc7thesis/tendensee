const AWS = require('aws-sdk');
const config = require('../config');
// const zlib = require('zlib'); // USE THIS TO COMPRESS?
const fs = require('fs');
const shortid = require('shortid');
const s3Stream = require('s3-upload-stream')(new AWS.S3({
  accessKeyId: config.storageId,
  secretAccessKey: config.storageKey,
  signatureVersion: 'v4'
}));

module.exports = (filePath, cb) => {

  let key = shortid.generate() + '.jpg';
  let read = fs.createReadStream(filePath);
  // let compress = zlib.createGzip();
  let upload = s3Stream.upload({
    'Bucket': config.bucket,
    'Key' : key,
    ACL: "public-read"
  });

  upload.maxPartSize(1048576); // 1 MB 
  upload.concurrentParts(5);

  upload.on('error', err => {
    console.log('S3 Upload Error:', err);
    cb(err);
  });

  //ONCE ALL WORKING COMMENT THIS OUT
  upload.on('part', details => {
    console.log(details);
  });

  upload.on('uploaded', details => {
    console.log('upload to s3 complete:', details);
    cb(details);
  });

  read.pipe(upload);
  // read.pipe(compress).pipe(upload);
}

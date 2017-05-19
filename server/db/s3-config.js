const AWS = require('aws-sdk');
const config = require('../config');
const s3Stream = require('s3-upload-stream')(new AWS.S3());

AWS.config.update({accessKeyId: config.storageId, secretAccessKey: config.storageKey});

//USE READSTREAM? OR READ FROM URL?
module.exports = (readStream, key, cb) => {
  let upload = s3Stream.upload({
    'Bucket': config.bucket,
    'Key' : key
  });

  upload.on('error', err => {
    callback(err);
  });

  //ONCE ALL WORKING COMMENT THIS OUT
  upload.on('part', details => {
    console.log(inspect(details));
  });

  upload.on('uploaded', details => {
    console.log('upload to s3 complete:', details);
    callback();
  });

  readStream.pipe(upload);
}
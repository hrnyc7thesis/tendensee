const AWS = require('aws-sdk');
const config = require('../config');
// const zlib = require('zlib'); // USE THIS TO COMPRESS?
const fs = require('fs');
const shortid = require('shortid');
// UPLOAD STREAM PARAMETERS
// const s3Stream = require('s3-upload-stream')(new AWS.S3({
//   accessKeyId: config.storageId,
//   secretAccessKey: config.storageKey,
//   signatureVersion: 'v4'
// }));
// UPLOAD DIRECT PARAMETERS
const s3 = new AWS.S3({
  accessKeyId: config.storageId,
  secretAccessKey: config.storageKey,
  signatureVersion: 'v4'
});



module.exports = (file, cb) => {

// DIRECT UPLOAD

  var params = {
		Bucket: config.bucket,
		Key: `${shortid.generate()}.jpg`,
		Body: new Buffer(file, 'base64'),
		ContentEncoding: 'base64',
		ContentType: 'image/jpeg',
    ACL: 'public-read'
	};
  if(file !== 'No Photo') {
  	s3.upload(params, function(err, data) {
  		if (err){
        console.log(err);
      } else {
        console.log("Successfully uploaded ");
        console.log('data',data);
        cb(data);
      }
  	});
  } else {
    data = {};
    data.Location = config.defaultCompletedImagePath || 'https://s3.us-east-2.amazonaws.com/tgoc99habit/bTyogRbpc.jpg';
    cb(data)
  }
}

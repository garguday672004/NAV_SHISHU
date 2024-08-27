const cloudinary = require('cloudinary').v2;

exports.uploadImageToCloudinary = async function(file, folder){
    try{
        const options = {
            folder: folder,
            resource_type: 'auto'
        }

        return await cloudinary.uploader.upload(file.tempFilePath, options);
    }
    catch(err){
        console.log('Cloudinary file upload failed');
    }
}
import AWS from 'aws-sdk';
import { accessKeyId, secretAccessKey, sessionToken, region, bucket } from './s3';

AWS.config.update({
    accessKeyId,
    secretAccessKey,
    sessionToken,
    region,
});

const s3 = new AWS.S3();

const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for(let i = 0; i < length; i++){
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

export const uploadToS3 = async (file) => {
    if (!file) {
        return null;
    }

    const uniqueID = generateRandomString(8);
    const fileName = `${file.name.split('.').slice(0, -1).join('.')}_${uniqueID}.${file.name.split('.').pop()}`;

    const params = {
        Bucket: bucket,
        Key: fileName,
        Body: file,
        ContentType: file.type,
    };

    try {
        const data = await s3.upload(params).promise();
        return { url: data.Location, key: fileName };
    } catch (error) {
        return null;
    }
};

export const deleteImageFromS3 = async (key) => {
    const params = {
        Bucket: bucket,
        Key: key,
    };

    try {
        await s3.deleteObject(params).promise();
        return true;
    } catch (error) {
        return false;
    }
};
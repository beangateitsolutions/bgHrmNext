const crypto = require('crypto');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} = require('@aws-sdk/client-s3');
const { ObjectId } = require('mongoose');
const axios = require('axios');

const S3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

function getHash(password) {
  const salt = process.env.PASSWORD_SALT;
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512');
  return hash.toString('hex');
}
// console.log(getHash('123'));

async function deleteFile(file) {
  await fs.promises.unlink(file.path);
  console.log(`File ${file.filename} deleted!`);
}

function getToken(email, passwordHash, remember) {
  const hash = passwordHash.slice(-10);
  const expiry = remember ? undefined : { expiresIn: '24h' };
  const token = jwt.sign({ email, hash }, process.env.JWT_SECRET, expiry);
  return token;
}

function getAdminToken(email, password, remember) {
  const hash = password.slice(-10);
  const expiry = remember ? undefined : { expiresIn: '24h' };
  const token = jwt.sign({ email, hash }, process.env.JWT_SECRET, expiry);
  return token;
}

async function sendEmail(email, subject, body, html) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_ID,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.GMAIL_ID,
      to: email,
      subject,
      text: body,
      html,
    });

    return {
      ok: info.response.includes('250'),
      response: info.response,
    };
  } catch (error) {
    console.log(error);
    return { ok: false, response: 'server error' };
  }
}

function getRandomOtp(digits) {
  let otp = `${Math.random()}`.slice(-digits);
  return otp;
}

async function uploadFile(file, cloudFilePath) {
  try {
    const fileBuffer =
      file instanceof Buffer ? file : await fs.promises.readFile(file.path);

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET,
      Key: cloudFilePath,
      Body: fileBuffer,
      ACL: 'public-read',
    });

    await S3.send(command);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function deleteS3File(path) {
  const command = new DeleteObjectCommand({
    Bucket: process.env.AWS_BUCKET,
    Key: path,
  });

  try {
    await S3.send(command);
    console.log(`File deleted successfully.`);
  } catch (error) {
    console.log(error);
  }
}

function getS3FileUrl(path) {
  return `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${path}`;
}

async function fetchFile(path) {
  return await axios.get(getS3FileUrl(path), { responseType: 'arraybuffer' });
}

const helpers = {
  getHash,
  deleteFile,
  getToken,
  getAdminToken,
  sendEmail,
  getRandomOtp,

  uploadFile,
  getS3FileUrl,
  deleteS3File,
  fetchFile,
};

module.exports = helpers;

const path = require('path');
const { getImageKit } = require('../config/imagekit');

const BLOG_FOLDER = '/dental-care/blogs';

const uploadFile = (file, folder = BLOG_FOLDER) => {
  const imagekit = getImageKit();

  return new Promise((resolve, reject) => {
    imagekit.upload(
      {
        file: file.buffer,
        fileName: file.originalname || `upload-${Date.now()}`,
        folder,
        useUniqueFileName: true,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve({
          url: result.url,
          fileId: result.fileId,
        });
      }
    );
  });
};

const uploadFiles = async (files = []) => {
  const uploads = await Promise.all(files.map((file) => uploadFile(file)));
  return {
    urls: uploads.map((item) => item.url),
    fileIds: uploads.map((item) => item.fileId),
  };
};

const deleteFile = (fileId) => {
  if (!fileId) return Promise.resolve();

  const imagekit = getImageKit();

  return new Promise((resolve, reject) => {
    imagekit.deleteFile(fileId, (error) => {
      if (error) return reject(error);
      resolve();
    });
  });
};

const deleteFiles = async (fileIds = []) => {
  await Promise.all(fileIds.filter(Boolean).map((fileId) => deleteFile(fileId)));
};

const isImageKitUrl = (url) =>
  typeof url === 'string' && url.includes('ik.imagekit.io');

const isLocalUpload = (url) =>
  typeof url === 'string' && url.startsWith('/uploads/');

const deleteLocalFile = (filePath) => {
  if (!isLocalUpload(filePath)) return;

  const fs = require('fs');
  const fullPath = path.join(__dirname, '../../uploads/blogs', path.basename(filePath));
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
};

const deleteMediaAsset = async (url, fileId) => {
  if (fileId) {
    try {
      await deleteFile(fileId);
    } catch {
      // File may already be removed from ImageKit
    }
    return;
  }

  deleteLocalFile(url);
};

module.exports = {
  uploadFile,
  uploadFiles,
  deleteFile,
  deleteFiles,
  deleteMediaAsset,
  isImageKitUrl,
};

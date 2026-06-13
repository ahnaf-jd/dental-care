const imagekitService = require('../services/imagekitService');

const processUploadedFiles = async (files) => {
  if (!files) return {};

  const media = {};

  if (files.coverImage?.[0]) {
    const uploaded = await imagekitService.uploadFile(files.coverImage[0]);
    media.coverImage = uploaded.url;
    media.coverImageFileId = uploaded.fileId;
  }

  if (files.galleryImages?.length) {
    const uploaded = await imagekitService.uploadFiles(files.galleryImages);
    media.galleryImages = uploaded.urls;
    media.galleryImageFileIds = uploaded.fileIds;
  }

  if (files.video?.[0]) {
    const uploaded = await imagekitService.uploadFile(files.video[0]);
    media.video = uploaded.url;
    media.videoFileId = uploaded.fileId;
  }

  return media;
};

module.exports = { processUploadedFiles };

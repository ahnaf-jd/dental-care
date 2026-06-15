const imagekitService = require('./imagekitService');

const FOLDERS = {
  cover: '/dental-care/blogs/covers',
  gallery: '/dental-care/blogs/gallery',
  video: '/dental-care/blogs/videos',
};

/**
 * Upload blog media files to ImageKit with rollback on partial failure.
 * Returns flat fields ready to merge into blog document.
 */
const uploadBlogMedia = async (files) => {
  if (!files || typeof files !== 'object') {
    return {};
  }

  const uploadedFileIds = [];
  const payload = {};

  const track = (fileId) => {
    if (fileId) uploadedFileIds.push(fileId);
  };

  try {
    if (files.coverImage?.[0]) {
      const result = await imagekitService.uploadFile(files.coverImage[0], FOLDERS.cover);
      payload.coverImage = result.url;
      payload.coverImageFileId = result.fileId;
      track(result.fileId);
    }

    if (files.galleryImages?.length) {
      const result = await imagekitService.uploadFiles(files.galleryImages, FOLDERS.gallery);
      payload.galleryImages = result.urls;
      payload.galleryImageFileIds = result.fileIds;
      result.fileIds.forEach(track);
    }

    if (files.video?.[0]) {
      const result = await imagekitService.uploadFile(files.video[0], FOLDERS.video);
      payload.video = result.url;
      payload.videoFileId = result.fileId;
      track(result.fileId);
    }

    return payload;
  } catch (error) {
    await imagekitService.deleteFiles(uploadedFileIds);
    throw error;
  }
};

module.exports = {
  uploadBlogMedia,
  FOLDERS,
};

const imagekitService = require("./imagekitService");

const FOLDER = "/dental-care/site-content";

const IMAGE_FIELDS = {
  heroDoctorImage: { section: "hero", urlKey: "doctorImage", fileIdKey: "doctorImageFileId" },
  aboutImage: { section: "about", urlKey: "image", fileIdKey: "imageFileId" },
  servicesCenterImage: { section: "services", urlKey: "centerImage", fileIdKey: "centerImageFileId" },
  appointmentImage: { section: "appointment", urlKey: "image", fileIdKey: "imageFileId" },
  faqImage: { section: "faq", urlKey: "image", fileIdKey: "imageFileId" },
};

const uploadContentMedia = async (files) => {
  if (!files || typeof files !== "object") {
    return {};
  }

  const uploadedFileIds = [];
  const updates = {};

  const track = (fileId) => {
    if (fileId) uploadedFileIds.push(fileId);
  };

  try {
    for (const [fieldName, config] of Object.entries(IMAGE_FIELDS)) {
      if (files[fieldName]?.[0]) {
        const result = await imagekitService.uploadFile(files[fieldName][0], FOLDER);
        if (!updates[config.section]) updates[config.section] = {};
        updates[config.section][config.urlKey] = result.url;
        updates[config.section][config.fileIdKey] = result.fileId;
        track(result.fileId);
      }
    }

    const testimonialUpdates = {};
    for (const [fieldName, fileList] of Object.entries(files)) {
      const match = fieldName.match(/^testimonialImage_(\d+)$/);
      if (match && fileList?.[0]) {
        const index = Number(match[1]);
        const result = await imagekitService.uploadFile(fileList[0], FOLDER);
        testimonialUpdates[index] = {
          image: result.url,
          imageFileId: result.fileId,
        };
        track(result.fileId);
      }
    }

    if (Object.keys(testimonialUpdates).length) {
      updates.testimonials = { items: testimonialUpdates };
    }

    return updates;
  } catch (error) {
    await imagekitService.deleteFiles(uploadedFileIds);
    throw error;
  }
};

module.exports = {
  uploadContentMedia,
  IMAGE_FIELDS,
};

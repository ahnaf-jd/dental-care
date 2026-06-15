const contentService = require("../services/contentService");
const { uploadContentMedia } = require("../services/contentMediaService");

const getContent = async (req, res, next) => {
  try {
    const content = await contentService.getSiteContent();
    res.status(200).json({ success: true, data: content });
  } catch (error) {
    next(error);
  }
};

const updateContent = async (req, res, next) => {
  try {
    let payload = {};

    if (req.body.content) {
      payload = typeof req.body.content === "string"
        ? JSON.parse(req.body.content)
        : req.body.content;
    }

    const existing = await contentService.getSiteContent();
    const mediaUpdates = await uploadContentMedia(req.files);
    await contentService.deleteOldMedia(existing, payload, mediaUpdates);

    const content = await contentService.updateSiteContent(payload, mediaUpdates);

    res.status(200).json({
      success: true,
      message: "Website content updated successfully",
      data: content,
    });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return res.status(400).json({
        success: false,
        message: "Invalid content JSON",
      });
    }
    next(error);
  }
};

module.exports = {
  getContent,
  updateContent,
};

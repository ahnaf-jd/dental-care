const SiteContent = require("../models/siteContent.model");
const defaultContent = require("../config/defaultContent");
const imagekitService = require("./imagekitService");

const CONTENT_KEY = "main";

const deepMerge = (target, source) => {
  const result = { ...target };
  for (const key of Object.keys(source || {})) {
    if (
      source[key] &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key]) &&
      target[key] &&
      typeof target[key] === "object" &&
      !Array.isArray(target[key])
    ) {
      result[key] = deepMerge(target[key], source[key]);
    } else if (source[key] !== undefined) {
      result[key] = source[key];
    }
  }
  return result;
};

const mergeTestimonialItems = (existingItems, incomingItems, mediaItems) => {
  const count = Math.max(existingItems.length, incomingItems.length);
  const merged = [];

  for (let i = 0; i < count; i += 1) {
    const existing = existingItems[i] || {};
    const incoming = incomingItems[i] || existing;
    const media = mediaItems?.[i] || {};
    merged.push({ ...existing, ...incoming, ...media });
  }

  return merged;
};

const getSiteContent = async () => {
  let doc = await SiteContent.findOne({ key: CONTENT_KEY });

  if (!doc) {
    doc = await SiteContent.create({ key: CONTENT_KEY, ...defaultContent });
  }

  const plain = doc.toObject();
  delete plain.__v;

  return {
    ...defaultContent,
    ...plain,
    hero: { ...defaultContent.hero, ...plain.hero },
    about: { ...defaultContent.about, ...plain.about },
    services: {
      ...defaultContent.services,
      ...plain.services,
      items: plain.services?.items?.length
        ? plain.services.items
        : defaultContent.services.items,
    },
    appointment: { ...defaultContent.appointment, ...plain.appointment },
    faq: {
      ...defaultContent.faq,
      ...plain.faq,
      items: plain.faq?.items?.length ? plain.faq.items : defaultContent.faq.items,
    },
    testimonials: {
      ...defaultContent.testimonials,
      ...plain.testimonials,
      items: plain.testimonials?.items?.length
        ? plain.testimonials.items
        : defaultContent.testimonials.items,
    },
    contact: { ...defaultContent.contact, ...plain.contact },
    footer: { ...defaultContent.footer, ...plain.footer },
  };
};

const updateSiteContent = async (payload, mediaUpdates) => {
  const existing = await getSiteContent();
  const merged = deepMerge(existing, payload);

  if (mediaUpdates.hero) {
    merged.hero = { ...merged.hero, ...mediaUpdates.hero };
  }
  if (mediaUpdates.about) {
    merged.about = { ...merged.about, ...mediaUpdates.about };
  }
  if (mediaUpdates.services) {
    merged.services = { ...merged.services, ...mediaUpdates.services };
  }
  if (mediaUpdates.appointment) {
    merged.appointment = { ...merged.appointment, ...mediaUpdates.appointment };
  }
  if (mediaUpdates.faq) {
    merged.faq = { ...merged.faq, ...mediaUpdates.faq };
  }
  if (mediaUpdates.testimonials?.items) {
    const mediaItems = mediaUpdates.testimonials.items;
    merged.testimonials = {
      ...merged.testimonials,
      items: mergeTestimonialItems(
        existing.testimonials.items,
        merged.testimonials.items,
        typeof mediaItems === "object" && !Array.isArray(mediaItems)
          ? mediaItems
          : mediaItems
      ),
    };
  }

  const updateFields = {
    hero: merged.hero,
    about: merged.about,
    services: merged.services,
    appointment: merged.appointment,
    faq: merged.faq,
    testimonials: merged.testimonials,
    contact: merged.contact,
    footer: merged.footer,
  };

  const doc = await SiteContent.findOneAndUpdate(
    { key: CONTENT_KEY },
    { $set: updateFields },
    { new: true, upsert: true }
  );

  return getSiteContentFromDoc(doc);
};

const getSiteContentFromDoc = (doc) => {
  const plain = doc.toObject();
  return {
    ...defaultContent,
    ...plain,
    hero: { ...defaultContent.hero, ...plain.hero },
    about: { ...defaultContent.about, ...plain.about },
    services: {
      ...defaultContent.services,
      ...plain.services,
      items: plain.services?.items?.length
        ? plain.services.items
        : defaultContent.services.items,
    },
    appointment: { ...defaultContent.appointment, ...plain.appointment },
    faq: {
      ...defaultContent.faq,
      ...plain.faq,
      items: plain.faq?.items?.length ? plain.faq.items : defaultContent.faq.items,
    },
    testimonials: {
      ...defaultContent.testimonials,
      ...plain.testimonials,
      items: plain.testimonials?.items?.length
        ? plain.testimonials.items
        : defaultContent.testimonials.items,
    },
    contact: { ...defaultContent.contact, ...plain.contact },
    footer: { ...defaultContent.footer, ...plain.footer },
  };
};

const deleteOldMedia = async (existing, incoming, mediaUpdates) => {
  const checks = [
    { section: "hero", urlKey: "doctorImage", fileIdKey: "doctorImageFileId", mediaKey: "hero" },
    { section: "about", urlKey: "image", fileIdKey: "imageFileId", mediaKey: "about" },
    { section: "services", urlKey: "centerImage", fileIdKey: "centerImageFileId", mediaKey: "services" },
    { section: "appointment", urlKey: "image", fileIdKey: "imageFileId", mediaKey: "appointment" },
    { section: "faq", urlKey: "image", fileIdKey: "imageFileId", mediaKey: "faq" },
  ];

  for (const check of checks) {
    if (mediaUpdates[check.mediaKey]?.[check.urlKey]) {
      const oldUrl = existing[check.section]?.[check.urlKey];
      const oldFileId = existing[check.section]?.[check.fileIdKey];
      if (oldUrl || oldFileId) {
        await imagekitService.deleteMediaAsset(oldUrl, oldFileId);
      }
    }
  }

  if (mediaUpdates.testimonials?.items) {
    Object.entries(mediaUpdates.testimonials.items).forEach(([index, item]) => {
      if (!item?.image) return;
      const old = existing.testimonials.items[Number(index)];
      if (old?.image || old?.imageFileId) {
        imagekitService.deleteMediaAsset(old.image, old.imageFileId);
      }
    });
  }
};

module.exports = {
  getSiteContent,
  updateSiteContent,
  deleteOldMedia,
};

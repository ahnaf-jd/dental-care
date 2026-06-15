const mongoose = require("mongoose");

const siteContentSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      unique: true,
      default: "main",
    },
    hero: { type: mongoose.Schema.Types.Mixed, default: {} },
    about: { type: mongoose.Schema.Types.Mixed, default: {} },
    services: { type: mongoose.Schema.Types.Mixed, default: {} },
    appointment: { type: mongoose.Schema.Types.Mixed, default: {} },
    faq: { type: mongoose.Schema.Types.Mixed, default: {} },
    testimonials: { type: mongoose.Schema.Types.Mixed, default: {} },
    contact: { type: mongoose.Schema.Types.Mixed, default: {} },
    footer: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SiteContent", siteContentSchema);

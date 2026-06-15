import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Save, ImageIcon } from "lucide-react";
import { fetchSiteContent, updateSiteContent, mediaUrl } from "../../services/contentApi";
import siteContentDefaults from "../../config/siteContentDefaults";
import "../../styles/admin-content.css";

const SECTIONS = [
  { id: "hero", label: "Hero" },
  { id: "about", label: "About Us" },
  { id: "services", label: "Services" },
  { id: "appointment", label: "Appointment Banner" },
  { id: "faq", label: "FAQ" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
  { id: "footer", label: "Footer" },
];

function Field({ label, children }) {
  return (
    <label className="content-field">
      <span>{label}</span>
      {children}
    </label>
  );
}

function ImageUpload({ label, preview, onChange }) {
  return (
    <div className="content-image-field">
      <span>{label}</span>
      <div className="content-image-preview">
        {preview ? (
          <img src={preview} alt={label} />
        ) : (
          <div className="content-image-placeholder">
            <ImageIcon size={28} />
            <p>No image uploaded</p>
          </div>
        )}
      </div>
      <input type="file" accept="image/*" onChange={onChange} />
    </div>
  );
}

export default function ContentAdmin() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("hero");
  const [content, setContent] = useState(siteContentDefaults);
  const [images, setImages] = useState({});
  const [previews, setPreviews] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSiteContent()
      .then((res) => setContent(res.data))
      .catch(() => setError("Failed to load content"))
      .finally(() => setLoading(false));
  }, []);

  const updateSection = (section, field, value) => {
    setContent((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const updateServiceItem = (index, field, value) => {
    setContent((prev) => {
      const items = [...prev.services.items];
      items[index] = { ...items[index], [field]: value };
      return { ...prev, services: { ...prev.services, items } };
    });
  };

  const updateFaqItem = (index, field, value) => {
    setContent((prev) => {
      const items = [...prev.faq.items];
      items[index] = { ...items[index], [field]: value };
      return { ...prev, faq: { ...prev.faq, items } };
    });
  };

  const updateTestimonialItem = (index, field, value) => {
    setContent((prev) => {
      const items = [...prev.testimonials.items];
      items[index] = { ...items[index], [field]: value };
      return { ...prev, testimonials: { ...prev.testimonials, items } };
    });
  };

  const handleImageChange = (key, file, existingUrl) => {
    if (!file) return;
    setImages((prev) => ({ ...prev, [key]: file }));
    setPreviews((prev) => ({ ...prev, [key]: URL.createObjectURL(file) }));
  };

  const handleTestimonialImage = (index, file) => {
    if (!file) return;
    const key = `testimonial_${index}`;
    setImages((prev) => ({ ...prev, [key]: file }));
    setPreviews((prev) => ({ ...prev, [key]: URL.createObjectURL(file) }));
  };

  const getPreview = (key, url) => previews[key] || mediaUrl(url);

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const formData = new FormData();
      const payload = JSON.parse(JSON.stringify(content));

      delete payload._id;
      delete payload.key;
      delete payload.createdAt;
      delete payload.updatedAt;
      delete payload.__v;

      ["hero", "about", "services", "appointment", "faq"].forEach((section) => {
        delete payload[section]?.doctorImageFileId;
        delete payload[section]?.imageFileId;
        delete payload[section]?.centerImageFileId;
      });

      payload.testimonials.items = payload.testimonials.items.map((item) => {
        const copy = { ...item };
        delete copy.imageFileId;
        return copy;
      });

      formData.append("content", JSON.stringify(payload));

      if (images.heroDoctorImage) formData.append("heroDoctorImage", images.heroDoctorImage);
      if (images.aboutImage) formData.append("aboutImage", images.aboutImage);
      if (images.servicesCenterImage) formData.append("servicesCenterImage", images.servicesCenterImage);
      if (images.appointmentImage) formData.append("appointmentImage", images.appointmentImage);
      if (images.faqImage) formData.append("faqImage", images.faqImage);

      content.testimonials.items.forEach((_, index) => {
        const key = `testimonial_${index}`;
        if (images[key]) {
          formData.append(`testimonialImage_${index}`, images[key]);
        }
      });

      const res = await updateSiteContent(formData);
      setContent(res.data);
      setImages({});
      setPreviews({});
      setMessage("Changes saved successfully.");
    } catch (err) {
      setError(err.message || "Failed to save content");
    } finally {
      setSaving(false);
    }
  };

  const renderSectionForm = () => {
    switch (activeSection) {
      case "hero":
        return (
          <>
            <Field label="Tag">
              <input value={content.hero.tag} onChange={(e) => updateSection("hero", "tag", e.target.value)} />
            </Field>
            <Field label="Title Line 1">
              <input value={content.hero.titleLine1} onChange={(e) => updateSection("hero", "titleLine1", e.target.value)} />
            </Field>
            <Field label="Title Line 2">
              <input value={content.hero.titleLine2} onChange={(e) => updateSection("hero", "titleLine2", e.target.value)} />
            </Field>
            <Field label="Description">
              <textarea value={content.hero.description} onChange={(e) => updateSection("hero", "description", e.target.value)} rows={4} />
            </Field>
            <Field label="Doctor Name">
              <input value={content.hero.doctorName} onChange={(e) => updateSection("hero", "doctorName", e.target.value)} />
            </Field>
            <Field label="Doctor Title">
              <input value={content.hero.doctorTitle} onChange={(e) => updateSection("hero", "doctorTitle", e.target.value)} />
            </Field>
            <ImageUpload
              label="Doctor Image"
              preview={getPreview("heroDoctorImage", content.hero.doctorImage)}
              onChange={(e) => handleImageChange("heroDoctorImage", e.target.files[0])}
            />
          </>
        );

      case "about":
        return (
          <>
            <Field label="Tag">
              <input value={content.about.tag} onChange={(e) => updateSection("about", "tag", e.target.value)} />
            </Field>
            <Field label="Title Line 1">
              <input value={content.about.titleLine1} onChange={(e) => updateSection("about", "titleLine1", e.target.value)} />
            </Field>
            <Field label="Title Line 2">
              <input value={content.about.titleLine2} onChange={(e) => updateSection("about", "titleLine2", e.target.value)} />
            </Field>
            <Field label="Description">
              <textarea value={content.about.description} onChange={(e) => updateSection("about", "description", e.target.value)} rows={4} />
            </Field>
            <Field label="Years of Experience">
              <input value={content.about.experienceYears} onChange={(e) => updateSection("about", "experienceYears", e.target.value)} />
            </Field>
            <ImageUpload
              label="About Image"
              preview={getPreview("aboutImage", content.about.image)}
              onChange={(e) => handleImageChange("aboutImage", e.target.files[0])}
            />
          </>
        );

      case "services":
        return (
          <>
            <Field label="Section Tag">
              <input value={content.services.tag} onChange={(e) => updateSection("services", "tag", e.target.value)} />
            </Field>
            <Field label="Section Title">
              <input value={content.services.title} onChange={(e) => updateSection("services", "title", e.target.value)} />
            </Field>
            <ImageUpload
              label="Center Image"
              preview={getPreview("servicesCenterImage", content.services.centerImage)}
              onChange={(e) => handleImageChange("servicesCenterImage", e.target.files[0])}
            />
            <div className="content-subsection">
              <h3>Service Items</h3>
              {content.services.items.map((item, index) => (
                <div key={index} className="content-card">
                  <h4>Service {index + 1}</h4>
                  <Field label="Title">
                    <input value={item.title} onChange={(e) => updateServiceItem(index, "title", e.target.value)} />
                  </Field>
                  <Field label="Description">
                    <textarea value={item.text} onChange={(e) => updateServiceItem(index, "text", e.target.value)} rows={2} />
                  </Field>
                </div>
              ))}
            </div>
          </>
        );

      case "appointment":
        return (
          <>
            <Field label="Eyebrow Text">
              <input value={content.appointment.eyebrow} onChange={(e) => updateSection("appointment", "eyebrow", e.target.value)} />
            </Field>
            <Field label="Heading Line 1">
              <input value={content.appointment.headingLine1} onChange={(e) => updateSection("appointment", "headingLine1", e.target.value)} />
            </Field>
            <Field label="Heading Line 2">
              <input value={content.appointment.headingLine2} onChange={(e) => updateSection("appointment", "headingLine2", e.target.value)} />
            </Field>
            <Field label="Button Text">
              <input value={content.appointment.ctaText} onChange={(e) => updateSection("appointment", "ctaText", e.target.value)} />
            </Field>
            <ImageUpload
              label="Banner Image"
              preview={getPreview("appointmentImage", content.appointment.image)}
              onChange={(e) => handleImageChange("appointmentImage", e.target.files[0])}
            />
          </>
        );

      case "faq":
        return (
          <>
            <Field label="Eyebrow Text">
              <input value={content.faq.eyebrow} onChange={(e) => updateSection("faq", "eyebrow", e.target.value)} />
            </Field>
            <Field label="Title Line 1">
              <input value={content.faq.titleLine1} onChange={(e) => updateSection("faq", "titleLine1", e.target.value)} />
            </Field>
            <Field label="Title Line 2">
              <input value={content.faq.titleLine2} onChange={(e) => updateSection("faq", "titleLine2", e.target.value)} />
            </Field>
            <ImageUpload
              label="FAQ Image"
              preview={getPreview("faqImage", content.faq.image)}
              onChange={(e) => handleImageChange("faqImage", e.target.files[0])}
            />
            <div className="content-subsection">
              <h3>Questions</h3>
              {content.faq.items.map((item, index) => (
                <div key={index} className="content-card">
                  <h4>FAQ {index + 1}</h4>
                  <Field label="Question">
                    <input value={item.question} onChange={(e) => updateFaqItem(index, "question", e.target.value)} />
                  </Field>
                  <Field label="Answer">
                    <textarea value={item.answer} onChange={(e) => updateFaqItem(index, "answer", e.target.value)} rows={3} />
                  </Field>
                </div>
              ))}
            </div>
          </>
        );

      case "testimonials":
        return (
          <>
            <Field label="Eyebrow Text">
              <input value={content.testimonials.eyebrow} onChange={(e) => updateSection("testimonials", "eyebrow", e.target.value)} />
            </Field>
            <Field label="Section Title">
              <input value={content.testimonials.title} onChange={(e) => updateSection("testimonials", "title", e.target.value)} />
            </Field>
            <div className="content-subsection">
              <h3>Client Reviews</h3>
              {content.testimonials.items.map((item, index) => (
                <div key={index} className="content-card">
                  <h4>Review {index + 1}</h4>
                  <Field label="Name">
                    <input value={item.name} onChange={(e) => updateTestimonialItem(index, "name", e.target.value)} />
                  </Field>
                  <Field label="Role">
                    <input value={item.role} onChange={(e) => updateTestimonialItem(index, "role", e.target.value)} />
                  </Field>
                  <Field label="Rating (1-5)">
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={item.rating}
                      onChange={(e) => updateTestimonialItem(index, "rating", Number(e.target.value))}
                    />
                  </Field>
                  <Field label="Review Text">
                    <textarea value={item.text} onChange={(e) => updateTestimonialItem(index, "text", e.target.value)} rows={3} />
                  </Field>
                  <ImageUpload
                    label="Client Photo"
                    preview={getPreview(`testimonial_${index}`, item.image)}
                    onChange={(e) => handleTestimonialImage(index, e.target.files[0])}
                  />
                </div>
              ))}
            </div>
          </>
        );

      case "contact":
        return (
          <>
            <Field label="Eyebrow Text">
              <input value={content.contact.eyebrow} onChange={(e) => updateSection("contact", "eyebrow", e.target.value)} />
            </Field>
            <Field label="Section Title">
              <input value={content.contact.title} onChange={(e) => updateSection("contact", "title", e.target.value)} />
            </Field>
            <Field label="Form Title">
              <input value={content.contact.formTitle} onChange={(e) => updateSection("contact", "formTitle", e.target.value)} />
            </Field>
            <Field label="Office Address">
              <textarea value={content.contact.address} onChange={(e) => updateSection("contact", "address", e.target.value)} rows={3} />
            </Field>
            <Field label="Working Hours">
              <textarea value={content.contact.hours} onChange={(e) => updateSection("contact", "hours", e.target.value)} rows={3} />
            </Field>
            <Field label="Email Addresses">
              <textarea value={content.contact.emails} onChange={(e) => updateSection("contact", "emails", e.target.value)} rows={2} />
            </Field>
          </>
        );

      case "footer":
        return (
          <>
            <Field label="Brand Name">
              <input value={content.footer.brandName} onChange={(e) => updateSection("footer", "brandName", e.target.value)} />
            </Field>
            <Field label="Description">
              <textarea value={content.footer.description} onChange={(e) => updateSection("footer", "description", e.target.value)} rows={4} />
            </Field>
            <Field label="Hours Label">
              <input value={content.footer.hoursLabel} onChange={(e) => updateSection("footer", "hoursLabel", e.target.value)} />
            </Field>
            <Field label="Working Hours">
              <input value={content.footer.hours} onChange={(e) => updateSection("footer", "hours", e.target.value)} />
            </Field>
            <Field label="Address">
              <input value={content.footer.address} onChange={(e) => updateSection("footer", "address", e.target.value)} />
            </Field>
            <Field label="Phone">
              <input value={content.footer.phone} onChange={(e) => updateSection("footer", "phone", e.target.value)} />
            </Field>
            <Field label="Emails">
              <textarea value={content.footer.emails} onChange={(e) => updateSection("footer", "emails", e.target.value)} rows={2} />
            </Field>
            <Field label="Copyright">
              <input value={content.footer.copyright} onChange={(e) => updateSection("footer", "copyright", e.target.value)} />
            </Field>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="admin-content-page">
      <header className="admin-content-topbar">
        <div className="admin-content-topbar__inner">
          <div className="admin-content-topbar__left">
            <button type="button" className="admin-content-back" onClick={() => navigate("/admin-dashboard")}>
              ← Dashboard
            </button>
            <div>
              <h1>Website Content</h1>
              <p>Edit homepage text and images across all sections.</p>
            </div>
          </div>
          <button type="button" className="admin-content-save" onClick={handleSave} disabled={saving || loading}>
            <Save size={18} />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </header>

      <div className="admin-content-body">
        {message && <div className="content-alert content-alert--success">{message}</div>}
        {error && <div className="content-alert content-alert--error">{error}</div>}

        {loading ? (
          <div className="content-loading">Loading content...</div>
        ) : (
          <div className="content-layout">
            <aside className="content-sidebar">
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  className={`content-sidebar__item${activeSection === section.id ? " active" : ""}`}
                  onClick={() => setActiveSection(section.id)}
                >
                  {section.label}
                </button>
              ))}
            </aside>

            <main className="content-panel">
              <h2>{SECTIONS.find((s) => s.id === activeSection)?.label}</h2>
              <div className="content-form">{renderSectionForm()}</div>
            </main>
          </div>
        )}
      </div>
    </div>
  );
}

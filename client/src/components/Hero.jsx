import { useState } from "react";
import "./hero.css";
import doctorImg2 from "../assets/doctor2.jpeg";
import { useSiteContent } from "../context/SiteContentContext";
import { mediaUrl } from "../services/contentApi";

export default function Hero() {
  const content = useSiteContent();
  const { hero } = content;
  const [phone, setPhone] = useState("+880 ");
  const [phoneError, setPhoneError] = useState("");

  const doctorImage = mediaUrl(hero.doctorImage) || doctorImg2;

  const handlePhoneChange = (e) => {
    let value = e.target.value;
    let sanitized = value.replace(/[^\d+\s]/g, "");

    if (!sanitized.startsWith("+880")) {
      sanitized = "+880 " + sanitized.replace(/^\+?880?\s?/, "");
    }

    if (sanitized.length > 5 && !sanitized.match(/^\+880\s\d{1,10}$/)) {
      setPhoneError("Invalid phone number format");
    } else {
      setPhoneError("");
    }

    setPhone(sanitized);
  };

  const handleCallBack = () => {
    if (!phone.match(/^\+880\s\d{10}$/)) {
      alert("Please enter a valid phone number (+880 followed by 10 digits)");
      return;
    }

    alert(`We'll call you back at ${phone}`);
  };

  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-left">
          <span className="hero-tag">{hero.tag}</span>

          <h1>
            {hero.titleLine1} <br />
            {hero.titleLine2}
          </h1>

          <p>{hero.description}</p>

          <div className="hero-form">
            <input
              type="text"
              placeholder="+880 "
              value={phone}
              onChange={handlePhoneChange}
              onKeyPress={(e) => e.key === "Enter" && handleCallBack()}
              style={{ borderColor: phoneError ? "#ef4444" : "transparent" }}
            />

            <button onClick={handleCallBack}>GET CALL BACK</button>
            {phoneError && (
              <div
                style={{
                  width: "100%",
                  color: "#ef4444",
                  fontSize: "12px",
                  marginTop: "5px",
                  fontWeight: "500",
                }}
              >
                {phoneError}
              </div>
            )}
          </div>
        </div>

        <div className="hero-right">
          <div className="shape"></div>

          <img src={doctorImage} alt="Doctor" className="doctor" />

          <div className="doctor-card">
            <div className="avatar">Dr</div>

            <div className="doctor-card-content">
              <h4 className="doctor-card-name">{hero.doctorName}</h4>
              <p className="doctor-card-title">{hero.doctorTitle}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import "./Hero.css";
import doctorImg from "../assets/doctor.png";
import doctorImg2 from "../assets/doctor2.jpeg";

export default function Hero() {
  const [phone, setPhone] = useState("+880 ");
  const [phoneError, setPhoneError] = useState("");

  const handlePhoneChange = (e) => {
    let value = e.target.value;
    
    // Only allow digits, +, and spaces
    let sanitized = value.replace(/[^\d+\s]/g, "");
    
    // If user tries to remove the +880 prefix, keep it
    if (!sanitized.startsWith("+880")) {
      sanitized = "+880 " + sanitized.replace(/^\+?880?\s?/, "");
    }
    
    // Validate format
    if (sanitized.length > 5 && !sanitized.match(/^\+880\s\d{1,10}$/)) {
      setPhoneError("Invalid phone number format");
    } else {
      setPhoneError("");
    }
    
    setPhone(sanitized);
  };

  const handleCallBack = () => {
    // Validate phone format
    if (!phone.match(/^\+880\s\d{10}$/)) {
      alert("Please enter a valid phone number (+880 followed by 10 digits)");
      return;
    }

    alert(`We'll call you back at ${phone}`);
    // You can add API call here to save the phone number
  };

  return (
    <section className="hero">
      <div className="hero-container">

        <div className="hero-left">
          <span className="hero-tag">
            WELCOME TO Dental Care
          </span>

          <h1>
            We Provide <br />
            Dental Service
          </h1>

          <p>
            lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel sapien eget nunc gravida sodales. Sed at felis a enim efficitur efficitur. In hac habitasse platea dictumst. Donec ac ligula id nunc efficitur convallis.
          </p>

          <div className="hero-form">
            <input
              type="text"
              placeholder="+880 "
              value={phone}
              onChange={handlePhoneChange}
              onKeyPress={(e) => e.key === "Enter" && handleCallBack()}
              style={{ borderColor: phoneError ? "#ef4444" : "transparent" }}
            />

            <button onClick={handleCallBack}>
              GET CALL BACK
            </button>
            {phoneError && <div style={{ 
              width: "100%", 
              color: "#ef4444", 
              fontSize: "12px", 
              marginTop: "5px",
              fontWeight: "500"
            }}>{phoneError}</div>}
          </div>
        </div>

        <div className="hero-right">

  <div className="shape"></div>

  <img
    src={doctorImg2}
    alt="Doctor"
    className="doctor"
  />

  <div className="doctor-card">
    <div className="avatar">Dr</div>

    <div className="doctor-card-content">
      <h4 className="doctor-card-name">Dr. John Smith</h4>
      <p className="doctor-card-title">Best Dental Specialist</p>
    </div>
  </div>

        </div>
      </div>
    </section>
  );
}


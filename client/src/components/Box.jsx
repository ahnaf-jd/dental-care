import { useState } from "react";
import "./box.css";

export default function SearchBar() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "+880 ",
  });
  const [phoneError, setPhoneError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "phone") {
      // Ensure +880 prefix is always maintained
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
      
      setFormData({
        ...formData,
        phone: sanitized
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate name
    if (!formData.name.trim()) {
      alert("Please enter your name");
      return;
    }

    // Validate phone format before submission
    if (!formData.phone.match(/^\+880\s\d{10}$/)) {
      alert("Please enter a valid phone number (+880 followed by 10 digits)");
      return;
    }

    await fetch(
      "YOUR_GOOGLE_SCRIPT_URL",
      {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    alert("Submitted Successfully!");
  };

  return (
    <div className="search-wrapper">
      <form className="search-box" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          onKeyPress={(e) => e.key === "Enter" && handleSubmit(e)}
        />

        <input
          type="text"
          name="phone"
          placeholder="+880 "
          value={formData.phone}
          onChange={handleChange}
          onKeyPress={(e) => e.key === "Enter" && handleSubmit(e)}
          style={{ borderColor: phoneError ? "#ef4444" : "transparent" }}
        />
        {phoneError && <div style={{ 
          flex: "1 1 100%", 
          color: "#ef4444", 
          fontSize: "12px", 
          marginTop: "-10px",
          fontWeight: "500"
        }}>{phoneError}</div>}

        

        <button type="submit">
          SUBMIT NOW
        </button>
      </form>
    </div>
  );
}
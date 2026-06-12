import { useState } from "react";
import "./box.css";

export default function SearchBar() {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
          onChange={handleChange}
        />

        <input
          type="number"
          name="phone-number"
          placeholder=" Your Phone Number..."
          onChange={handleChange}
        />

        

        <button type="submit">
          SUBMIT NOW
        </button>
      </form>
    </div>
  );
}
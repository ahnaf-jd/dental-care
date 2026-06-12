import "./service.css";
import serviceImg from "../assets/service.png";

import {
  FaTooth,
  FaUserMd,
  FaTeeth,
  FaClinicMedical,
  FaNotesMedical,
  FaStethoscope,
} from "react-icons/fa";

export default function Services() {
  const leftServices = [
    {
      title: "Root Canal",
      text: "Aenean eleifend turpis tellus, nec laoreet metus elementum ac.",
      icon: <FaTooth />,
    },
    {
      title: "Alignment Teeth",
      text: "Aenean eleifend turpis tellus, nec laoreet metus elementum ac.",
      icon: <FaTeeth />,
    },
    {
      title: "Cosmetic Teeth",
      text: "Aenean eleifend turpis tellus, nec laoreet metus elementum ac.",
      icon: <FaClinicMedical />,
    },
  ];

  const rightServices = [
    {
      title: "Oral Hygiene",
      text: "Aenean eleifend turpis tellus, nec laoreet metus elementum ac.",
      icon: <FaNotesMedical />,
    },
    {
      title: "Live Advisory",
      text: "Aenean eleifend turpis tellus, nec laoreet metus elementum ac.",
      icon: <FaUserMd />,
    },
    {
      title: "Cavity Inspection",
      text: "Aenean eleifend turpis tellus, nec laoreet metus elementum ac.",
      icon: <FaStethoscope />,
    },
  ];

  return (
    <section className="services">
      <div className="services-header">
        <span>OUR SERVICES</span>
        <h2>What We Provide</h2>
      </div>

      <div className="services-wrapper">
        <div className="services-column">
          {leftServices.map((item, index) => (
            <div className="service-card" key={index}>
              <div className="service-content">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>

              <div className="service-icon">{item.icon}</div>
            </div>
          ))}
        </div>

        <div className="services-center">
          <img src={serviceImg} alt="Dental Service" />
        </div>

        <div className="services-column">
          {rightServices.map((item, index) => (
            <div className="service-card" key={index}>
              <div className="service-icon">{item.icon}</div>

              <div className="service-content">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
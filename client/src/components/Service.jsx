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
import { useSiteContent } from "../context/SiteContentContext";
import { mediaUrl } from "../services/contentApi";

const SERVICE_ICONS = [
  <FaTooth />,
  <FaTeeth />,
  <FaClinicMedical />,
  <FaNotesMedical />,
  <FaUserMd />,
  <FaStethoscope />,
];

export default function Services() {
  const { services } = useSiteContent();
  const centerImage = mediaUrl(services.centerImage) || serviceImg;
  const leftServices = services.items.slice(0, 3);
  const rightServices = services.items.slice(3, 6);

  return (
    <section className="services">
      <div className="services-header">
        <span>{services.tag}</span>
        <h2>{services.title}</h2>
      </div>

      <div className="services-wrapper">
        <div className="services-column">
          {leftServices.map((item, index) => (
            <div className="service-card" key={index}>
              <div className="service-content">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>

              <div className="service-icon">{SERVICE_ICONS[index]}</div>
            </div>
          ))}
        </div>

        <div className="services-center">
          <img src={centerImage} alt="Dental Service" />
        </div>

        <div className="services-column">
          {rightServices.map((item, index) => (
            <div className="service-card" key={index}>
              <div className="service-icon">{SERVICE_ICONS[index + 3]}</div>

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

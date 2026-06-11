import "./about-us.css";

export default function AboutUs() {
  return (
    <section className="about-us">
      <div className="about-container">
        {/* Left Side - Images */}
        <div className="about-left">
          <div className="about-images">
            <div className="image-card large">
              <img src="https://images.unsplash.com/photo-1606611013016-969c19d4a42f?w=400&h=500&fit=crop" alt="Dental clinic" />
            </div>
            <div className="image-card small">
              <img src="https://images.unsplash.com/photo-1583368632088-67e9dfeb4747?w=300&h=300&fit=crop" alt="Dentist with patient" />
            </div>
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="about-right">
          <span className="about-tag">ABOUT US</span>
          
          <h2>Your Trusted Dental Care</h2>
          
          <p>
            With over 10 years of experience, our team of expert dentists is committed 
            to providing you with the highest quality dental care in a comfortable and welcoming environment.
          </p>
        </div>
        </div>
    </section>
  );
}

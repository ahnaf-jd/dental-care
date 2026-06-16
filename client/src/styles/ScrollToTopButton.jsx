import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);

    return () =>
      window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={`scroll-top-btn ${
        visible ? "show" : ""
      }`}
      onClick={scrollToTop}
    >
      <ArrowUp size={22} />
    </button>
  );
}


/* ScrollToTopButton.css */
<style>{`
.scroll-top-btn {
  position: fixed;
  right: 30px;
  bottom: 30px;

  width: 55px;
  height: 55px;

  border: none;
  border-radius: 50%;

  background: #356df3;
  color: white;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  box-shadow: 0 8px 25px rgba(53, 109, 243, 0.3);

  z-index: 999;

  opacity: 0;
  visibility: hidden;

  transform: translateY(20px);

  transition: all 0.3s ease;
}

.scroll-top-btn.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.scroll-top-btn:hover {
  transform: translateY(-5px);
}

@media (max-width: 768px) {
  .scroll-top-btn {
    width: 50px;
    height: 50px;

    right: 20px;
    bottom: 20px;
  }
}
`}</style>
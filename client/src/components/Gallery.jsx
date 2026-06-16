import { useState } from "react";
import "./Gallery.css";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";

import { X, Play } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Gallery() {
  const [selectedItem, setSelectedItem] = useState(null);

  const galleryItems = [
    {
      id: 1,
      type: "image",
      url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200",
    },
 
    {
      id: 3,
      type: "video",
      url: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      id: 4,
      type: "image",
      url: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=1200",
    },
    {
      id: 5,
      type: "image",
      url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200",
    },
  ];

  return (
    <section className="gallery">
      <div className="gallery-header">
        <span>OUR GALLERY</span>
        <h2>Explore Our Dental Clinic</h2>
        <p>
          Take a look at our facilities, equipment and
          patient care environment.
        </p>
      </div>

      <Swiper
        modules={[
          Navigation,
          Pagination,
          Autoplay,
        ]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        loop
        spaceBetween={25}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 3,
          },
        }}
      >
        {galleryItems.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              className="gallery-card"
              onClick={() =>
                setSelectedItem(item)
              }
            >
              {item.type === "image" ? (
                <img
                  src={item.url}
                  alt="Gallery"
                />
              ) : (
                <>
                  <video
                    src={item.url}
                    muted
                    preload="metadata"
                  />

                  <div className="play-overlay">
                    <Play size={40} />
                  </div>
                </>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {selectedItem && (
        <div
          className="gallery-modal"
          onClick={() =>
            setSelectedItem(null)
          }
        >
          <div
            className="gallery-modal-content"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <button
              className="gallery-close"
              onClick={() =>
                setSelectedItem(null)
              }
            >
              <X size={22} />
            </button>

            {selectedItem.type === "image" ? (
              <img
                src={selectedItem.url}
                alt=""
              />
            ) : (
              <video
                src={selectedItem.url}
                controls
                autoPlay
                controlsList="nodownload noplaybackrate"
                disablePictureInPicture
                onContextMenu={(e) => e.preventDefault()}
                />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
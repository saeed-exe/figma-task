import React, { useRef, useState } from "react";
import "./index.css";
import questionMark from "./assets/ques.png";

type TabKey = "about" | "exp" | "rec";

const initialImages = [
  "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=800&q=60&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=60&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?w=800&q=60&auto=format&fit=crop",
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>("about");
  const [images, setImages] = useState<string[]>(initialImages);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function setTab(t: TabKey) {
    setActiveTab(t);
  }

  function scrollCarousel(delta: number) {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({ left: delta, behavior: "smooth" });
  }

  function onAddImageClick() {
    fileInputRef.current?.click();
  }

  function onFilesPicked(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;
    const added: string[] = [];
    Array.from(files).forEach((f) => {
      const url = URL.createObjectURL(f);
      added.push(url);
    });
    setImages((s) => [...s, ...added]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <div className="page-root">
      <aside className="left-empty" aria-hidden />

      <main className="right-area">
        <section className="widget widget-top" role="region" aria-label="Profile widget">
          <div className="widget-inner">
            <div className="widget-badge" aria-hidden>
              <div className="qm-logo" title="logo">
                <img src={questionMark} alt="?" className="qm-img" />
              </div>
              <div className="mini-grid" aria-hidden>
                <div className="mini-rect" />
                <div className="mini-rect" />
                <div className="mini-rect" />
                <div className="mini-rect" />
                <div className="mini-rect" />
                <div className="mini-rect" />
              </div>
            </div>

            <div className="m1">
              <div className="tabs-row">
                <div className="tabs" role="tablist" aria-label="Profile tabs">
                  <button
                    className={`tab ${activeTab === "about" ? "active" : ""}`}
                    onClick={() => setTab("about")}
                    role="tab"
                    aria-selected={activeTab === "about"}
                  >
                    About Me
                  </button>
                  <button
                    className={`tab ${activeTab === "exp" ? "active" : ""}`}
                    onClick={() => setTab("exp")}
                    role="tab"
                    aria-selected={activeTab === "exp"}
                  >
                    Experiences
                  </button>
                  <button
                    className={`tab ${activeTab === "rec" ? "active" : ""}`}
                    onClick={() => setTab("rec")}
                    role="tab"
                    aria-selected={activeTab === "rec"}
                  >
                    Recommended
                  </button>
                  <div className={`tab-pill ${activeTab}`} aria-hidden />
                </div>
              </div>

              <div className="widget-content">
                <div className="content-text">
                  {activeTab === "about" && (
                    <>
                      <p className="para">
                        Hello! I’m Dave, your sales rep here from Salesforce. I’ve been working at this awesome
                        company for 3 years now.
                      </p>
                      <p className="para muted">
                        I was born and raised in Albany, NY & have been living in Santa Carla for the past 10 years with
                        my wife Tiffany and my 4 year old twin daughters — Emma and Ella. Both of them are just starting
                        school, so my calendar is usually blocked between 9–10 AM. This is a...
                      </p>
                    </>
                  )}
                  {activeTab === "exp" && (
                    <>
                      <p className="para">
                        Hello! I’m Dave, your sales rep here from Salesforce. I’ve been working at this awesome
                        company for 3 years now.
                      </p>
                      <p className="para muted">
                        I was born and raised in Albany, NY & have been living in Santa Carla for the past 10 years with
                        my wife Tiffany and my 4 year old twin daughters — Emma and Ella. Both of them are just starting
                        school, so my calendar is usually blocked between 9–10 AM. This is a...
                      </p>
                    </>
                  )}
                  {activeTab === "rec" && (
                    <>
                      <p className="para">
                        Hello! I’m Dave, your sales rep here from Salesforce. I’ve been working at this awesome
                        company for 3 years now.
                      </p>
                      <p className="para muted">
                        I was born and raised in Albany, NY & have been living in Santa Carla for the past 10 years with
                        my wife Tiffany and my 4 year old twin daughters — Emma and Ella. Both of them are just starting
                        school, so my calendar is usually blocked between 9–10 AM. This is a...
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="spacer" />

        <section className="widget widget-bottom" role="region" aria-label="Gallery widget">
          <div className="widget-inner">
            <div className="widget-badge" aria-hidden>
              <div className="qm-logo" title="logo">
                <img src={questionMark} alt="?" className="qm-img" />
              </div>
              <div className="mini-grid" aria-hidden>
                <div className="mini-rect" />
                <div className="mini-rect" />
                <div className="mini-rect" />
                <div className="mini-rect" />
                <div className="mini-rect" />
                <div className="mini-rect" />
              </div>
            </div>

            <div className="m1">
              <div className="gallery-header">
                <div className="gallery-title">Gallery</div>
                <div className="gallery-controls">
                  <button className="add-btn" onClick={onAddImageClick}>
                    + ADD IMAGE
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={onFilesPicked}
                    style={{ display: "none" }}
                  />
                  <button
                    className="nav-circle"
                    aria-label="previous"
                    onClick={() => scrollCarousel(-360)}
                  >
                    ←
                  </button>
                  <button
                    className="nav-circle"
                    aria-label="next"
                    onClick={() => scrollCarousel(360)}
                  >
                    →
                  </button>
                </div>
              </div>

              <div className="carousel-wrap">
                <div ref={carouselRef} className="carousel">
                  {images.map((src, idx) => (
                    <div className="img-card" key={idx}>
                      <img src={src} alt={`gallery-${idx}`} draggable={false} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="spacer" />
      </main>
    </div>
  );
}

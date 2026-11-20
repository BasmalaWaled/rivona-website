"use client";

import { useRef, useState } from "react";
import { useLanguage } from "./components/LanguageContext";
import { KineticText } from "./components/MotionEffects";
import {
  Aperture,
  Clapperboard,
  Megaphone,
  MessagesSquare,
  PenTool,
  Search,
  Target,
} from "lucide-react";

const serviceIcons = [
  PenTool,
  Clapperboard,
  Megaphone,
  Search,
  MessagesSquare,
  Target,
  Aperture,
];
const projectImages = [
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85",
  "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1200&q=85",
  "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1200&q=85",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=85",
];

export default function Home() {
  const { messages } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isCategoryClosing, setIsCategoryClosing] = useState(false);
  const categoryCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const filteredProjects =
    activeFilter === "ALL"
      ? messages.portfolio.items
          : messages.portfolio.items.filter(
          (project) => project.category === activeFilter,
        );

  const closePortfolioCategory = () => {
    if (categoryCloseTimer.current) clearTimeout(categoryCloseTimer.current);
    setIsCategoryClosing(true);
    categoryCloseTimer.current = setTimeout(() => {
      setActiveCategory(null);
      setIsCategoryClosing(false);
      categoryCloseTimer.current = null;
    }, 280);
  };

  return (
    <main className="home-page">

      {/* Home Section */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <div className="hero-label">
            <span className="gold-dot"></span>
            {messages.hero.label}
          </div>

          <h1>
            <KineticText>{messages.hero.headline}</KineticText>
            <br />
            <span><KineticText>{messages.hero.headlineAccent}</KineticText></span>
          </h1>

          <p className="hero-description">
            {messages.hero.descriptionFirst}
            <br className="desktop-break" />
            {messages.hero.descriptionSecond}
          </p>

          <div className="contact-details">
            <a href="mailto:Rivonamedia@gmail.com">
              <span>✉</span>
              RIVONAMEDIA@GMAIL.COM
            </a>

            <span className="detail-separator">·</span>

            <a href="tel:+201028409979">
              <span>⌕</span>
              +20 10 2840 9979
            </a>

            <span className="detail-separator">·</span>

            <span className="location">
              {messages.hero.location}
            </span>
          </div>

          <div className="hero-buttons">
            <a href="#portfolio" className="primary-button">
              {messages.hero.explore} <span>↓</span>
            </a>

            <a href="#contact" className="secondary-button">
              {messages.hero.collaborate} <span>↗</span>
            </a>
          </div>
        </div>
      </section>

    

      {/* About Section */}
      <section id="about" className="about-section">

        <section className="about-intro">
          <div className="about-story">

            <div className="section-label">
              <span>{messages.about.storyLabel}</span>
              <i></i>
            </div>

            <h1 className="about-quote">
              <KineticText>{messages.about.quote}</KineticText>
            </h1>

            <div className="founding-quote">
              <h3>{messages.about.foundingQuote}</h3>
              <p>{messages.about.foundingCaption}</p>
            </div>

            <div className="story-text">
              {messages.about.story.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="about-signature">
              <div>
                <h3>RIVONA MEDIA</h3>
                <span>{messages.about.signature}</span>
              </div>
            </div>
          </div>

          <div className="about-visual-column">
            <div className="about-image">
  <img
    src={`${
      process.env.NODE_ENV === "production"
        ? "/rivona-website"
        : ""
    }/images/about.jpg`}
    alt="Rivona Media Creative Space"
  />
</div>

            <div className="image-caption">
              <span>{messages.about.creativeSpace}</span>
              <p>{messages.about.creativeSpaceDescription}</p>
            </div>

            <div className="about-highlights">
              {messages.about.highlights.map(([title, description]) => (
                <div className="highlight-card" key={title}>
                  <strong>{title}</strong>
                  <span>{description}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="about-philosophy">
          <div className="section-label">
            <span>{messages.about.philosophyLabel}</span>
            <i></i>
          </div>

          <div className="philosophy-grid">

            <article className="philosophy-card mission-card">
              <div className="card-icon">⚑</div>
              <span className="card-label">{messages.about.purpose}</span>
              <h2><KineticText>{messages.about.mission}</KineticText></h2>

              <blockquote>
                {messages.about.missionQuote}
              </blockquote>

              <p>{messages.about.missionDescription}</p>

              <a href="#services" className="card-link">
                {messages.about.whatWeDo} <span>→</span>
              </a>
            </article>

            <article className="philosophy-card values-card">
              <div className="card-icon">⚖</div>
              <span className="card-label">{messages.about.principles}</span>
              <h2><KineticText>{messages.about.valuesTitle}</KineticText></h2>

              <div className="values-grid">
                {messages.about.values.map((value) => (
                  <div className="value-item" key={value.title}>
                    <h3>{value.title}</h3>
                    <p>{value.description}</p>
                  </div>
                ))}
              </div>

              <a href="#team" className="card-link">
                {messages.about.workStyle} <span>→</span>
              </a>
            </article>

            <article className="philosophy-card goals-card">
              <div className="card-icon">◎</div>
              <span className="card-label">{messages.about.direction}</span>
              <h2><KineticText>{messages.about.goalsTitle}</KineticText></h2>

              <div className="goals-list">
                {messages.about.goals.map((goal) => (
                  <div className="goal-item" key={goal.number}>
                    <span className="goal-number">{goal.number}</span>
                    <div>
                      <h3>{goal.title}</h3>
                      <p>{goal.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a href="#contact" className="card-link">
                {messages.about.growWithUs} <span>→</span>
              </a>
            </article>

          </div>
            </section>
      </section>

      {/* Services Section */}
      <section id="services" className="services-page">
        <section className="services-section">

          {/* Section Heading */}
          <div className="services-heading">
            <div className="services-heading-left">

              <div className="section-label">
                <span>{messages.services.sectionLabel}</span>
                <span className="label-line"></span>
              </div>

              <h1>
                <KineticText>{messages.services.headline}</KineticText>
                <br />
                <span><KineticText>{messages.services.headlineAccent}</KineticText></span>
              </h1>

            </div>

            <p className="services-intro">
              {messages.services.intro}
            </p>
          </div>

          {/* Services Cards */}
          <div className="services-grid">

            {messages.services.items.map((service, index) => {
              const ServiceIcon = serviceIcons[index];
              return (
                <article className="service-card" key={service.number}>

                <div className="card-top">
                  <div className="service-icon">
                    <ServiceIcon
                      size={25}
                      strokeWidth={1.7}
                      color="#C6A45C"
                      aria-hidden="true"
                    />
                  </div>

                  <span className="service-category">
                    {service.number}{" // "}{service.category}
                  </span>
                </div>

                <h2>{service.title}</h2>

                <p className="service-description">
                  {service.description}
                </p>

                <div className="service-tags">
                  {service.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <a href="#contact" className="service-link">
                  <span>{messages.services.explore}</span>
                  <span className="arrow">→</span>
                </a>

                </article>
              );
            })}

          </div>
        </section>
      </section>


{/* Portfolio Section */}
<section id="portfolio" className="portfolio-page">
  <section className="portfolio-section">

    <div className="portfolio-heading">
      <div className="portfolio-title">
        <div className="portfolio-label">
          <span>{messages.portfolio.sectionLabel}</span>
          <span className="portfolio-label-line"></span>
        </div>

        <h1><KineticText>{messages.portfolio.title}</KineticText></h1>
      </div>
    </div>

    {!activeCategory ? (
     
<div className="portfolio-categories">

  <button
    className="portfolio-category"
    onClick={() => setActiveCategory("food")}
  >
    <img src={`${process.env.NODE_ENV === "production" ? "/rivona-website" : ""}/images/food.jpg`} alt="Food" />
    <span>FOOD</span>
  </button>

  <button
    className="portfolio-category"
    onClick={() => setActiveCategory("hr")}
  >
    <img src={`${process.env.NODE_ENV === "production" ? "/rivona-website" : ""}/images/Hr.jpg`} alt="HR & Recruitment" />
    <span>HR & RECRUITMENT</span>
  </button>

  <button
    className="portfolio-category"
    onClick={() => setActiveCategory("perfumes")}
  >
    <img src={`${process.env.NODE_ENV === "production" ? "/rivona-website" : ""}/images/PERFUMES.jpg`} alt="Real Estate" />
    <span>PERFUMES</span>
  </button>

  
</div>

    ) : (
      <div
        className="portfolio-category-content"
        data-closing={isCategoryClosing ? "true" : undefined}
      >

        <button
          className="portfolio-back"
          onClick={closePortfolioCategory}
        >
          ← Back to Categories
        </button>

<div className="portfolio-video-grid">

  {(activeCategory === "food"
    ? ["video-2.mp4","video-6.mp4", "video-7.mp4", "video-8.mp4","video-9.mp4"]
    : activeCategory === "hr"
    ? [ "video-3.mp4", "video-5.mp4", "video-10.mp4"]
    : activeCategory === "perfumes"
    ? ["video-1.mp4", "video-4.mp4"]
    : []
  ).map((video) => (
    <div className="portfolio-video-item" key={video}>
      <video controls playsInline preload="metadata">
        <source
          src={`${
            process.env.NODE_ENV === "production"
              ? "/rivona-website"
              : ""
          }/videos/${video}`}
          type="video/mp4"
        />
      </video>
    </div>
  ))}

</div>

{!["food", "hr", "perfumes"].includes(activeCategory ?? "") && (
  <p className="portfolio-empty">
    Videos coming soon.
  </p>
)}
</div>

    )}

  </section>
</section>



{/* Our Team Section */}
<section id="team" className="team-section">

  <div className="team-heading">

    <div className="team-title">
      <div className="section-label">
        <span>{messages.team.sectionLabel}</span>
        <i></i>
      </div>

      <h1>
        <KineticText>{messages.team.headline}</KineticText>
        <br />
        <span><KineticText>{messages.team.headlineAccent}</KineticText></span>
      </h1>
    </div>

    <p>
      {messages.team.intro}
    </p>

  </div>

  {/* Team Cards */}
  <div className="team-grid">

    {messages.team.members.slice(0, -1).map((member, index) => (
      <article className="team-card" key={index}>

        <div className="team-image">
        <img
src={`${process.env.NODE_ENV === "production" ? "/rivona-website" : ""}/images/team/member-${index + 1}.jpg`}
  alt={member.name}
/>
        </div>

        <div className="team-info">
          <span>{member.role}</span>
          <h2>{member.name}</h2>
        </div>

      </article>
    ))}

  </div>

</section>

      <section id="contact" className="contact-section">
        <div className="contact-heading">
          <div className="section-label">
            <span>{messages.contact.sectionLabel}</span>
            <i></i>
          </div>
          <h1><KineticText>{messages.contact.title}</KineticText></h1>
          <p>{messages.contact.description}</p>
        </div>

        <div className="contact-content">
          <div className="contact-detail">
            <span>{messages.contact.emailLabel}</span>
            <a href="mailto:Rivonamedia@gmail.com">RIVONA4MEDIA@GMAIL.COM</a>
          </div>
          <div className="contact-detail">
            <span>{messages.contact.phoneLabel}</span>
            <a href="tel:+201028409979">+20 10 2840 9979</a>
          </div>
          <div className="contact-detail">
            <span>{messages.contact.locationLabel}</span>
            <p>{messages.contact.location}</p>
          </div>
          <a href="mailto:Rivonamedia@gmail.com" className="primary-button contact-button">
            {messages.contact.action} <span>↗</span>
          </a>
        </div>
      </section>

      <footer className="site-footer">
        <a href="#home" className="footer-brand">
          <span className="brand-name">RIVONA MEDIA</span>
          <span>{messages.footer.tagline}</span>
        </a>
        <nav className="footer-nav" aria-label={messages.nav.contactUs}>
          <a href="#about">{messages.nav.about}</a>
          <a href="#services">{messages.nav.services}</a>
          <a href="#portfolio">{messages.nav.portfolio}</a>
          <a href="#team">{messages.nav.team}</a>
          <a href="#contact">{messages.nav.contact}</a>
        </nav>
        <div className="footer-bottom">
          <span>{messages.footer.copyright}</span>
          <a href="#home">{messages.footer.backToTop} <span>↑</span></a>
        </div>
      </footer>

    </main>
  );
}

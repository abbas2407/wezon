import React, { useEffect } from 'react';

const projects = [
  {
    id: '01',
    category: 'MOBILE APP',
    subCategory: 'UI/UX',
    title: 'Flux, Smart Home App',
    description:
      'Sleek, minimal smart home control interface. Dark UI, intuitive controls, and a sophisticated design system optimized for daily interaction.',
    tags: ['Mobile UI', 'Design System', 'Figma'],
    image: '/projects/flux.jpeg',
    imageBg: '#f0f0f0',
    link: 'https://www.behance.net/gallery/232719717/Flux-Smart-Home-App',
  },
  {
    id: '02',
    category: 'UX CASE STUDY',
    subCategory: 'WEB',
    title: 'OK2GO — Website Redesign',
    description:
      'Complete UX overhaul of ok2go ride-booking platform. Research, wireframes, and high-fidelity prototypes focused on zero-friction booking.',
    tags: ['UX Research', 'User Testing', 'Prototyping'],
    image: '/projects/ok2go.jpeg',
    imageBg: '#000000',
    link: 'https://www.behance.net/gallery/241416141/OK2GO-Website-Redesign-UX-Case-Study',
  },
  {
    id: '03',
    category: 'WEB APP',
    subCategory: 'UI/UX',
    title: 'Search Interiors',
    description:
      'UX and full UI for a marketplace connecting users with interior designers. Full user flows, wireframes, and responsive high-fidelity interface.',
    tags: ['UX Research', 'Web Design', 'Responsive'],
    image: '/projects/search-interiors.jpeg',
    imageBg: '#111111',
    link: 'https://www.behance.net/gallery/234337325/Search-Interiors-Web-Application-Design',
  },
];


export function SelectedWork() {
  useEffect(() => {
    const revObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('visible'), i * 100);
            revObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    );
    document.querySelectorAll('#work .reveal').forEach((el) => revObs.observe(el));
    return () => revObs.disconnect();
  }, []);

  return (
    <section id="work">
      <div className="work-header">
        <div className="section-eyebrow reveal">— Selected work</div>
        <div className="section-title reveal">Selected Work.</div>
        <p className="section-sub reveal" style={{ marginBottom: 0 }}>
          A few things we've shipped.
        </p>
      </div>

      <div className="work-grid">
        {projects.map((p) => (
          <article key={p.id} className="work-card reveal">
            {/* Image */}
            <div
              className="work-card-img-wrap"
              style={{ background: p.imageBg }}
            >
              <img
                src={p.image}
                alt={p.title}
                className="work-card-img"
                loading="lazy"
              />
            </div>

            {/* Info below image */}
            <div className="work-card-info">
              <div className="work-card-cats">
                <span className="work-card-cat work-cat-primary">{p.category}</span>
                <span className="work-card-cat-dot">·</span>
                <span className="work-card-cat work-cat-secondary">{p.subCategory}</span>
              </div>

              <h3 className="work-card-title">{p.title}</h3>
              <p className="work-card-desc">{p.description}</p>

              <div className="work-card-tags">
                {p.tags.map((t) => (
                  <span key={t} className="work-card-tag">{t}</span>
                ))}
              </div>

              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="work-card-link"
              >
                VIEW ON BEHANCE
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1.5 6h9M6 1.5l4.5 4.5L6 10.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

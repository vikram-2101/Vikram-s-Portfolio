const values = [
  {
    title: "Clarity",
    description: "I favor simple architecture and clear interfaces over clever complexity.",
  },
  {
    title: "Velocity",
    description: "I ship quickly, iterate in public, and use feedback as a product tool.",
  },
  {
    title: "Craft",
    description: "I care deeply about spacing, typography, and the emotional tone of software.",
  },
];

const Experience = () => {
  return (
    <section className="section section-divider" id="about">
      <div className="content-wrap">
        <p className="section-number fade-in">02</p>
        <h2 className="section-title fade-in">About</h2>

        <div className="about-grid fade-in">
          <div className="about-copy">
            <p>
              I’m Vikram, a full-stack developer focused on building high-performance applications and scalable backends.
            </p>
            <p>
              My experience includes engineering data-heavy views with cursor-based pagination, optimizing frontend performance with TanStack Query, and designing secure, modular REST APIs with Node.js and Redis caching.
            </p>
            <p>
              I enjoy bridging technical depth with clean architecture so products are both fast, secure, and maintainable.
            </p>
          </div>

          <div className="about-values">
            {values.map((value) => (
              <div key={value.title} className="value-item">
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;

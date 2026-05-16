const Footer = () => {
  const currentYear = new Date().getFullYear();
  const firstName = "Vikram";
  const fullName = "Vikram Kumar";

  return (
    <>
      <section className="section section-divider" id="contact">
        <div className="content-wrap fade-in">
          <p className="section-number">03</p>
          <h2 className="contact-title">Let's build something, {firstName}.</h2>

          <div className="contact-actions">
            <a className="contact-btn primary" href="mailto:vikramk2101@gmail.com">
              Email
            </a>
            <a className="contact-btn" href="https://github.com/vikram-2101" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="contact-btn" href="https://linkedin.com/in/vikram-kumar2101" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a className="contact-btn" href="#">
              Resume
            </a>
          </div>
        </div>
      </section>

      <footer className="site-footer section-divider">
        <div className="content-wrap footer-inner">
          <p>© {currentYear} {fullName}</p>
          <p>
            Designed & built by vikram<span>.</span>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;

import dynamic from "next/dynamic";
import Link from "next/link";
import Float from "../components/Float";

const Counter = dynamic(() => import("../components/Counter"), {
  ssr: false,
});

const Footer = ({ footer, contactDetials }) => {
  // console.log(contactDetials)
  switch (footer) {
    case 1:
      return <DefaultFooter contactDetials={contactDetials} />;

    default:
      return <DefaultFooter contactDetials={contactDetials} />;
  }
};
export default Footer;

const ScrollTopBtn = () => {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <button
      style={{ display: "inline-block" }}
      className="scroll-top scroll-to-target"
      data-target="html"
      onClick={() => scrollTop()}
    >
      <span className="fas fa-angle-double-up" />
    </button>
  );
};

const DefaultFooter = ({ contactDetials }) => (
  <footer className="main-footer bg-green pt-4 text-white">
    <Float />
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6 order-md-2">
          <div className="footer-widget about-widget text-center">
            <div className="footer-logo mb-30">
              <Link href="/">
                <a>
                  <img
                    style={{ maxWidth: "100px" }}
                    src={`http://localhost:8000/storage/images/gallery/${contactDetials.footer_image}`}
                    alt="Logo"
                  />
                </a>
              </Link>
            </div>
            <p>
              Sidham Pharmacy, established in 2019, has aimed to provide
              exceptional services for mind, body and soul.
            </p>
            <div className="social-style-two pt-10">
              {contactDetials.facebook_link && (
                <Link href={`${contactDetials.facebook_link}`}>
                  <a>
                    <i className="fab fa-facebook-f" />
                  </a>
                </Link>
              )}
              {contactDetials.x_link && (
                <Link href={`${contactDetials.x_link}`}>
                  <a>
                    <i className="fab fa-twitter" />
                  </a>
                </Link>
              )}
              {contactDetials.instagram_link && (
                <Link href={`${contactDetials.instagram_link}`}>
                  <a>
                    <i className="fab fa-instagram" />
                  </a>
                </Link>
              )}
              {contactDetials.youtube_link && (
                <Link href={`${contactDetials.youtube_link}`}>
                  <a>
                    <i className="fab fa-youtube" />
                  </a>
                </Link>
              )}
              {contactDetials.pinterest_Link && (
                <Link href={`${contactDetials.pinterest_Link}`}>
                  <a>
                    <i className="fab fa-pinterest" />
                  </a>
                </Link>
              )}
              {contactDetials.linkedIn_link && (
                <Link href={`${contactDetials.linkedIn_link}`}>
                  <a>
                    <i className="fab fa-linkedin" />
                  </a>
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 order-md-1">
          <div className="footer-widget menu-widget two-column">
            <h4 className="footer-title">Quick Links</h4>
            <ul>
              <li>
                <Link href="/about">
                  <a>About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/shop-grid">
                  <a>Best Products</a>
                </Link>
              </li>

              <li>
                <Link href="/blog-grid">
                  <a>Latest News</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
              <li>
                <Link href="/return_refund_policy">
                  Retrun &amp; Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/shipping_policy">Shipping Policy</Link>
              </li>
              <li>
                <Link href="/terms_conditions">Terms &amp; Conditions</Link>
              </li>
              <li>
                <Link href="/privacy_policy">Privacy Policy</Link>
              </li>
            </ul>
          </div>
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13826.980458558077!2d76.88488740780564!3d29.95800930542613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390e414c36405d99%3A0xee1e94f6f85e3aae!2sSushant%20City%2C%20Kurukshetra%2C%20Haryana!5e0!3m2!1sen!2sin!4v1715330930401!5m2!1sen!2sin"
              width="350"
              height="250"
              style={{ border: "0" }}
              allowfullscreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 order-md-3">
          <div className="footer-widget contact-widget">
            <h4 className="footer-title">Contact Us</h4>

            <ul>
              <li>
                <i className="fal fa-map-marker-alt" />
                {contactDetials.address}
              </li>
              {contactDetials.alt_address && (
                <li>
                  <i className="fal fa-map-marker-alt" />
                  {contactDetials.alt_address}
                </li>
              )}
              <li>
                <i className="far fa-phone" />
                <a href={`tel:${contactDetials.Phone}`}>
                  {contactDetials.Phone}
                </a>
              </li>
              {contactDetials.alt_phone && (
                <li>
                  <i className="far fa-phone" />
                  <a href={`tel:${contactDetials.alt_phone}`}>
                    {contactDetials.alt_phone}
                  </a>
                </li>
              )}

              <li>
                <i className="far fa-envelope" />
                <a href={`mailto:${contactDetials.email}`}>
                  {contactDetials.email}
                </a>
              </li>
              {contactDetials.alt_email && (
                <li>
                  <i className="far fa-envelope" />
                  <a href={`mailto:${contactDetials.alt_email}`}>
                    {contactDetials.alt_email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="copyright-area pt-25 pb-10">
        <p>
          © 2024 Sidham Pharmacy. Developed by{" "}
          <span style={{ color: "#ff7800", fontWeight: "800" }}>
            Barcadly Software
          </span>
          . All Rights Reserved.
        </p>
        <ul className="footer-menu">
          <li>
            <Link href="/contact">Setting &amp; Privacy</Link>
          </li>
          <li>
            <Link href="/faqs">
              <a>Faqs</a>
            </Link>
          </li>
          <li>
            <Link href="/contact">Payments</Link>
          </li>
        </ul>
        {/* Scroll Top Button */}
        <ScrollTopBtn />
      </div>
    </div>
    <div className="footer-shapes">
      <img
        className="footer-bg"
        src="/assets/images/background/footer-bg-shape.png"
        alt="Shape"
      />
      <img
        className="shape-one"
        src="/assets/images/shapes/footer1.png"
        alt="Shape"
      />
      <img
        className="shape-two"
        src="/assets/images/shapes/footer2.png"
        alt="Shape"
      />
      <img
        className="shape-three"
        src="/assets/images/shapes/footer3.png"
        alt="Shape"
      />
      <img
        className="shape-four"
        src="/assets/images/shapes/footer4.png"
        alt="Shape"
      />
    </div>
  </footer>
);

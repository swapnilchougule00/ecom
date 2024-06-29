import Link from "next/link";
import ClientLogoSlider from "../src/components/ClientLogoSlider";
import FeedbackTwoSlider from "../src/components/FeedbackTwoSlider";
import PageBanner from "../src/components/PageBanner";
import ExperienceTeam from "../src/components/slider/ExperienceTeam";
import PhotoGallery from "../src/components/slider/PhotoGallery";
import Layout from "../src/layout/Layout";
import { useCartStore } from "../src/useCartStore";
const About = () => {
  const about = useCartStore((state) => state.aboutDetials);

  return (
    <Layout>
      <PageBanner pageName={"about us"} />
      {/* Page Banner End */}
      {/* About Section Start */}
      <section className="about-page-section rel z-1 py-10 rpy-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="about-three-content rmb-35 wow fadeInLeft delay-0-2s">
                <div className="section-title mb-20">
                  <span className="sub-title mb-20">About Company</span>
                  <h2>{about.title}</h2>
                </div>
                <p>{about.desc}</p>
              </div>
            </div>
            <div className="col-lg-6 text-lg-right">
              <div className="">
                <img
                  className="image"
                  src={`http://localhost:8000/storage/images/gallery/${about.image}`}
                  alt="About"
                />

              </div>
            </div>
          </div>
        </div>
        <img
          src="assets/images/shapes/about-page.png"
          alt="Shape"
          className="shape"
        />
      </section>

      <section className="about-section-two rel z-1">
        <div className="container">
          
          <div className="col-lg-8 justify-center m-auto">
            <div className="about-two-content pt-60 wow fadeInUp delay-0-4s">
              <div className="section-title mb-35">
                <span className="sub-title mb-20">Why Choose Us</span>
                <h3>
                  At Sidham Pharmacy, we stand out in the realm of holistic
                  healthcare.
                </h3>
                <p>
                  Since our establishment in 2019, we have dedicated ourselves
                  to offering exceptional services that cater to the mind, body,
                  and soul. With a wealth of experience in the field, we
                  understand the diverse needs of our patients, allowing us to
                  provide tailored solutions that prioritize individual
                  well-being. From specialized therapy sessions addressing
                  concerns such as sciatica and cervical pain to our commitment
                  to utilizing Ayurvedic principles and cruelty-free practices,
                  we ensure a holistic approach to wellness. Choose Sidham
                  Pharmacy for personalized care and embark on a journey towards
                  optimal health and happiness.
                </p>
              </div>
              
            </div>
          </div>
          {/* </div> */}
        </div>
        <div className="about-shapes">
          <img src="assets/images/shapes/about-shape1.png" alt="Shape" />
          <img src="assets/images/shapes/about-shape2.png" alt="Shape" />
        </div>
      </section>
      {/* About Section End */}
      {/* Team Area Start */}
      <section className="team-area pt-50 rpt-20 pb-95 rpb-65">
        <div className="container">
          <ExperienceTeam />
        </div>
      </section>
      {/* Team Area End */}

      {/* Feedback Section Start */}
      <section className="feedback-section pt-100 rpt-70 pb-130 rpb-100">
        <div className="container">
          <div className="section-title text-center mb-60">
            <span className="sub-title mb-20">Customer Reviews</span>
            <h2>Valuable Customer’s Feedback</h2>
          </div>
        </div>
        <FeedbackTwoSlider />
      </section>
      {/* Feedback Section End */}
      {/* Client Logo Section Start */}
      <div className="client-logo-section text-center bg-light-green py-60">
        {/* <div className="container">
          <ClientLogoSlider />
        </div> */}
        <div className="client-logo-shapes">
          <img
            className="shape-one"
            src="assets/images/shapes/cl-shape1.png"
            alt="Shape"
          />
          <img
            className="shape-two"
            src="assets/images/shapes/cl-shape2.png"
            alt="Shape"
          />
          <img
            className="shape-three"
            src="assets/images/shapes/cl-shape3.png"
            alt="Shape"
          />
          <img
            className="shape-four"
            src="assets/images/shapes/cl-shape4.png"
            alt="Shape"
          />
          <img
            className="shape-five"
            src="assets/images/shapes/cl-shape5.png"
            alt="Shape"
          />
          <img
            className="shape-six"
            src="assets/images/shapes/cl-shape6.png"
            alt="Shape"
          />
        </div>
      </div>
    </Layout>
  );
};
export default About;

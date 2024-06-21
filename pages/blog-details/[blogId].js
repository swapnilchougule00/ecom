import Link from "next/link";
import Slider from "react-slick";
import PageBanner from "../../src/components/PageBanner";
import Layout from "../../src/layout/Layout";
import { newsSlider } from "../../src/sliderProps";
import { useEffect, useState } from "react";
import { useCartStore } from "../../src/useCartStore";
import { useRouter } from "next/router";
const BlogDetails = () => {
  const [blog, setBlog] = useState([]);
  const router = useRouter();
  const { blogId } = router.query;
  const blogs = useCartStore((state) => state.blogs);
  const category = useCartStore((state) => state.categorys);

  useEffect(() => {
    if (blogId) {
      console.log(blogs);
      const filteredProduct = blogs.find((blog) => blog.id === Number(blogId));
      console.log(filteredProduct);

      setBlog(filteredProduct || {});
    }
  }, [blogId, blogs]);

  return (
    <Layout>
      <PageBanner pageName={"Blog Details"} />
      <section className="news-details-page rel z-1 pt-65 rpt-35 pb-130 rpb-100">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 mt-65">
              <div className="blog-details-content">
                <ul className="blog-meta">
                  <li>
                    <i className="far fa-calendar-alt" />
                    <a href="#">Mar 25, 2022</a>
                  </li>
                </ul>
                <h3 className="title">{blog.title}</h3>
                <div className="image my-35">
                  <img
                    src={`http://localhost:8000/storage/images/gallery/${blog.image}`}
                    alt="Blog"
                  />
                </div>
                <p>{blog.description}</p>
                <br />

                <form
                  onSubmit={(e) => e.preventDefault()}
                  id="comment-form"
                  className="comment-form pt-45 wow fadeInUp delay-0-2s"
                  name="comment-form"
                  action="#"
                  method="post"
                >
                  <div className="section-title mb-35">
                    <span className="sub-title mb-15">Send Message</span>
                    <h3>Leave a Comments</h3>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          id="full-name"
                          name="full-name"
                          className="form-control"
                          defaultValue=""
                          placeholder="Full Name"
                          required=""
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="email"
                          id="blog-email"
                          name="blog-email"
                          className="form-control"
                          defaultValue=""
                          placeholder="Email Address"
                          required=""
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          type="text"
                          id="website"
                          name="website"
                          className="form-control"
                          defaultValue=""
                          placeholder="Website"
                          required=""
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <textarea
                          name="message"
                          id="message"
                          className="form-control"
                          rows={4}
                          placeholder="Comments"
                          required=""
                          defaultValue={""}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group mb-0">
                        <button type="submit" className="theme-btn style-two">
                          Send Comments
                          <i className="fas fa-angle-double-right" />
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-xl-4 col-lg-6 col-md-8">
              <div className="blog-sidebar mt-65">
                <div className="widget widget-about wow fadeInUp delay-0-2s">
                  <div className="image">
                    <img src="assets/images/widgets/about.jpg" alt="Author" />
                  </div>
                  <h4>Somalia D. Silva</h4>
                  <span className="sub-title">CO-Founder</span>
                  <p>
                    Amet consecte adipiscing elitse doeiusmod tempor incididunt
                    labre et dolore magna aliqua lacus{" "}
                  </p>
                  <div className="social-style-one">
                    <Link href="/contact">
                      <a>
                        {" "}
                        <i className="fab fa-facebook-f" />
                      </a>
                    </Link>
                    <Link href="/contact">
                      <a>
                        {" "}
                        <i className="fab fa-twitter" />
                      </a>
                    </Link>
                    <Link href="/contact">
                      <a>
                        {" "}
                        <i className="fab fa-youtube" />
                      </a>
                    </Link>
                    <Link href="/contact">
                      <a>
                        {" "}
                        <i className="fab fa-instagram" />
                      </a>
                    </Link>
                  </div>
                  <img
                    src="assets/images/widgets/about-bg.png"
                    alt="BG"
                    className="bg"
                  />
                </div>

                <div className="widget widget-menu wow fadeInUp delay-0-4s">
                  <h4 className="widget-title">
                    <i className="flaticon-leaf-1" />
                    Category
                  </h4>
                  <ul>
                    {category.length > 0 &&
                      category.map((cat) => (
                        <li key={cat.id}>
                          <Link href={`/shop`}>
                            <span
                              onClick={() => {
                                useCartStore.getState().categorySearch(cat);
                              }}
                            >
                              {cat.category_name}
                            </span>
                          </Link>{" "}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default BlogDetails;

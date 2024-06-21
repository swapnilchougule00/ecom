import Link from "next/link";
import PageBanner from "../src/components/PageBanner";
import Pagination from "../src/components/Pagination";
import Layout from "../src/layout/Layout";
import { useCartStore } from "../src/useCartStore";
const BlogGrid = () => {
  const blogs = useCartStore((state) => state.blogs);

  console.log(blogs);

  const getDate = (createdDate) => {
    const dateObj = new Date(createdDate);

    // Extracting date and month
    const date = dateObj.getDate();
    const month = dateObj.toLocaleString("default", { month: "long" });

    return [date, month];
  };
  return (
    <Layout>
      <PageBanner pageName={"Blogs"} />
      <section className="news-page-section rel z-1 py-130 rpy-100">
        <div className="container">
          <div className="row justify-content-center blog-grid">
            {blogs.length > 0 &&
              blogs.map((item) => {
                const [day, month] = getDate(item.created_at);
                return (
                  <div key={item.id} className="col-xl-4 col-md-6">
                    <div className="news-item wow fadeInUp delay-0-2s">
                      <div className="image">
                        <img
                          src={`http://localhost:8000/storage/images/gallery/${item.image}`}
                          alt="blog"
                        />
                        <span className="date">
                          {}
                          <b>{day}</b> {month}
                        </span>
                      </div>
                      <div className="content">
                        {/* <span className="sub-title">Vegetable</span> */}
                        <h4>
                          <Link
                            href="/blog-details/[blogId]"
                            as={`/blog-details/${item.id}`}
                          >
                            {item.title}
                          </Link>
                        </h4>
                        <Link
                          href="/blog-details/[blogId]"
                          as={`/blog-details/${item.id}`}
                        >
                          <a className="read-more">
                            Read More{" "}
                            <i className="fas fa-angle-double-right" />
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <ul className="pagination justify-content-center flex-wrap">
            <Pagination
              paginationCls={".blog-grid .col-xl-4"}
              defaultSort={6}
            />
          </ul>
        </div>
        <div className="news-shapes">
          <img
            className="onion"
            src="assets/images/shapes/onion.png"
            alt="Onion"
          />
          <img
            className="two-leaf"
            src="assets/images/slider/two-lear.png"
            alt="Leaf"
          />
          <img
            className="leaf-left"
            src="assets/images/shapes/leaf-three.png"
            alt="Leaf"
          />
          <img
            className="leaf-two"
            src="assets/images/shapes/leaf-three.png"
            alt="Leaf"
          />
          <img
            className="leaf-three"
            src="assets/images/shapes/leaf-1.png"
            alt="Leaf"
          />
          <img
            className="litchi"
            src="assets/images/shapes/litchi.png"
            alt="Litchi"
          />
        </div>
      </section>
    </Layout>
  );
};
export default BlogGrid;

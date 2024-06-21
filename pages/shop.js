import Link from "next/link";
import PageBanner from "../src/components/PageBanner";
import Pagination from "../src/components/Pagination";
import Layout from "../src/layout/Layout";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Transition } from "react-transition-group";
import { useRouter } from "next/router";
import { useCartStore } from "../src/useCartStore";

const ShopLeftSidebar = () => {
  const [productList, setProductList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const category = useCartStore((state) => state.categorys);
  const shopSearch = useCartStore((state) => state.shopSearch);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const products = localStorage.getItem("productList");
    setProductList(JSON.parse(products) || []);

    const fetchData = async () => {
      // if(productList.length < 1){

      try {
        const response = await axios.get(
          "http://localhost:8000/api/getProducts"
        );

        if (response.data.status === 200) {
          if (shopSearch) {
            const fData = response.data.data.filter(
              (item) => item.category_id == shopSearch.id
            );

            setProductList(response.data.data);
            setFilteredList(fData);
          } else {
            setProductList(response.data.data);
          }
          localStorage.setItem(
            "productList",
            JSON.stringify(response.data.data)
          );
        } else if (response.data.status === 401) {
          console.log(response.data.msg);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      // }
    };

    fetchData();
  }, [shopSearch]);

  const productToShow = shopSearch.id ? filteredList : productList;

  //fitter by category
  const filterByCategory = useCallback(
    (cat) => {
      useCartStore.getState().categorySearch(cat);
      const fData = productList.filter((item) => item.category_id == cat.id);
      setFilteredList(fData);
    },
    [shopSearch]
  );

  return (
    <Layout>
      <PageBanner pageName={"Shop"} />
      <section className="shop-page rel z-1 pt-65 rpt-35 pb-130 rpb-100">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-4 col-md-8">
              <div className="shop-sidebar mt-65">
                <div className="widget widget-search wow fadeInUp delay-0-2s">
                  <form onSubmit={(e) => e.preventDefault()} action="#">
                    <input
                      type="text"
                      placeholder="Search keywords"
                      required=""
                    />
                    <button
                      type="submit"
                      className="searchbutton fa fa-search"
                    />
                  </form>
                </div>

                <div className="widget widget-menu wow fadeInUp delay-0-4s">
                  <h4
                    className="widget-title"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <i className="flaticon-leaf-1" />
                      <h4>Category</h4>
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      width={20}
                      onClick={toggleDropdown}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                      />
                    </svg>
                  </h4>
                  <Transition in={isOpen} timeout={300} unmountOnExit>
                    {(state) => (
                      <div
                        style={{
                          transition: "opacity 0.3s ease-in-out",
                          opacity: state === "entered" ? 1 : 0,
                          display: state === "exited" ? "none" : "block",
                          textAlign: "center",
                        }}
                      >
                        <ul className="category-link">
                          {category &&
                            category.map((cat, index) => (
                              <li key={index}>
                                <span
                                  className={
                                    shopSearch.category_name ==
                                    cat.category_name
                                      ? "active"
                                      : ""
                                  }
                                  onClick={() => {
                                    filterByCategory(cat);
                                  }}
                                >
                                  {cat.category_name}
                                </span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}
                  </Transition>
                </div>

                <div className="widget widget-tag-cloud wow fadeInUp delay-0-2s">
                  <h4 className="widget-title">
                    <i className="flaticon-leaf-1" />
                    Popular Tags
                  </h4>
                  <div className="tag-coulds">
                    <Link href="#">Ayurveda</Link>
                    <Link href="#">Organic</Link>
                    <Link href="#">HEP Liver</Link>
                    <Link href="#">Vedic</Link>
                    <Link href="#">Herbal</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-lg-8 mt-55">
              <div className="row shop-left-sidebar-row">
                {productList &&
                  productToShow.map((item, index) => (
                    <div
                      className="col-xl-4 col-lg-6 col-md-4 col-sm-6"
                      key={index}
                    >
                      <div className="product-item wow fadeInUp delay-0-6s">
                        <span className="offer bg-red">sale</span>
                        <div className="image">
                          <img
                            src={`http://localhost:8000/storage/images/gallery/${item.image}`}
                            alt="Product"
                          />
                        </div>
                        <div className="content">
                          <div className="ratting">
                            {item.rating &&
                              Array(+item.rating)
                                .fill(null)
                                .map((_, index) => (
                                  <i className="fas fa-star" key={index} />
                                ))}
                            {/* <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" /> */}
                          </div>
                          <h5>
                            <Link
                              href="/product-details/[productId]"
                              as={`/product-details/${item.id}`}
                            >
                              <a>
                                {item.product_name
                                  ? item.product_name
                                  : "Product Name"}
                              </a>
                            </Link>
                            {/* <Link href={`/product-details/${item.id}`}>{item.name ? item.name : 'HEP Liver Pro'}</Link> */}
                          </h5>
                          <span className="price">
                            {item.sale && <del>{item.sale}</del>}
                            {item.Price && <span>{item.Price}</span>}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                {/* <div className="col-xl-4 col-lg-6 col-md-4 col-sm-6">
                  <div className="product-item wow fadeInUp delay-0-2s">
                    <div className="image">
                      <img src="assets/images/slider/B.png" alt="Product" />
                    </div>
                    <div className="content">
                      <div className="ratting">
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                      </div>
                      <h5>
                        <Link href="/product-details">Ayurvcare</Link>
                      </h5>
                      <span className="price">
                        <span>205</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-6 col-md-4 col-sm-6">
                  <div className="product-item wow fadeInUp delay-0-4s">
                    <span className="offer">20 Off</span>
                    <div className="image">
                      <img src="assets/images/slider/C.png" alt="Product" />
                    </div>
                    <div className="content">
                      <div className="ratting">
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                      </div>
                      <h5>
                        <Link href="/product-details">Vedic Cervical Care</Link>
                      </h5>
                      <span className="price">
                        <del>55</del>
                        <span>36</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-6 col-md-4 col-sm-6">
                  <div className="product-item wow fadeInUp delay-0-6s">
                    <span className="offer bg-red">sale</span>
                    <div className="image">
                      <img src="assets/images/slider/A.png" alt="Product" />
                    </div>
                    <div className="content">
                      <div className="ratting">
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                      </div>
                      <h5>
                        <Link href="/product-details">HEP Liver Pro</Link>
                      </h5>
                      <span className="price">
                        <del>25</del>
                        <span>18</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-6 col-md-4 col-sm-6">
                  <div className="product-item wow fadeInUp delay-0-2s">
                    <div className="image">
                      <img src="assets/images/slider/B.png" alt="Product" />
                    </div>
                    <div className="content">
                      <div className="ratting">
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                      </div>
                      <h5>
                        <Link href="/product-details">Ayurvcare</Link>
                      </h5>
                      <span className="price">
                        <span>205</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-6 col-md-4 col-sm-6">
                  <div className="product-item wow fadeInUp delay-0-4s">
                    <span className="offer">20 Off</span>
                    <div className="image">
                      <img src="assets/images/slider/C.png" alt="Product" />
                    </div>
                    <div className="content">
                      <div className="ratting">
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                      </div>
                      <h5>
                        <Link href="/product-details">Vedic Cervical Care</Link>
                      </h5>
                      <span className="price">
                        <del>55</del>
                        <span>36</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-6 col-md-4 col-sm-6">
                  <div className="product-item wow fadeInUp delay-0-6s">
                    <span className="offer bg-red">sale</span>
                    <div className="image">
                      <img src="assets/images/slider/A.png" alt="Product" />
                    </div>
                    <div className="content">
                      <div className="ratting">
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                      </div>
                      <h5>
                        <Link href="/product-details">HEP Liver Pro</Link>
                      </h5>
                      <span className="price">
                        <del>25</del>
                        <span>18</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-6 col-md-4 col-sm-6">
                  <div className="product-item wow fadeInUp delay-0-2s">
                    <div className="image">
                      <img src="assets/images/slider/B.png" alt="Product" />
                    </div>
                    <div className="content">
                      <div className="ratting">
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                      </div>
                      <h5>
                        <Link href="/product-details">Ayurvcare</Link>
                      </h5>
                      <span className="price">
                        <span>205</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-6 col-md-4 col-sm-6">
                  <div className="product-item wow fadeInUp delay-0-4s">
                    <span className="offer">20 Off</span>
                    <div className="image">
                      <img src="assets/images/slider/C.png" alt="Product" />
                    </div>
                    <div className="content">
                      <div className="ratting">
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                      </div>
                      <h5>
                        <Link href="/product-details">Vedic Cervical Care</Link>
                      </h5>
                      <span className="price">
                        <del>55</del>
                        <span>36</span>
                      </span>
                    </div>
                  </div>
                </div> */}
              </div>
              <ul className="pagination flex-wrap justify-content-center pt-10">
                <Pagination
                  paginationCls={".shop-left-sidebar-row .col-xl-4"}
                  defaultSort={6}
                />
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default ShopLeftSidebar;

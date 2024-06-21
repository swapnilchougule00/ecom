"use client";
import Link from "next/link";
import { Fragment, useCallback, useState } from "react";
import { Blog, Contact, Home, PagesDasktop, Portfolio, Shop } from "./Menus";
import MobileMenu from "./MobileMenu";
import { useEffect } from "react";
import { useCartStore } from "../useCartStore";
import axios from "axios";
import config from "../../config/default.json";

const Header = ({ header, contactDetials }) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const value = localStorage.getItem("token");
      setToken(value);
    }
  }, []);
  const [token, setToken] = useState("");

  const fetch = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/index`);

      if (response.data.status === 200) {
        useCartStore.getState().updateCategorys(response.data.catagorys);
        useCartStore.getState().updateContactDetaills(response.data.contact);
        useCartStore.getState().updateSlider(response.data.slider);
        useCartStore.getState().updateOffers(response.data.offer);
        useCartStore.getState().updateAboutDetaills(response.data.about);
        useCartStore.getState().updateBlogsDetaills(response.data.blogs);
      } else {
        console.log("error from back end");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  // const [isOpen, setIsOpen] = useState(false);
  const isOpen = useCartStore((state) => state.isOpen);
  const category = useCartStore((state) => state.categorys);
  // const contsct = useCartStore((state) => state.categorys);
  // console.log(category)
  const openModal = () => {
    console.log("modal true");
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const cartCount = useCartStore((state) => state.cartCount);
  useEffect(() => {
    useCartStore.getState().updateCartCount();
  }, []);

  // console.log(category.length)

  switch (header) {
    case 1:
      return (
        <Header1
          token={token}
          category={category}
          contactDetials={contactDetials}
          cartCount={cartCount}
          isOpen={isOpen}
        />
      );
    case 2:
      return (
        <Header2
          token={token}
          category={category}
          contactDetials={contactDetials}
          cartCount={cartCount}
        />
      );
    case 3:
      return (
        <Header3
          token={token}
          category={category}
          contactDetials={contactDetials}
          cartCount={cartCount}
        />
      );

    default:
      return (
        <DefaultHeader
          token={token}
          category={category}
          contactDetials={contactDetials}
          cartCount={cartCount}
          isOpen={isOpen}
        />
      );
  }
};
export default Header;

const SearchBtn = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <Fragment>
      {/* <button className="far fa-search" onClick={() => setToggle(!toggle)} /> */}
      {/* <form
        onSubmit={(e) => e.preventDefault()}
        action="#"
        className=''
      >
        <input
          type="text"
          placeholder="Search"
          className="searchbox"
          required=""
        />
        <button type="submit" className="searchbutton far fa-search" />
      </form> */}
      <div className="search-box1">
        <input
          type="text"
          placeholder="Search"
          className="searchbox"
          required=""
        />
        <button type="submit" className="searchbutton far fa-search" />
      </div>
    </Fragment>
  );
};
const DaskTopMenu = ({ category }) => (
  <ul className="navigation clearfix d-none d-lg-flex">
    <li className="dropdown">
      <Link href="/">Home</Link>
      <div className="dropdown-btn"></div>
    </li>
    <li>
      <Link href="about">About</Link>

      <div className="dropdown-btn"></div>
    </li>

    {/* <li className="dropdown">
      <Link href="/shop-left-sidebar">shop </Link>
    </li> */}

    <li className="dropdown">
      <a href="#">Category </a>
      <ul>
        {category.length > 0 &&
          category.map((cat, index) => (
            <li key={index}>
              <Link href={`/shop`}>
                <span
                  onClick={() => {
                    useCartStore.getState().categorySearch(cat);
                  }}
                >
                  {cat.category_name}
                </span>
              </Link>
            </li>
          ))}
      </ul>
      <div className="dropdown-btn">
        <span className="fas fa-chevron-down" />
      </div>
    </li>
    <li className="dropdown">
      <Link href="/blog-grid">Blog</Link>
    </li>
    <Contact />
  </ul>
);

const Nav = ({ category, contactDetials }) => {
  const [nav, setNav] = useState(false);
  return (
    <nav className="main-menu navbar-expand-lg mobile-nav">
      <div className="navbar-header">
        <div className="mobile-logo my-15">
          <Link href="/">
            <a>
              <img
                src={`/assets/images/logos/${
                  contactDetials?.logo ? contactDetials.logo : "logo.png"
                }`}
                alt="Logo"
                title="Logo"
                style={{ width: "125px" }}
              />
              <img
                src={`/assets/images/logos/${
                  contactDetials?.logo ? contactDetials.logo : "logo.png"
                }`}
                alt="Logo"
                title="Logo"
                style={{ width: "125px" }}
              />
            </a>
          </Link>
        </div>
        {/* Toggle Button */}
        <button
          type="button"
          className="navbar-toggle"
          data-toggle="collapse"
          data-target=".navbar-collapse"
          onClick={() => setNav(!nav)}
        >
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
      </div>
      <div className={`navbar-collapse collapse clearfix ${nav ? "show" : ""}`}>
        <DaskTopMenu category={category} />
        <MobileMenu />
      </div>
    </nav>
  );
};

const DefaultHeader = ({
  category,
  contactDetials,
  cartCount,
  openModal,
  token,
  closeModal,
  isOpen,
}) => (
  <header className="main-header">
    <marquee
      className=""
      width="100%"
      direction="left"
      height="30px"
      style={{ background: "#227200" }}
    >
      <span className="blink">{contactDetials.offer_bar}</span>
    </marquee>
    {/*Header-Upper*/}
    <div className="header-upper">
      <div className="container-fluid clearfix">
        <div className="header-inner d-flex align-items-center">
          <div className="logo-outer">
            <div className="logo">
              <Link href="/">
                <a>
                  <img
                    src="/assets/images/logos/logo.png"
                    alt="Logo"
                    title="Logo"
                    style={{ width: "125px" }}
                  />
                </a>
              </Link>
            </div>
          </div>
          <div className="nav-outer clearfix">
            {/* Main Menu */}
            <Nav category={category} />
            {/* Main Menu End*/}
          </div>
          {/* Menu Button */}
          <div className="menu-icons">
            {/* Nav Search */}
            <div className="nav-search py-15">
              <SearchBtn />
            </div>
            <Link href="/cart">
              <a className="cart">
                <i className="far fa-shopping-cart"></i>
                <span>{cartCount}</span>
              </a>
            </Link>
            {/* <Link onClick={openModal}>
              <a className="user">
                <i className="far fa-user-circle"></i>
              </a>
            </Link> */}
            <button
              className="user"
              onClick={() => {
                useCartStore.getState().openUserModal();
              }}
            >
              <i className="far fa-user-circle"></i>
            </button>

            {!token ? (
              <Link href="/login">
                <a className="theme-btn">
                  Login <i className="fas fa-angle-double-right" />
                </a>
              </Link>
            ) : (
              <Link href="/">
                <a
                  className="theme-btn"
                  href="#"
                  onClick={() => {
                    useCartStore.getState().handleLogout();
                  }}
                >
                  Logout <i className="fas fa-angle-double-right" />
                </a>
              </Link>
            )}
            {/* menu sidbar */}
            {/* <div className="menu-sidebar" onClick={() => sidebarToggle()}>
              <button>
                <i className="far fa-ellipsis-h" />
                <i className="far fa-ellipsis-h" />
                <i className="far fa-ellipsis-h" />
              </button>
            </div> */}
            {isOpen && (
              <div className="modal">
                <div className="modal-content">
                  <span className="close" onClick={closeModal}>
                    &times;
                  </span>
                  <p>This is a modal window!</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    {/*End Header Upper*/}
  </header>
);
const Header1 = ({
  token,
  category,
  contactDetials,
  cartCount,
  closeModal,
  isOpen,
}) => (
  <header className="main-header menu-absolute">
    <marquee
      className=""
      width="100%"
      direction="left"
      height="30px"
      style={{ background: "#227200" }}
    >
      <span className="blink">{contactDetials.offer_bar}</span>
    </marquee>

    {/*Header-Upper*/}
    <div className="header-upper">
      <div className="container-fluid clearfix">
        <div className="header-inner d-flex align-items-center">
          <div className="logo-outer">
            <div className="logo">
              <Link href="/">
                <a>
                  <img
                    src="/assets/images/logos/logo.png"
                    alt="Logo"
                    title="Logo"
                    style={{ width: "125px" }}
                  />
                </a>
              </Link>
            </div>
          </div>
          <div className="nav-outer clearfix">
            {/* Main Menu */}
            <Nav category={category} />
            {/* Main Menu End*/}
          </div>
          {/* Menu Button */}
          <div className="menu-icons">
            {/* Nav Search */}
            <div className="nav-search py-15">
              <SearchBtn />
            </div>
            <Link href="/cart">
              <a className="cart">
                <i className="far fa-shopping-cart"></i>
                <span>{cartCount}</span>
              </a>
            </Link>
            {/* <Link href="/user">
              <a className="user">
                <i className="far fa-user-circle"></i>
              </a>
            </Link> */}
            <button
              className="user"
              onClick={() => {
                useCartStore.getState().openUserModal();
              }}
            >
              <i className="far fa-user-circle"></i>
            </button>
            {!token ? (
              <Link href="/login">
                <a className="theme-btn">
                  Login <i className="fas fa-angle-double-right" />
                </a>
              </Link>
            ) : (
              <Link href="/">
                <a
                  href="#"
                  className="theme-btn"
                  onClick={() => {
                    useCartStore.getState().handleLogout();
                  }}
                >
                  Logout <i className="fas fa-angle-double-right" />
                </a>
              </Link>
            )}

            {isOpen && (
              <div className="modal" style={{ display: "block" }}>
                <div className="modal-content">
                  <span className="close" onClick={closeModal}>
                    &times;
                  </span>
                  <p>This is a modal window!</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    {/*End Header Upper*/}
  </header>
);
const Header2 = ({
  category,
  contactDetials,
  token,
  cartCount,
  openModal,
  closeModal,
  isOpen,
}) => (
  <header className="main-header header-two">
    <marquee
      className=""
      width="100%"
      direction="left"
      height="30px"
      style={{ background: "#227200" }}
    >
      <span className="blink">{contactDetials.offer_bar}</span>
    </marquee>
    {/* <div className="header-top-wrap">
      <div className="container">
        <div className="header-top bg-light-green text-white py-10">
          <div className="row">
            <div className="col-xl-7 col-lg-6">
              <div className="top-left">
                <ul>
                  <li>
                    <i className="far fa-envelope" /> <b>Email Us :</b>{" "}
                    <a href="mailto:support@gmail.com">support@gmail.com</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-5 col-lg-6">
              <div className="top-right text-lg-right">
                <ul>
                  <li>
                    <i className="far fa-phone" /> <b>Call :</b>{" "}
                    <a href="callto:+012(345)67899">+012 (345) 678 99</a>
                  </li>
                  <li>
                    <div className="social-style-one">
                      <a href="#">
                        <i className="fab fa-facebook-f" />
                      </a>
                      <a href="#">
                        <i className="fab fa-twitter" />
                      </a>
                      <a href="#">
                        <i className="fab fa-youtube" />
                      </a>
                      <a href="#">
                        <i className="fab fa-instagram" />
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> */}
    {/*Header-Upper*/}
    <div className="header-upper">
      <div className="container rel clearfix">
        <div className="header-inner d-flex align-items-center">
          <div className="logo-outer">
            <div className="logo">
              <Link href="/">
                <a>
                  <img
                    src="/assets/images/logos/logo.png"
                    alt="Logo"
                    title="Logo"
                  />
                  <img
                    src="/assets/images/logos/logo-white.png"
                    alt="Logo"
                    title="Logo"
                  />
                </a>
              </Link>
            </div>
          </div>
          <div className="nav-outer clearfix">
            {/* Main Menu */}
            <Nav category={category} />
            {/* Main Menu End*/}
          </div>
          {/* Menu Button */}
          <div className="menu-icons">
            {/* Nav Search */}
            <div className="nav-search py-15">
              <button className="far fa-search" />
              <form
                onSubmit={(e) => e.preventDefault()}
                action="#"
                className="hide"
              >
                <input
                  type="text"
                  placeholder="Search"
                  className="searchbox"
                  required=""
                />
                <button type="submit" className="searchbutton far fa-search" />
              </form>
            </div>
            <Link href="/cart">
              <a className="cart">
                <i className="far fa-shopping-cart"></i>
                <span>{cartCount}</span>
              </a>
            </Link>
            <Link href="/user">
              <a className="user">
                <i className="far fa-user-circle"></i>
              </a>
            </Link>
            {/* menu sidbar */}
            {/* <div className="menu-sidebar" onClick={() => sidebarToggle()}>
              <button>
                <i className="far fa-ellipsis-h" />
                <i className="far fa-ellipsis-h" />
                <i className="far fa-ellipsis-h" />
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
    {/*End Header Upper*/}
  </header>
);
const Header3 = ({
  category,
  token,
  contactDetials,
  cartCount,
  openModal,
  closeModal,
  isOpen,
}) => (
  <header className="main-header header-three menu-absolute">
    <marquee
      className=""
      width="100%"
      direction="left"
      height="30px"
      style={{ background: "#227200" }}
    >
      <span className="blink">{contactDetials.offer_bar}</span>
    </marquee>
    <div className="header-top-wrap bgc-primary py-10">
      <div className="container-fluid">
        <div className="header-top px-0">
          <ul>
            <li>25% OFF Upcoming Product</li>
            <li>100% Fresh &amp; natural foods</li>
            <li>free shipping over $99</li>
            <li>money back guarantee</li>
            <li>cash on delivery</li>
          </ul>
        </div>
      </div>
    </div>
    <div className="header-middle py-15">
      <div className="container-fluid">
        <div className="header-middle-inner">
          <div className="menu-middle-left">
            <select name="currentcy" id="currentcy">
              <option value="USD">USD</option>
              <option value="BDT">BDT</option>
              <option value="EURO">EURO</option>
            </select>

            <select name="language" id="language">
              <option value="English">English</option>
              <option value="Bengali">Bengali</option>
              <option value="Arabic">Arabic</option>
            </select>

            <div className="follower">
              <i className="fab fa-facebook" />
              <a href="#">250k+ Followers</a>
            </div>
          </div>
          <div className="logo-outer">
            <div className="logo">
              <Link href="/">
                <a>
                  <img
                    src="/assets/images/logos/logo-two.png"
                    alt="Logo"
                    title="Logo"
                  />
                </a>
              </Link>
            </div>
          </div>
          {/* Menu Button */}
          <div className="menu-icons">
            {/* Nav Search */}
            <form
              onSubmit={(e) => e.preventDefault()}
              action="#"
              className="nav-search"
            >
              <input
                type="text"
                placeholder="Search here"
                className="searchbox"
                required=""
              />
              <button type="submit" className="searchbutton far fa-search" />
            </form>
            <Link href="/cart">
              <a className="cart">
                <i className="far fa-shopping-cart"></i>
                <span>{cartCount}</span>
              </a>
            </Link>
            <Link href="/user">
              <a className="user">
                <i className="far fa-user-circle"></i>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
    {/*Header-Upper*/}
    <div className="header-upper px-0">
      <div className="container-fluid clearfix">
        <div className="header-inner d-flex align-items-center">
          <div className="nav-outer clearfix">
            {/* Main Menu */}
            <Nav category={category} />
            {/* Main Menu End*/}
          </div>
          {/* menu sidbar */}
          {/* <div className="menu-sidebar" onClick={() => sidebarToggle()}>
            <button>
              <i className="far fa-ellipsis-h" />
              <i className="far fa-ellipsis-h" />
              <i className="far fa-ellipsis-h" />
            </button>
          </div> */}
        </div>
      </div>
    </div>
    {/*End Header Upper*/}
  </header>
);

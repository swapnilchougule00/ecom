import { Fragment, useEffect } from "react";
// import niceSelect from "react-nice-select";
import ImageView from "../components/ImageView";
import VideoPopup from "../components/VideoPopup";
import { animation, stickyNav } from "../utils";
import Footer from "./Footer";
import Header from "./Header";
import SideBar from "./SideBar";
import { useCartStore } from "../useCartStore";
const Layout = ({ header, footer, children }) => {
  const contactDetials = useCartStore((state) => state.contactDetials);

  useEffect(() => {
    stickyNav();
    animation();
    // niceSelect();
  }, []);
  useEffect(() => {
    if (window.location.pathname === "/index3") {
      document.querySelector("body").classList.add("home-three");
    } else {
      document.querySelector("body").classList.remove("home-three");
    }
  }, []);
  return (
    <Fragment>
      {/* <ImageGallery /> */}
      <div className="page-wrapper">
        <Header header={header} contactDetials={contactDetials} />
        <SideBar />
        {children}
        <Footer footer={footer} contactDetials={contactDetials}/>
      </div>
    </Fragment>
  );
};
export default Layout;

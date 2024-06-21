"use client";
// components/PopupModal.js
import { useState, useEffect } from "react";
import { useCartStore } from "../useCartStore";
import Link from "next/link";

const PopupModal = () => {
  const [showModal, setShowModal] = useState(false);
  const offersPopUp = useCartStore((state) => state.offersPopUp);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const myData = sessionStorage.getItem("show");
      console.log(myData);
      const timer = setTimeout(() => {
        !myData && setShowModal(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    sessionStorage.setItem("show", true);
  };

  return (
    <div
      className={`modal fade ${showModal ? "show" : ""}`}
      id="exampleModalCenter"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-modal="true"
    >
      <div className="modal-dialog modal-dialog-centered" style={{width:"60% !important"}} role="document">
        <div className="modal-content rounded-0">
          <div className="modal-body bg-4">
            <button className="close" onClick={handleCloseModal}>
              &times;
            </button>
            <div className="d-flex main-content">
              <img
                style={{
                  width: "200px",
                  objectFit: "cover", // Similar to backgroundSize: cover;
                  objectPosition: "center", // Similar to backgroundPosition: center;
                  display: "block", // Ensures that the image behaves like a block element
                }}
                src={`http://localhost:8000/storage/images/gallery/${offersPopUp.offer_image}`}
              />
              <div style={{padding:'30px' , display:'flex' , flexDirection:'column'}} className="offer-text">
                <div className="text-center">
                  <h4 className="no_wrap">{offersPopUp.title}</h4>
                  <p>{offersPopUp.description}</p>
                </div>
                {/* <div className="coupon">SUMMER60</div> */}
                <p style={{ width: "50%", margin: "auto" }}>
                  <a
                    style={{ padding: "0px 50px" }}
                    href="#"
                    className="btn py-3 btn-primary btn-block"
                  >
                    Shop
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;

import React, { useCallback, useEffect, useState } from "react";
import Header from "../src/layout/Header";
import Footer from "../src/layout/Footer";
import Layout from "../src/layout/Layout";
import axios from "axios";
import { useRouter } from "next/router";

if (typeof window !== "undefined") {
  require("text-encoding"); // Import the polyfill only on the client-side
}

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
  });
  const router = useRouter();

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const initialTime = 120; // 2 minutes in seconds

  const [timeLeft, setTimeLeft] = useState(initialTime);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localTime = localStorage.getItem("timer");
      localTime && setTimeLeft(localTime);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const myData = localStorage.getItem("email");
      const token = localStorage.getItem("token");
      if (!myData) {
        router.push("/register");
      }
      if (token) {
        router.push("/shop");
      }

      setFormData({ ...formData, email: atob(myData) });

      const interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval);

            return 0;
          }
          return prevTime - 1;
        });
        localStorage.setItem("timer", timeLeft);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [timeLeft]);

  const validateForm = () => {
    const errors = {};

    if (!formData.otp.trim()) {
      errors.otp = "otp is required";
    } else {
      errors.otp = "";
    }
    return errors;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (formData.otp) {
      try {
        // Make a POST request using axios
        const response = await axios.post(
          "http://localhost:8000/api/verify_email",
          formData
        );

        if (response.data.status === 200) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("cart", JSON.stringify(response.data.cart));
          router.push("/shop");
        }
      } catch (error) {
        // Handle errors from the request
        console.error("Error submitting form:", error.message);
      }
    } else {
      console.log(validationErrors);
      setErrors(validationErrors);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setTimeLeft(120);
    try {
      // Make a POST request using axios
      const response = await axios.post(
        "http://localhost:8000/api/resend_otp",
        { email: formData.email }
      );

      if (response.data.status === 200) {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };

  return (
    <Layout header={1}>
      <section className="register-section mt-95">
        <div className="register-container row">
          <div>
            <h3>Verify</h3>
            <form className="row">
              <div className="col-md-6">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  placeholder="Email"
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>

              <div className="col-md-6">
                <label htmlFor="username">OTP:</label>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  placeholder="OTP"
                />
                {errors.otp && <span className="error">{errors.otp}</span>}
              </div>

              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                {timeLeft !== 0 ? (
                  <span>Resend OTP after : {formatTime(timeLeft)}</span>
                ) : (
                  <button
                    style={{ background: "orange", width: "30%" }}
                    onClick={handleReset}
                  >
                    Resend OTP
                  </button>
                )}
              </div>

              <div className="col-md-12">
                <button onClick={handleSubmit}>Verify</button>
              </div>
            </form>
          </div>
          <div className="news-shapes">
            <img
              className="half-leaf"
              src="assets/images/slider/half-leaf.png"
              alt="Leaf"
            />
            <img
              className="leaf-two"
              src="assets/images/shapes/leaf-three.png"
              alt="Leaf"
            />
            <img
              className="leaf-three"
              src="assets/images/shapes/leaf-four.png"
              alt="Leaf"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Register;

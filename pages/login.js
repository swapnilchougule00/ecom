import React, { useEffect, useState } from "react";
import Layout from "../src/layout/Layout";
import axios from "axios";
import config from "../config/default.json";
import Link from "next/link";
import { useRouter } from "next/router";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [cartItems, setCartItems] = useState([]);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const myData = localStorage.getItem("cart");
      const ParsedData = myData && JSON.parse(myData);
      setCartItems(ParsedData);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    console.log(Object.keys(validationErrors).length);

    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      try {
        const response = await axios.post(`${config.API_URL}/client_login`, {
          ...formData,
          cartItems,
        });

        if (response.data.status === 200) {
          localStorage.setItem("email", btoa(formData.email));
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("cart", JSON.stringify(response.data.cart));
          router.push("/shop");
        } else if (response.data.status === 401) {
          localStorage.setItem("email", btoa(formData.email));
          router.push("/verify");
        } else {
          console.error(
            "Error: Unexpected response status:",
            response.data.status
          );
        }
      } catch (error) {
        // Handle errors from the request
        console.error("Error submitting form:", error.message);
      }
    } else {
      setErrors(validationErrors);
    }
    console.log(formData); // Temporary logging
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    }
    if (!emailRegex.test(formData.email)) {
      errors.email = "Email is invalid";
    } else {
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
    }

    return errors;
  };

  return (
    <Layout header={1}>
      <section className="register-section mt-95">
        <div className="login-container">
          <h4>Login</h4>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email/Username"
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                onCopy={(e) => e.preventDefault()}
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
              />
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}
            </div>

            <button
              onClick={handleSubmit}
              style={{ marginBottom: "20px", marginTop: "10px" }}
              type="submit"
            >
              Login
            </button>
          </form>

          <span style={{ marginTop: "20px", color: "black" }}>
            Don`t have a account?{" "}
            <Link
              style={{ color: "orange", marginTop: "16px" }}
              href="/register"
            >
              Click here to Register
            </Link>{" "}
          </span>
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

export default Login;

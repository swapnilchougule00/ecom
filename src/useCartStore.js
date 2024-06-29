import { create } from "zustand";

export const useCartStore = create((set) => ({
  cartCount: 0,
  isOpen: false,
  contactDetials: {},
  aboutDetials: {},
  blogs: [],
  offersPopUp: {},
  categorys: [],
  sliders: [],
  shopSearch: {},

  subTotal: 0,
  totalPrice: 0,
  gst: 0,

  updateCartCount: () => {
    const cartList = localStorage.getItem("cart");
    const cart = cartList && JSON.parse(cartList);
    const totalCount = cart && cart.length;
    totalCount && set({ cartCount: totalCount });
  },

  handleLogout: () => {
    localStorage.clear();
    set({ cartCount: 0 });
  },

  removeCartItems: (id) => {
    const cartList = localStorage.getItem("cart");
    const cart = cartList && JSON.parse(cartList);
    const fData = cart && cart.filter((item) => item.id != id);
    localStorage.setItem("cart", JSON.stringify(fData));
    const totalCount = fData.length || 0;
    set({ cartCount: totalCount || 0 });
    let shipping = 10;
    const cartl = localStorage.getItem("cart");
    const cartData = cartl && JSON.parse(cartl);
    const subTotal_ = () => {
      return cartData
        ?.map((item) => item.price * (item.qty || item.quantity))
        .reduce((prev, next) => prev + next, 0)
        .toFixed(2);
    };

    const gst = Number((subTotal_() * 18) / 100).toFixed(2);
    set({ subTotal: subTotal_() });
    set({ gst: gst });
    set({
      totalPrice: (
        Number(subTotal_()) +
        Number(gst) +
        Number(shipping)
      ).toFixed(2),
    });
  },

  updateQuantity: (id, quantity) => {
    const cartList = localStorage.getItem("cart");
    const cart = cartList ? JSON.parse(cartList) : [];
    console.log(quantity);
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        return { ...item, qty: quantity };
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  },

  updateContactDetaills: (data) => {
    set({ contactDetials: data || {} });
  },

  updateAboutDetaills: (data) => {
    set({ aboutDetials: data || {} });
  },

  updateBlogsDetaills: (data) => {
    set({ blogs: data || [] });
  },

  updateCategorys: (data) => {
    set({ categorys: data || [] });
  },
  updateSlider: (data) => {
    set({ sliders: data || [] });
  },

  categorySearch: (category) => {
    set({ shopSearch: category || {} });
  },

  updateOffers: (offers) => {
    set({ offersPopUp: offers || {} });
  },

  openUserModal: () => {
    set({ isOpen: true });
  },

  calculateAmounts: (cartData) => {
    console.log(cartData);
    let shipping = 10;
    const subTotal_ = () => {
      return cartData
        ?.map((item) => item.price * (item.qty || item.quantity))
        .reduce((prev, next) => prev + next, 0)
        .toFixed(2);
    };
    const gst = Number((subTotal_() * 18) / 100).toFixed(2);
    set({ subTotal: subTotal_() });
    set({ gst: gst });
    set({
      totalPrice: (
        Number(subTotal_()) +
        Number(gst) +
        Number(shipping)
      ).toFixed(2),
    });
  },
}));

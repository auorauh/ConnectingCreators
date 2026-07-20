"use client";
import React, { useMemo, useState } from "react";
import "./Cart.css";
import Link from "next/link";

  const initialCart = [
  {
    id: 1,
    name: "Connecting Creators Tee",
    price: 50,
    quantity: 1,
    image: "/shirt.png",
    stripePriceId: "price_1TsnPkE7Y7K7bmyQHsQS8ghM"
  },
];

export default function Cart() {
  const [cart, setCart] = useState(initialCart);
  const [loading, setLoading] = useState(false);
  const [selectedSize, setSelectedSize] = useState("S");


const sizesTest = [
  { label: "S", priceId: "price_1TsnPkE7Y7K7bmyQHsQS8ghM" },
  { label: "M", priceId: "price_1TsnwrE7Y7K7bmyQYQD7BdMM" },
  { label: "L", priceId: "price_1TsnyLE7Y7K7bmyQRCtJCKK3" },
  { label: "XL", priceId: "price_1TsnyiE7Y7K7bmyQckCgCDGA" },
];

const sizes = [
  { label: "S", priceId: "price_1Tv5dYCcDoUBbdxYb1e6A3mB" },
  { label: "M", priceId: "price_1Tv5eBCcDoUBbdxY0lXeb9kL" },
  { label: "L", priceId: "price_1Tv5epCcDoUBbdxYZlKg0CAJ" },
  { label: "XL", priceId: "price_1Tv5fFCcDoUBbdxYVLugxndV" }
];

  const subtotal = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }, [cart]);

  const updateQuantity = (id, amount) => {
    setCart((items) =>
      items
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: Math.max(1, item.quantity + amount),
              }
            : item
        )
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const checkout = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cart.map((item) => ({
            price: sizes.find(size => size.label === selectedSize)?.priceId,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();

      // Redirect to Stripe Checkout
      window.location.href = data.url;
      
    } catch (err) {
      console.error(err);
      alert("Checkout failed. Please reach out to our discord for support.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <h2>Your Cart</h2>
        <p>Your cart is empty.</p>
        <Link href="/shop">
          <button className="checkout">Continue Shopping</button>
        </Link>
      </div>
    );
  }

  

  return (
    <div className="cart-page">
      <div className="cart-items">

        <h2>Your Cart</h2>

        {cart.map((item) => (
          <div className="cart-item" key={item.id}>

            <img src={'/Assets/Shop/PinkElephants/shirtmockup5.png'} alt={item.name} />

            <div className="cart-info">

              <h3>{item.name}</h3>

              <p>${item.price.toFixed(2)}</p>

          <select className="SizeSelect" value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
            <option value="XL">XL</option>
          </select>

              <div className="quantity">

                <button
                  onClick={() => updateQuantity(item.id, -1)}
                >
                  −
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => updateQuantity(item.id, 1)}
                >
                  +
                </button>

              </div>

            </div>

            <div className="cart-right">

              <h3>
                $
                {(item.price * item.quantity).toFixed(2)}
              </h3>

              <button
                className="remove"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>

            </div>

          </div>
        ))}

      </div>

      <div className="summary">

        <h2>Order Summary</h2>

        <div className="summary-row">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="summary-row">
          {/* <span>Shipping</span>
          <span>Calculated at Checkout</span> */}
        </div>

        <div className="summary-row total">
          <span>Total</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        <button
          className="checkout"
          onClick={checkout}
          disabled={loading}
        >
          {loading ? "Redirecting..." : "Checkout"}
        </button>

      </div>
    </div>
  );
}
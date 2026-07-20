import React, { useMemo, useState } from "react";
import "./Cart.css";

import { loadStripe } from "@stripe/stripe-js";
import {
    Elements,
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";

export default function Cart() {


    return (<div className="cart-page">
        <h2>Your Cart</h2>
        <p>Your cart is empty.</p>
    </div>)

}
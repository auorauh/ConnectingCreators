import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Cart from "../cart/page";

const stripePromise = loadStripe(
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
);

export default function Checkout() {

    const clientSecret = "pi_xxx_secret_xxx";

    return (
        <Elements
            stripe={stripePromise}
            // options={{ clientSecret }}
        >
            <Cart />
        </Elements>
    );
}
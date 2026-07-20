import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { items } = await request.json();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      line_items: items.map(item => ({
        price: item.price,
        quantity: item.quantity,
      })),

      shipping_address_collection: {
      allowed_countries: ["US"],
      },


      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
    });

    return Response.json({
      url: session.url,
    });
  } catch (err) {
    console.error(err);

    return Response.json(
      { error: "Unable to create checkout session." },
      { status: 500 }
    );
  }
}
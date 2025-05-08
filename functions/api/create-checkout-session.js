// functions/api/create-checkout-session.js
import Stripe from "stripe";

export async function onRequestPost(context) {
  try {
    // Get the Stripe secret key from Cloudflare environment variables
    const stripeSecretKey = context.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      console.error("STRIPE_SECRET_KEY environment variable is not set.");
      return new Response(
        JSON.stringify({
          error: "Server configuration error: Missing Stripe secret key.",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16", // Use a recent API version
    });

    // Get data from the request body
    const { amount, currency = "usd" } = await context.request.json();

    if (!amount || typeof amount !== "number" || amount < 50) {
      // Ensure amount is in cents and at least 50 cents
      return new Response(
        JSON.stringify({ error: "Invalid amount. Minimum is 50 cents." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Get the base URL of your site from the request headers or env variable
    // For Cloudflare Pages, the deployed URL is usually available in context.request.url
    const requestUrl = new URL(context.request.url);
    const siteUrl = `${requestUrl.protocol}//${requestUrl.host}`; // e.g. https://your-pages-project.pages.dev

    // Create a Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: "Custom Payment",
              // description: 'A one-time payment for your service/product', // Optional
            },
            unit_amount: amount, // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${siteUrl}/?status=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/?status=cancel`,
      // automatic_tax: { enabled: true }, // Optional: if you have Stripe Tax configured
    });

    return new Response(JSON.stringify({ id: session.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error creating Stripe session:", err);
    // Avoid sending detailed Stripe errors to the client in production
    let errorMessage = "Could not create payment session.";
    if (err instanceof Stripe.errors.StripeError) {
      // More specific Stripe error handling can be done here if needed
      // For now, keep it generic for the client
    }

    return new Response(
      JSON.stringify({ error: errorMessage, details: err.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// Optional: Handle other HTTP methods if needed, or return 405 Method Not Allowed
export async function onRequest(context) {
  if (context.request.method === "POST") {
    return await onRequestPost(context);
  }
  return new Response("Method Not Allowed", { status: 405 });
}

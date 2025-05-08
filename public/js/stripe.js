const stripe = Stripe(
  "pk_test_51RMCAQPEx2BEmQNxOJ259sjGSBqeyIvliZ4Wa55Ln9wvSoTXYS9uMqhbEYUC9SWzyTE1LYKxZ0qOEsn5Q46lDjJM00sLEAEamY"
);

document.getElementById("pay-button").addEventListener("click", () => {
  // Create a direct payment link using Stripe's prebuilt checkout
  stripe
    .redirectToCheckout({
      lineItems: [
        {
          price: "price_1RMCGqPEx2BEmQNxWPtklXGB", // Replace with your actual Price ID
          quantity: 1,
        },
      ],
      mode: "payment",
      successUrl: window.location.href + "?paid=success",
      cancelUrl: window.location.href + "?paid=cancel",
    })
    .then((result) => {
      if (result.error) {
        console.log("Payment failed:", result.error.message);
      }
    });
});

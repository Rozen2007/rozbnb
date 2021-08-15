const stripe = require("stripe")(
  "sk_test_51IuEbNSFhYF5q8wPGqLCIss66FKpgduz2v8ZeyK6pltEKxnjnkbVtBX5xWDPIXrNWoJzf2walETxnkvSTKL23yIe00aUeH97Vr"
);

export default async (req, res) => {
  if (req.method == "POST") {
    const { img, title, description, price } = req.body;
    const transformedItems = [
      {
        description: description,
        quantity: 1,
        price_data: {
          currency: "gbp",
          unit_amount: price + 10 ,
          product_data: {
            name: title,
            images: [img],
          },
        },
      },
    ];

    const session = await stripe.checkout.sessions
      .create({
        payment_method_types: ["card"],
        line_items: transformedItems,
        mode: "payment",
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}/error`,
      })
      .catch((err) => res.status(500).json({ error: err.message }));
    res.status(200).json({ id: session.id });
  }
};

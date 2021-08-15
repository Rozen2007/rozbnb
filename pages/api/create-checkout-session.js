const stripe = require("stripe")("sk_test_51IuEbNSFhYF5q8wPGqLCIss66FKpgduz2v8ZeyK6pltEKxnjnkbVtBX5xWDPIXrNWoJzf2walETxnkvSTKL23yIe00aUeH97Vr");

export default async (req, res) => {
    const { items, email } = req.body;

    const transformedItems = items.map((item) => ({
        description: item.description,
        quantity: 1,
        price_data: {
            currency: "inr",
            unit_amount: item.total * 100,
            product_data: {
                name: item.title,
                images: [item.img]
            },
        }
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: transformedItems,
        mode: "payment",
        success_url: `http://localhost:3000/success`,
        cancel_url: `http://localhost:3000/`,
        metadata: {
            email,
            images: JSON.stringify(items.map((item) => item.img))
        },
    })

    res.status(200).json({ id: session.id });
}
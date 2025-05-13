import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { stripe } from "../../lib/stripe";

export async function POST(request) {
    const body = await request.json();

    try {
        const headersList = await headers();
        const origin = headersList.get("origin");

        const params = {
            submit_type: "pay",
            payment_method_types: ["card"],
            billing_address_collection: "auto",
            shipping_options: [
                { shipping_rate: "shr_1RMdUt01Wx3NE9uCiavFQT4J" },
                { shipping_rate: "shr_1RMdVY01Wx3NE9uCGjH1PtSr" },
            ],
            line_items: body.map((el) => {
                const image = el.product.images[0].asset._ref
                    .replace(
                        "image-",
                        "https://cdn.sanity.io/images/mhop4d4n/production/"
                    )
                    .replace("-webp", ".webp");

                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: el.product.name,
                            images: [image],
                        },
                        unit_amount: el.product.price * 100,
                    },
                    adjustable_quantity: { enabled: true, minimum: 1 },
                    quantity: el.qty,
                };
            }),
            mode: "payment",
            success_url: `${origin}/success`,
            cancel_url: `${origin}/?canceled=true`,
        };
        const session = await stripe.checkout.sessions.create(params);
        return NextResponse.json(session);
    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        );
    }
}

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const key = process.env.STRIPESECRET;

const stripe = new Stripe(key, {
  apiVersion: "2022-11-15",
});
let success=false;
export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log(body);
  try {
    if (body.length > 0) {
      
      const session = await stripe.checkout.sessions.create({
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        // shipping_options: [
        //   { shipping_rate: "shr_1OQTlRJBAtmMzAzUTrOecPHU" },
        //   { shipping_rate: "shr_1OQTkrJBAtmMzAzUXeS8g9Q8" },
        // ],
        invoice_creation: {
          enabled: true,
        },
        line_items: body.map((item: any) => {
          return {
            price_data: {
              currency: "pkr",
              product_data: {
                name: item.project_name,
              },
              unit_amount: item.price * 100,
            },
            quantity: 1,
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
              maximum: 10,
            },
          };
        }),
        phone_number_collection: {
          enabled: true,
        },
        // success_url: `${request.headers.get("origin")}/success`,
        success_url: `${request.headers.get("origin")}/success/${body[0]._id}`,
        cancel_url: `${request.headers.get("origin")}/?canceled=true`,
      });
      success=true;
      return NextResponse.json({ session ,success});
    } else {
      return NextResponse.json({ message: "No Data Found",success });
    }
  } catch (err: any) {
    return NextResponse.json(err.message);
  }
}

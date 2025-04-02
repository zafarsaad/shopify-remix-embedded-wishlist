import { json } from "@remix-run/react";

export async function loader() {
  return json({
    ok: true,
    message: "Hello from the Shopify Remix Wishlist API!",
  });
}

export async function action({ request }) {
  const method = request.method;

  switch (method) {
    case "POST":
      //
      return json({ message: "Success on POST message!", method: "POST" });
    case "PATCH":
      return json({ message: "Success on PATCH message!", method: "PATCH" });
    default:
      // Optionally handle OTHER Methods
      return new Response("Method not supported!", { status: 405 });
  }
}

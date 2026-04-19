export async function GET() {
  return new Response(
    `User-agent: *
Allow: /
Sitemap: https://shopify-shipping-calc.com/sitemap-index.xml`,
    { headers: { 'Content-Type': 'text/plain' } }
  );
}

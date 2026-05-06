export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  if (url.hostname === 'www.shopify-shipping-calc.com') {
    url.hostname = 'shopify-shipping-calc.com';
    return Response.redirect(url.toString(), 301);
  }
  return next();
}

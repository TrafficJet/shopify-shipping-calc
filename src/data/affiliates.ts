// Central affiliate config.
// Paste real tracking links here after each program approves you.
// Empty string = the CTA block for that offer is hidden site-wide.

export const AFFILIATES = {
  // Shipping software (ShipStation / Easyship / Pirate Ship). Shown under rate calculators.
  SHIPPING_SOFT_URL: '',
  SHIPPING_SOFT_NAME: 'ShipStation',

  // Shopify Affiliate bounty link. Shown on guides / secondary CTAs.
  SHOPIFY_URL: '',
} as const;

/** Append utm params so partner dashboards show which page converted. */
export function withUtm(url: string, content: string): string {
  if (!url) return '';
  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}utm_source=shopify-shipping-calc&utm_medium=calculator&utm_content=${encodeURIComponent(content)}`;
}

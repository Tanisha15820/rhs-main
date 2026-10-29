export const ENQUIRY_CART_KEY = "enquiryCart";

export function saveEnquiryProduct(product) {
  if (!product) return;

  const fallbackSlug =
    typeof window !== "undefined" && window.location?.pathname
      ? window.location.pathname.replace(/^\/+|\/+$/g, "")
      : "";

  const resolvedId =
    product.machine_id ||
    product.id ||
    fallbackSlug ||
    String(Date.now());

  const resolvedName =
    product.machine_name ||
    product.name ||
    product.productName ||
    product.productTitle ||
    product.title ||
    "Medical Equipment";

  const item = {
    id: resolvedId,
    machine_id: String(resolvedId),
    name: resolvedName,
    machine_name: resolvedName,
    image: product.image || product.productImage || "",
    quantity: product.quantity || 1,
  };

  localStorage.setItem(ENQUIRY_CART_KEY, JSON.stringify([item]));
  return item;
}

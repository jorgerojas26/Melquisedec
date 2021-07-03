export default function getProductName(product_variant) {
    return `${product_variant.product.name} ${product_variant.product.brand} ${product_variant.name}`;
}

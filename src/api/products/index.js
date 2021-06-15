import axios from "axios";

const BASE_URL = "/api/products";

export const getProducts = async ({ page, filter }) => {
    let pageParam = page ? `?page=${page}` : "";
    let filterParams = filter ? `&filter=${filter}` : "";

    const response = await axios.get(BASE_URL + pageParam + filterParams).catch((error) => error.response);
    return response.data;
};

export const getProductById = async (id) => {
    const response = await axios.get(BASE_URL + `/${id}`).catch((error) => error.response);
    return response.data;
};

export const createProduct = async (productData) => {
    let formData = new FormData();
    let variantsWithImage = [];

    productData.product_variant.forEach((variant, index) => {
        if (variant.imagePath != null && typeof variant.imagePath === "object") {
            formData.append("images", variant.imagePath);
            variantsWithImage.push(index);
        } else {
            variantsWithImage.push(null);
        }
    });

    formData.append("variantsWithImage", JSON.stringify(variantsWithImage));
    formData.append("name", productData.name);
    formData.append("brand", productData.brand);
    formData.append("product_variant", JSON.stringify(productData.product_variant));

    const response = await axios({
        method: "post",
        url: BASE_URL,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
    }).catch((error) => error.response);
    return response.data;
};

export const updateProduct = async (id, productData) => {
    let formData = new FormData();
    let variantsWithImage = [];

    productData.product_variant.forEach((variant, index) => {
        if (variant.imagePath != null && typeof variant.imagePath === "object") {
            formData.append("images", variant.imagePath);
            variantsWithImage.push(index);
        } else if (typeof variant.imagePath === "string") {
            variantsWithImage.push(variant.imagePath);
        } else {
            variantsWithImage.push(null);
        }
    });

    formData.append("variantsWithImage", JSON.stringify(variantsWithImage));
    formData.append("name", productData.name);
    formData.append("brand", productData.brand);
    formData.append("product_variant", JSON.stringify(productData.product_variant));

    const response = await axios({
        method: "patch",
        url: BASE_URL + `/${id}`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
    }).catch((error) => error.response);
    return response.data;
};

export const deleteProduct = async (id) => {
    const response = await axios.delete(BASE_URL + `/${id}`).catch((error) => error.response);
    return response.data;
};

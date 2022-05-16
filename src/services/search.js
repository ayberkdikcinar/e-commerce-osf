const categoryModel = require('../models/category.model')
const productModel = require('../models/product.model')


const PRODUCT_PER_PAGE = 25;

const allProducts = [];

async function loadAllProducts() {

    const allCategories = await categoryModel.getAllCategories();

    for (let index = 0; index < allCategories.data.length; index++) {

        const category = allCategories.data[index];
        let page = 1;
        let productCount;
        const products = await productModel.getProductByCategoryId(category.id, page);
        productCount = products.data.length;
        for (let i = 0; i < productCount; i++) {
            productModel.addImageLinkExplicitly(products.data[i]);
            allProducts.push({
                id: products.data[i].id,
                page_title: products.data[i].page_title,
                type: products.data[i].primary_category_id,
                image: products.data[i].image
            });
        }
        if (productCount == PRODUCT_PER_PAGE) {
            while (productCount == PRODUCT_PER_PAGE) {
                page++;
                const products = await productModel.getProductByCategoryId(category.id, page);
                productCount = products.data.length;
                for (let i = 0; i < productCount; i++) {
                    productModel.addImageLinkExplicitly(products.data[i]);
                    allProducts.push({
                        id: products.data[i].id,
                        page_title: products.data[i].page_title,
                        type: products.data[i].primary_category_id,
                        image: products.data[i].image
                    });
                }
            }
        }

    }
    console.log(allProducts[0]);
}

function searchProductByName(input) {
    const relatedProducts = [];
    for (const product of allProducts) {
        if (product['page_title'] != undefined && product['page_title'].toLowerCase().includes(input.toLowerCase())) {
            relatedProducts.push(product);
        }
    }
    return relatedProducts;
}
module.exports = {
    loadAllProducts,
    searchProductByName
}
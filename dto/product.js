class ProductDTO {
    constructor(product){
        this._id = product._id;
        this.product_name = product.product_name;
        this.quantity = product.quantity,
        this.price = product.price;
        this.expiry_date = product.expiry_date;
    }
}

module.exports = ProductDTO;
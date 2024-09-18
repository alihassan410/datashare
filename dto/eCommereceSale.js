class ECommerceSaleDTO {
    constructor(eCommerceSale) {
        this._id = eCommerceSale._id;
        this.customerName = eCommerceSale.customerName;
        this.productName = eCommerceSale.productName;
        this.quantity = eCommerceSale.quantity;
        this.pricePerItem = eCommerceSale.pricePerItem;
        this.date = eCommerceSale.date;
        this.totalPrice = eCommerceSale.totalPrice;
    }
}

module.exports = ECommerceSaleDTO;

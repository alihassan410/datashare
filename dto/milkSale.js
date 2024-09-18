class MilkSaleDTO {
    constructor(milkSale) {
        this._id = milkSale._id;
        this.customerName = milkSale.customerName;
        this.quantity = milkSale.quantity;
        this.pricePerLiter = milkSale.pricePerLiter;
        this.date = milkSale.date;
        this.totalSale = milkSale.totalSale;
    }
}

module.exports = MilkSaleDTO;

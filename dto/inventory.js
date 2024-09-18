class InventoryDTO {
    constructor(item){
        this._id = item._id;
        this.itemName = item.itemName;
        this.price = item.price;
        this.stock = item.stock;
    }
}

module.exports = InventoryDTO;
class MilkDTO {
    constructor(milk) {
        this._id = milk._id;
        this.animalType = milk.animalType;
        this.animal_code = milk.animal_code;
        this.date = milk.date;
        this.time = milk.time;
        this.quantity = milk.quantity;
    }
}

module.exports = MilkDTO;

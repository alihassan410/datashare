class MeatAnimalDTO {
    constructor(meatAnimal) {
        this._id = meatAnimal._id;
        this.animalType = meatAnimal.animalType;
        this.animal_code = meatAnimal.animal_code;
        this.sex = meatAnimal.sex;
        this.weight = meatAnimal.weight;
        this.purchase_price = meatAnimal.purchase_price;
        this.purchase_date = meatAnimal.purchase_date;
        this.age = meatAnimal.age;
    }
}

module.exports = MeatAnimalDTO;

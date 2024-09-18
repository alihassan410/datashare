class AnimalDTO {
    constructor(animal) {
        this._id = animal._id;
        this.animalType = animal.animalType;
        this.animal_code = animal.animal_code;
        this.breed = animal.breed;
        this.weight = animal.weight;
        this.avg_milk = animal.avg_milk;
        this.purchase_price = animal.purchase_price;
        this.with_calf = animal.with_calf;
        this.age = animal.age;
        this.milking_status = animal.milking_status;
        this.disease_history = animal.disease_history;
        this.total_calf = animal.total_calf;
        this.calving_history = animal.calving_history;
        this.purchase_date = animal.purchase_date;

        // Conditionally include optional attributes
        if (animal.death_date) {
            this.death_date = animal.death_date;
        }
        if (animal.sale_date) {
            this.sale_date = animal.sale_date;
        }
        if (animal.expected_delivery_date) {
            this.expected_delivery_date = animal.expected_delivery_date;
        }
    }
}

module.exports = AnimalDTO;

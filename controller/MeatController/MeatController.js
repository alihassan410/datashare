const Joi = require('joi');
const MeatAnimal = require('../../models/meatAnimal');
const MeatAnimalDTO = require('../../dto/meatAnimal');

const MeatAnimalController = {
    async addMeatAnimal(req, res, next) {
        const meatAnimalRegisterSchema = Joi.object({
            animalType: Joi.string().valid('buffalo', 'cow', 'goat').required(),
            animal_code: Joi.string().required(),
            sex: Joi.string().valid('male', 'female').required(),
            weight: Joi.number().required(),
            purchase_price: Joi.number().required(),
            purchase_date: Joi.date().required(),
            age: Joi.number().required(),
        });

        const { error } = meatAnimalRegisterSchema.validate(req.body);
        if (error !== undefined && error !== true) {
            console.log(check)
            return next(error);
        }

        const { animalType, sex, weight, purchase_price, purchase_date, age } = req.body;
        try {
            let newAnimal = new MeatAnimal({
                animalType: animalType,
                sex: sex,
                weight: weight,
                purchase_price: purchase_price,
                purchase_date: purchase_date,
                age: age,
            });
            let savedAnimal = await newAnimal.save();
            let update = await MeatAnimal.findOneAndUpdate({ _id: newAnimal._id }, { animal_code: newAnimal._id });
            const animalDTO = new MeatAnimalDTO(savedAnimal);

            return res.status(201).json({ animal: animalDTO, auth: true });
        } catch (error) {
            console.log(error);
            return next(error);
        }
    },
    async EditMeatAnimal(req, res, next) {
        const meatAnimalRegisterSchema = Joi.object({
            animalType: Joi.string().valid('buffalo', 'cow', 'goat').required(),
            animal_code: Joi.string().required(),
            sex: Joi.string().valid('male', 'female').required(),
            weight: Joi.number().required(),
            purchase_price: Joi.number().required(),
            purchase_date: Joi.date().required(),
            age: Joi.number().required(),
            _id: Joi.string(),
        });

        const { error } = meatAnimalRegisterSchema.validate(req.body);
        if (error !== undefined && error !== true) {
            console.log(check)
            return next(error);
        }

        const { animalType, sex, weight, purchase_price, purchase_date, age, _id } = req.body;
        try {
            let animal = await MeatAnimal.findOneAndUpdate({ _id }, { animalType, sex, weight, purchase_price, purchase_date, age })
            return res.status(201).json({ animal });
        } catch (error) {
            console.log(error);
            return next(error);
        }
    },
    async getAllMeatAnimals(req, res, next) {
        try {
            const meats = await MeatAnimal.find();
            if (!meats || meats.length === 0) {
                return res.status(404).json({ message: 'No animals found' });
            }
            const meatAnimalDTOs = meats.map(meat => new MeatAnimalDTO(meat));

            return res.status(200).json({ meats: meatAnimalDTOs });
        } catch (error) {
            return next(error);
        }
    },
    async getMeatById(req, res, next) {
        try {
            const meats = await MeatAnimal.findById({ _id: req.params.id });
            return res.status(200).json({ meats });
        } catch (error) {
            return next(error);
        }
    },
    async deleteMeatById(req, res, next) {
        console.log(req.params.id)
        try {
            const meats = await MeatAnimal.findOneAndDelete({ _id: req.params.id });
            return res.status(200).json({ message: "Animal deleted" });
        } catch (error) {
            return next(error);
        }
    },
};

module.exports = MeatAnimalController;

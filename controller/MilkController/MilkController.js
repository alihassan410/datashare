const Joi = require('joi');
const Milk = require('../../models/milk');
const MilkDTO = require('../../dto/milk');
const Animal = require('../../models/animal');

const MilkController = {
    async addingMilk(req, res, next) {

        const milkRegisterSchema = Joi.object({
            animalType: Joi.string().valid('buffalo', 'cow').required(),
            date: Joi.date().required(),
            time: Joi.string().valid('morning', 'evening').required(),
            quantity: Joi.number().required(),
            animal_code: Joi.string(),
        });
        const { error } = milkRegisterSchema.validate(req.body);
        if (error) {
            return next(error);
        }

        const { animalType, animal_code, date, time, quantity } = req.body;
        try {
            let animalExists = false;
            if (animalType === 'buffalo') {
                animalExists = await Animal.exists({ animal_code: animal_code });
            } else if (animalType === 'cow') {
                animalExists = await Animal.exists({ animal_code: animal_code });
            }
            console.log("Check", animalExists);
            if (!animalExists) {
                const error = {
                    status: 404,
                    message: 'Animal not found'
                };
                return next(error);
            }

            // Save the milk data
            const newMilk = new Milk({
                animalType,
                animal_code,
                date,
                time,
                quantity
            });
            await newMilk.save();

            return res.status(201).json({ message: 'Milk data added successfully' });
        } catch (error) {
            return next(error);
        }
    },
    async EditMilk(req, res, next) {
        console.log(req.body);
        const milkRegisterSchema = Joi.object({
            animalType: Joi.string().valid('buffalo', 'cow').required(),
            date: Joi.date().required(),
            time: Joi.string().valid('morning', 'evening').required(),
            quantity: Joi.number().required(),
            animal_code: Joi.string(),
            _id: Joi.string(),
        });
        const { error } = milkRegisterSchema.validate(req.body);
        if (error) {
            return next(error);
        }
        console.log(req.body);
        const { animalType, animal_code, date, time, quantity, _id } = req.body;
        try {
            let updatedMilk = await Milk.findByIdAndUpdate({ _id }, { animalType, animal_code, date, time, quantity })
            console.log(updatedMilk);
            return res.status(201).json({ message: 'Milk data added successfully' });
        } catch (error) {
            return next(error);
        }
    },
    async getAllMilk(req, res, next) {
        try {
            const milks = await Milk.find();
            if (!milks || milks.length === 0) {
                return res.status(404).json({ message: 'No Milk record found' });
            }
            const milkDTOs = milks.map(milk => new MilkDTO(milk));
            return res.status(200).json({ milks: milkDTOs });
        } catch (error) {
            return next(error);
        }
    },
    async getMilkById(req, res, next) {
        try {
            const milks = await Milk.findOne({ _id: req.params.id });
            //console.log(milks, req.params);
            return res.status(200).json({ milks });
        } catch (error) {
            return next(error);
        }
    },
    async deleteMilk(req, res, next) {
        try {
            const milks = await Milk.findOneAndDelete({ _id: req.params.id });
            return res.status(200).json({ message: "Milk deleted" });
        } catch (error) {
            return next(error);
        }
    },
};

module.exports = MilkController;

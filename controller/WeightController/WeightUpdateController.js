const Joi = require('joi');
const MeatAnimal = require('../../models/meatAnimal');

const WeightUpdateController = {
    async updateWeight(req, res, next) {
        const weightUpdateSchema = Joi.object({
            animalType: Joi.string().valid('goat', 'buffalo', 'cow').required(),
            animal_code: Joi.string().required(),
            new_weight: Joi.number().required(),
            recordedAt: Joi.date().required(),
        });
        console.log(req.body);
        const { error } = weightUpdateSchema.validate(req.body);
        if (error !== undefined && error == true) {
            return next(error);
        }
        const { animal_code, new_weight } = req.body;
        try {
            const animalExists = await MeatAnimal.exists({ animal_code: animal_code });
            console.log("Check", animalExists);
            if (!animalExists) {
                const error = {
                    status: 404,
                    message: 'Animal not found'
                };
                return next(error);
            }

            // Update the weight
            const updatedAnimal = await MeatAnimal.findOneAndUpdate(
                { animal_code },
                { weight: new_weight },
            );
            return res.status(200).json({ animal: updatedAnimal });
        } catch (error) {
            console.log(error);
            return next(error);
        }
    }
};

module.exports = WeightUpdateController;

const Joi = require('joi');
const Disease = require('../../models/disease');
const { find } = require('../../models/admin');

const diseaseController = {
    async detectDisease(req, res, next) {
        const { symptoms } = req.body;
        console.log(symptoms)
        try {
            // Find diseases that match all the provided symptoms
            const diseases = await Disease.find({
                symptoms: symptoms
            });

            if (diseases.length === 0) {
                return res.status(404).json({ message: 'No matching diseases found' });
            }

            // Map the diseases to include only the necessary details
            const diseaseDetails = diseases.map(disease => ({
                name: disease.name,
                treatment: disease.treatment,
                description: disease.description
            }));

            return res.status(200).json({ diseases: diseaseDetails });
        } catch (error) {
            return next(error);
        }
    },
    async AdddetectDisease(req, res, next) {
        const { symptom, daignose } = req.body.symptoms
        try {
            const check = await Disease.find({ symptoms: symptom });
            if (check.length > 0) {
                await Disease.findOneAndUpdate({ symptoms: symptom }, { treatment: daignose, });
                return res.json({ message: 'Added' });
            }
            const diseases = await Disease.create({
                symptoms: symptom,
                treatment: daignose,
            });
            return res.json({ message: 'Added' });
        } catch (error) {
            console.log(error);
            return next(error);
        }
    }
};

module.exports = diseaseController;

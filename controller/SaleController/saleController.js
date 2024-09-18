const Joi = require('joi');
const MilkSale = require('../../models/milkSale');

const SaleController = {
    async addMilkSale(req, res, next) {
        const milkSaleSchema = Joi.object({
            customerName: Joi.string().required(),
            quantity: Joi.number().required(),
            pricePerLiter: Joi.number().required(),
            totalSale: Joi.number().required(),
            date: Joi.date().optional()
        });

        const { error } = milkSaleSchema.validate(req.body);
        if (error) {
            return next(error);
        }

        const { customerName, quantity, pricePerLiter, totalSale, date } = req.body;

        try {
            const newMilkSale = new MilkSale({
                customerName,
                quantity,
                pricePerLiter,
                totalSale,
                date
            });

            const savedMilkSale = await newMilkSale.save();
            return res.status(201).json({ milkSale: savedMilkSale });
        } catch (error) {
            return next(error);
        }
    },
    async updateMilkSale(req, res, next) {
        const milkSaleSchema = Joi.object({
            customerName: Joi.string().required(),
            quantity: Joi.number().required(),
            pricePerLiter: Joi.number().required(),
            totalSale: Joi.number().required(),
            date: Joi.date().optional(),
            _id: Joi.string(),
        });

        const { error } = milkSaleSchema.validate(req.body);
        if (error) {
            return next(error);
        }
        const { customerName, quantity, pricePerLiter, totalSale, date, _id } = req.body;
        console.log(_id);
        try {
            const newMilkSale = await MilkSale.findOneAndUpdate({ _id }, { customerName, quantity, pricePerLiter, totalSale, date })
            return res.status(201).json({ newMilkSale });
        } catch (error) {
            return next(error);
        }
    },
    async getAllMilkSales(req, res, next) {
        try {
            const milkSales = await MilkSale.find();
            if (!milkSales || milkSales.length === 0) {
                return res.status(404).json({ message: 'No milk sales found' });
            }

            return res.status(200).json({ milkSales });
        } catch (error) {
            return next(error);
        }
    },
    async getSale(req, res, next) {
        try {
            const milkSales = await MilkSale.findOne({ _id: req.params.id });
            return res.status(200).json({ milkSales });
        } catch (error) {
            return next(error);
        }
    },
    async deleteSale(req, res, next) {
        try {
            const milkSales = await MilkSale.findOneAndDelete({ _id: req.params.id });
            return res.status(200).json({ milkSales });
        } catch (error) {
            return next(error);
        }
    }
};

module.exports = SaleController;

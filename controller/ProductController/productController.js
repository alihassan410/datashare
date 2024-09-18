const Joi = require('joi');
const Product = require('../../models/product');

const productController = {
    addProduct: async (req, res, next) => {
        const productSchema = Joi.object({
            product_name: Joi.string().required(),
            price: Joi.number().required(),
            quantity: Joi.number().required(),
            expiry_date: Joi.date().optional(),
        });

        const { error } = productSchema.validate(req.body);
        if (error) {
            return next(error);
        }

        const { product_name, price, quantity, expiry_date } = req.body;

        try {
            const newProduct = new Product({
                product_name,
                price,
                quantity,
                expiry_date,
            });

            const savedProduct = await newProduct.save();
            return res.status(201).json({ product: savedProduct });
        } catch (error) {
            return next(error);
        }
    },
    updateProduct: async (req, res, next) => {
        const productSchema = Joi.object({
            product_name: Joi.string().required(),
            price: Joi.number().required(),
            quantity: Joi.number().required(),
            expiry_date: Joi.date().optional(),
            _id: Joi.string(),
        });

        const { error } = productSchema.validate(req.body);
        if (error) {
            return next(error);
        }

        const { product_name, price, quantity, expiry_date, _id } = req.body;
        try {
            const newProduct = await Product.findOneAndUpdate({ _id }, {
                product_name,
                price,
                quantity,
                expiry_date,
            });
            console.log(newProduct);
            return res.status(201).json({ message: "Updated successfully" });
        } catch (error) {
            return next(error);
        }
    },
    async getAllProducts(req, res, next) {
        try {
            const products = await Product.find();
            if (!products || products.length === 0) {
                return res.status(404).json({ message: 'No products found' });
            }

            return res.status(200).json({ products });
        } catch (error) {
            return next(error);
        }
    },
    async getProduct(req, res, next) {
        try {
            const products = await Product.findOne({ _id: req.params.id });
            return res.status(200).json({ products });
        } catch (error) {
            return next(error);
        }
    },
    async deleteProduct(req, res, next) {
        try {
            const products = await Product.findOneAndDelete({ _id: req.params.id });
            return res.status(200).json({ products });
        } catch (error) {
            return next(error);
        }
    }
};

module.exports = productController;

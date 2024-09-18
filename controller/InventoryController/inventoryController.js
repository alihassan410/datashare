const Joi = require('joi');
const Inventory = require('../../models/inventory');
const InventoryDTO = require('../../dto/inventory');

const InventoryController = {
    async addingInventory(req, res, next) {
        const InventoryRegisterSchema = Joi.object({
            itemName: Joi.string().valid('Feed', 'Medicine', 'Others').required(),
            price: Joi.number().required(),
            stock: Joi.number().required(),
        });
        const { error } = InventoryRegisterSchema.validate(req.body);

        if (error) {
            return next(error);
        }

        const { itemName, price, stock } = req.body;

        try {
            let inventoryItem = await Inventory.findOne({ itemName });

            if (inventoryItem) {
                inventoryItem = await Inventory.findOneAndUpdate(
                    { itemName },
                    { $inc: { stock, price } },
                    { new: true }
                );
            } else {
                inventoryItem = new Inventory({
                    itemName,
                    price,
                    stock
                });
                await inventoryItem.save();
            }

            const inventoryDTO = new InventoryDTO(inventoryItem);
            return res.status(200).json({ inventory: inventoryDTO });
        } catch (error) {
            return next(error);
        }
    },

    async editInventory(req, res, next) {
        const { id } = req.params;

        const InventoryEditSchema = Joi.object({
            itemName: Joi.string().valid('Feed', 'Medicine', 'Others').required(),
            price: Joi.number().required(),
            stock: Joi.number().required(),
        });
        const { error } = InventoryEditSchema.validate(req.body);

        if (error) {
            return next(error);
        }

        const { itemName, price, stock } = req.body;

        try {
            let updatedInventory = await Inventory.findById(id);

            if (!updatedInventory) {
                return res.status(404).json({ message: 'Inventory item not found' });
            }

            updatedInventory.itemName = itemName;
            updatedInventory.price = price;
            updatedInventory.stock = stock;

            updatedInventory = await updatedInventory.save();

            const inventoryDTO = new InventoryDTO(updatedInventory);
            return res.status(200).json({ inventory: inventoryDTO });
        } catch (error) {
            return next(error);
        }
    },

    async getAllInventory(req, res, next) {
        try {
            const inventoryItems = await Inventory.find({}, 'itemName stock');

            if (!inventoryItems || inventoryItems.length === 0) {
                return res.status(200).json({ inventory: [] });
            }

            const inventoryDTOs = inventoryItems.map(item => new InventoryDTO(item));

            return res.status(200).json({ inventory: inventoryDTOs });
        } catch (error) {
            return next(error);
        }
    },
    async deleteInventory(req, res, next) {
        const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;
        const deleteInventorySchema = Joi.object({
            id: Joi.string().regex(mongodbIdPattern).required(),
        });
        try {
            const { error } = deleteInventorySchema.validate(req.params);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }

            const { id } = req.params;

            const inventory = await Inventory.findById(id);
            if (!inventory) {
                return res.status(404).json({ message: 'Inventory not found' });
            }
            await Inventory.deleteOne({ _id: id });

            return res.status(200).json({ message: 'Inventory deleted successfully' });
        } catch (error) {
            return next(error);
        }
    },
};

module.exports = InventoryController;

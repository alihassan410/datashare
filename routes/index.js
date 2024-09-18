const express = require('express');
const router = express.Router();
const authController = require('../controller/Auth/authController');
const auth = require('../middlewares/auth');
const productController = require('../controller/ProductController/productController');
const employeeController = require('../controller/EmployeeController/employeeController');
const InventoryController = require('../controller/InventoryController/inventoryController');
const MilkController = require('../controller/MilkController/MilkController');
const AnimalController = require('../controller/AnimalController/AnimalController')
const MilkSale = require('../models/milkSale');
const ECommerceSale = require('../models/eCommerceSale');
const LossProfitController = require('../controller/Loss&Profit/Loss&Profit');
const MeatAnimalController = require('../controller/MeatController/MeatController');
const WeightUpdateController = require('../controller/WeightController/WeightUpdateController');
const ExpenseController = require('../controller/ExpenseController/expenseController');
const SaleController = require('../controller/SaleController/saleController');
const diseaseController = require('../controller/DiseaseController/diseaseController');

// Router for Auth
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/EditUser', authController.EditUser);
router.get('/GetUserById/:id', authController.GetUserById);
router.post('/logout', auth, authController.logout);
router.get('/refresh', authController.refresh);
router.get('/dashboard/manage_admin', authController.getAllAdmin);
router.post('/dashboard/manage_admin/add_admin', auth, authController.register);
router.post('/dashboard/manage_admin/edit_admin/:id', auth, authController.editAdmin);
router.delete('/dashboard/manage_admin/delete_admin/:id', auth, authController.deleteAdmin);

// Router for Milk Animal
router.get('/dashboard/manage_animal', auth, AnimalController.getAllAnimals);
router.get('/dashboard/manage_animal/Milk/:id', auth, AnimalController.getAnimalById);
router.put('/dashboard/manage_animal/edit_animal', auth, AnimalController.EditAnimal);
router.post('/dashboard/manage_animal/add_animal', auth, AnimalController.addAnimal);
router.delete('/dashboard/manage_animal/:id', auth, AnimalController.deleteAnimal);

// Router for Employee
router.get('/dashboard/manage_employee', auth, employeeController.getAllEmployees);
router.get('/dashboard/manage_employee/:id', auth, employeeController.getEmployeeById);
router.post('/dashboard/manage_employee/add_employee', auth, employeeController.addEmployee);
router.put('/dashboard/manage_employee/update_employee', auth, employeeController.updateEmployee);
router.delete('/dashboard/manage_employee/update_employee/:id', auth, employeeController.deleteEmployee);

// Router for Product
router.post('/dashboard/manage_product/add_product', auth, productController.addProduct);
router.put('/dashboard/manage_product/update_product', auth, productController.updateProduct);
router.get('/dashboard/manage_product/get_productbyid/:id', auth, productController.getProduct);
router.delete('/dashboard/manage_product/delete_product/:id', auth, productController.deleteProduct);
router.get('/dashboard/manage_product', auth, productController.getAllProducts);

// Router for Meat Animals
router.get('/dashboard/manage_meat', auth, MeatAnimalController.getAllMeatAnimals);
router.get('/dashboard/manage_meat/getbyid/:id', auth, MeatAnimalController.getMeatById);
router.put('/dashboard/manage_meat/update', auth, MeatAnimalController.EditMeatAnimal);
router.post('/dashboard/manage_meat/add_meat', auth, MeatAnimalController.addMeatAnimal);
router.delete('/dashboard/delete_meat/:id', auth, MeatAnimalController.deleteMeatById);
// router.delete('/dashboard/manage_meat/:id', auth, meatAnimalController.deleteMeatAnimal);

// Router for Update Weight
router.post('/dashboard/add_weight', auth, WeightUpdateController.updateWeight);


// Router for Inventory 
router.get('/dashboard/manage_inventory', auth, InventoryController.getAllInventory);
router.post('/dashboard/manage_inventory/add_inventory', auth, InventoryController.addingInventory);
router.put('/dashboard/manage_inventory/edit_inventory', auth, InventoryController.editInventory);
router.delete('/dashboard/manage_inventory/:id', auth, InventoryController.deleteInventory);

// Router for Milk
router.get('/dashboard/manage_milk', auth, MilkController.getAllMilk);
router.get('/dashboard/manage_milk/:id', auth, MilkController.getMilkById);
router.delete('/dashboard/delete_milk/:id', auth, MilkController.deleteMilk);
router.post('/dashboard/manage_milk/add_milk', auth, MilkController.addingMilk);
router.post('/dashboard/manage_milk/EditMilk', auth, MilkController.EditMilk);

// Router for Loss and Profit
router.post('/dashboard/loss_profit', auth, LossProfitController.calculateLossProfit);

// Router for Disease
router.post('/dashboard/disease_detection/disease_by_symptom', auth, diseaseController.detectDisease);
router.post('/dashboard/disease_detection/Adddisease_by_symptom', auth, diseaseController.AdddetectDisease);
// Router for Expense
router.get('/dashboard/manage_expense', auth, ExpenseController.getAllExpenses);
router.post('/dashboard/manage_expense/add_expense', auth, ExpenseController.addExpense);
router.delete('/dashboard/manage_expense/delete_expense/:id', auth, ExpenseController.deleteExpense);

// Router for Sale
router.get('/dashboard/manage_sale', auth, SaleController.getAllMilkSales);
router.post('/dashboard/manage_sale/add_sale', auth, SaleController.addMilkSale);
router.put('/dashboard/manage_sale/update_sale', auth, SaleController.updateMilkSale);
router.get('/dashboard/manage_sale/get_sale/:id', auth, SaleController.getSale);
router.delete('/dashboard/manage_sale/delete_sale/:id', auth, SaleController.deleteSale);



module.exports = router;
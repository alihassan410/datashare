import Home from "./components/pages/Home/Home";
import Login from "./components/pages/Auth/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/pages/Auth/Register";
import { useSelector } from "react-redux";
import Protected from "./components/Protected/Protected";
import WeatherLayout from "./components/pages/Weather/WeatherLayout";
import DashboardLayout from "./components/pages/Dashboard/DashboardLayout";
import AddMilkLayout from "./components/pages/Manage_Milk/AddMilkLayout";
import ShowMilkLayout from "./components/pages/Manage_Milk/ShowMilkLayout";
import AddMeatLayout from "./components/pages/Manage_Meat/AddMeatLayout";
import ShowMeatLayout from "./components/pages/Manage_Meat/ShowMeatLayout";
import ShowAnimalLayout from './components/pages/Manage_Animal/ShowAnimalLayout';
import AddAnimalLayout from './components/pages/Manage_Animal/AddAnimalLayout';
import ShowAdminLayout from "./components/pages/Manage_Admin/ShowAdminLayout";
import AddAdminLayout from "./components/pages/Manage_Admin/AddAdminLayout";
import DiseaseByImageLayout from "./components/pages/Diseases/DiseaseByImageLayout";
import DiseaseBySymptomLayout from "./components/pages/Diseases/DiseaseBySymptomLayout";
import ShowInventoryLayout from "./components/pages/Inventory/ShowInventoryLayout";
import AddInventoryLayout from "./components/pages/Inventory/AddInventoryLayout";
import ShowExpenseLayout from "./components/pages/Manage_Expenses/ShowExpensesLayout";
import AddExpenseLayout from "./components/pages/Manage_Expenses/AddExpensesLayout";
import LossProfitLayout from "./components/pages/Loss&Profit/Loss&ProfitLayout";
import AIModelsLayout from "./components/pages/AI_Models/AIModelsLayout";
import MilkModelLayout from "./components/pages/AI_Models/MilkModelLayout";
import WeightModelLayout from "./components/pages/AI_Models/WeightModelLayout";
import ShowSaleLayout from "./components/pages/Manage_Sale/ShowSaleLayout";
import DiseaseDetectionLayout from "./components/pages/Diseases/DiseaseDetectionLayout";
import AddWeightLayout from './components/pages/Manage_Weight/AddWeightLayout';
import ShowEmployeeLayout from './components/pages/Manage_Employee/ShowEmployeeLayout';
import AddEmployeeLayout from './components/pages/Manage_Employee/AddEmployeeLayout';
import EditAnimalLayout from './components/pages/Manage_Animal/EditAnimalLayout'
import useAutoLogin from "./hooks/useAutoLogin";
import AddProductLayout from "./components/pages/Manage_Product/AddProductLayout";
import ShowProductLayout from "./components/pages/Manage_Product/ShowProductLayout";
import AddSaleLayout from "./components/pages/Manage_Sale/AddSaleLayout";
import NotFound from "./components/pages/Error/NotFound";
import ManageAdminEdit from "./components/pages/Manage_Admin/ManageAdminEdit";
import ContactUs from "./schemas/ContactUs";
import AboutUs from "./schemas/AboutUs";
import AddDiseaseLayout from "./components/pages/Diseases/AddDiseasLayout";
import EditMilkLayout from "./components/pages/Manage_Milk/EditMilkLayout";
import EditMeatLayout from "./components/pages/Manage_Meat/EditmeatLayout";
import EditProduct from "./components/pages/Manage_Product/EditProduct";
import EditProductLayout from "./components/pages/Manage_Product/EditProductLayout";
import EditEmployeeLayout from "./components/pages/Manage_Employee/EditEmployee";
import EditInventoryLayout from "./components/pages/Inventory/EditInventoryLayout";
import EditSaleLayout from "./components/pages/Manage_Sale/EditSalesLayout";
function App() {
  const isAuth = useSelector((state) => state.user.auth);
  const loading = useAutoLogin();


  return loading ? (
    <p className="text-center mt-[100px]">Loading...</p>
  ) : (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <Home />
          }
        >
        </Route>
        <Route
          path="/AboutUs"
          exact
          element={
            <AboutUs />
          }
        >
        </Route>
        <Route
          path="/ContactUs"
          exact
          element={
            <ContactUs />
          }
        >
        </Route>
        <Route
          path="login"
          exact
          element={
            <Login />
          }
        >
        </Route>
        <Route
          path="register"
          exact
          element={
            <Register />
          }
        >
        </Route>
        <Route
          path="*"
          element={
            <NotFound />
          }
        >
        </Route>
        <Route
          path="dashboard"
          exact
          element={
            <Protected isAuth={isAuth}>
              <DashboardLayout />
            </Protected>
          }
        ></Route>
        <Route
          path="dashboard/manage_milk"
          exact
          element={
            <Protected isAuth={isAuth}>
              <ShowMilkLayout />
            </Protected>
          }
        ></Route>
        <Route
          path="dashboard/Edit_milk/:id"
          exact
          element={
            <Protected isAuth={isAuth}>
              <EditMilkLayout />
            </Protected>
          }
        ></Route>
        <Route
          path="dashboard/manage_milk/add_milk"
          exact
          element={
            <Protected isAuth={isAuth}>
              <AddMilkLayout />
            </Protected>
          }
        ></Route>
        <Route
          path="dashboard/add_weight"
          exact
          element={
            <Protected isAuth={isAuth}>
              <AddWeightLayout />
            </Protected>
          }
        ></Route>
        <Route
          path="dashboard/manage_meat"
          exact
          element={
            <Protected isAuth={isAuth}>
              <ShowMeatLayout />
            </Protected>
          }
        ></Route>
        <Route
          path="dashboard/manage_meat/add_meat"
          exact
          element={
            <Protected isAuth={isAuth}>
              <AddMeatLayout />
            </Protected>
          }
        ></Route>
        <Route
          path="dashboard/manage_meat/Edit_meat/:id"
          exact
          element={
            <Protected isAuth={isAuth}>
              <EditMeatLayout />
            </Protected>
          }
        ></Route>
        <Route
          path="dashboard/manage_animal"
          exact
          element={
            <Protected isAuth={isAuth}>
              <ShowAnimalLayout />
            </Protected>
          }
        ></Route>
        <Route
          path="dashboard/manage_animal/add_animal"
          exact
          element={
            <Protected isAuth={isAuth}>
              <AddAnimalLayout />
            </Protected>
          }
        ></Route>
        <Route
          path="dashboard/manage_animal/edit_animal/:id"
          exact
          element={
            <Protected isAuth={isAuth}>
              <EditAnimalLayout />
            </Protected>
          }
        ></Route>
        <Route
          path="dashboard/manage_admin"
          exact
          element={
            <Protected isAuth={isAuth}>
              <ShowAdminLayout />
            </Protected>
          }
        ></Route>
        <Route
          path="dashboard/manage_admin/add_admin"
          exact
          element={
            <Protected isAuth={isAuth}>
              <AddAdminLayout />
            </Protected>
          }
        ></Route>
        <Route
          path="/dashboard/manage_admin/edit_admin/:id"
          exact
          element={
            <Protected isAuth={isAuth}>
              <ManageAdminEdit />
            </Protected>
          }
        ></Route>
        <Route
          path="dashboard/manage_product"
          exact
          element={
            <Protected isAuth={isAuth}>
              <ShowProductLayout />
            </Protected>
          }
        ></Route>
        <Route
          path="dashboard/manage_product/Edit/:id"
          exact
          element={
            <Protected isAuth={isAuth}>
              <EditProductLayout />
            </Protected>
          }
        ></Route>
        <Route
          path="dashboard/manage_product/add_product"
          exact
          element={
            <Protected isAuth={isAuth}>
              <AddProductLayout />
            </Protected>
          }
        ></Route>
        <Route
          path="dashboard/disease_detection"
          exact
          element={
            <Protected isAuth={isAuth}>
              <DiseaseDetectionLayout />
            </Protected>
          }
        ></Route>
        <Route
          path="dashboard/disease_detection/disease_by_image"
          exact
          element={
            <Protected isAuth={isAuth}>
              <DiseaseByImageLayout />
            </Protected>
          }
        ></Route>
        <Route
          path="dashboard/disease_detection/disease_by_symptom"
          exact
          element={
            <Protected isAuth={isAuth}>
              <DiseaseBySymptomLayout />
            </Protected>
          }
        ></Route>
        <Route
          path="dashboard/disease_detection/addDiseas"
          exact
          element={
            <Protected isAuth={isAuth}>
              <AddDiseaseLayout />
            </Protected>
          }
        ></Route>
        <Route
          path="dashboard/manage_inventory"
          exact
          element={
            <Protected isAuth={isAuth}>
              <ShowInventoryLayout />
            </Protected>
          }
        ></Route>
        <Route
          path="dashboard/manage_inventory/edit/:id"
          exact
          element={
            <Protected isAuth={isAuth}>
              <EditInventoryLayout />
            </Protected>
          }
        ></Route>
        <Route
          path="dashboard/manage_inventory/add_inventory"
          exact
          element={
            <Protected isAuth={isAuth}>
              <AddInventoryLayout />
            </Protected>
          }
        ></Route>
        <Route
          path="dashboard/weather"
          exact
          element={
            <Protected isAuth={isAuth}>
              <WeatherLayout />
            </Protected>
          }
        ></Route>
        <Route
          path="dashboard/manage_expense"
          exact
          element={
            <Protected isAuth={isAuth}>
              <ShowExpenseLayout />
            </Protected>
          }
        ></Route>
        <Route
          path="dashboard/manage_expense/add_expense"
          exact
          element={
            <Protected isAuth={isAuth}>
              <AddExpenseLayout />
            </Protected>
          }
        ></Route>
        <Route
          path="dashboard/loss_profit"
          exact
          element={
            <Protected isAuth={isAuth}>
              <LossProfitLayout />
            </Protected>
          }
        ></Route>
        <Route
          path="dashboard/ai_models"
          exact
          element={
            <Protected isAuth={isAuth}>
              <AIModelsLayout />
            </Protected>
          }
        ></Route>
        <Route
          path="dashboard/ai_models/milk_model"
          exact
          element={
            <Protected isAuth={isAuth}>
              <MilkModelLayout />
            </Protected>
          }
        ></Route>
        <Route
          path="dashboard/ai_models/weight_model"
          exact
          element={
            <Protected isAuth={isAuth}>
              <WeightModelLayout />
            </Protected>
          }
        ></Route>
        <Route
          path="dashboard/manage_sale"
          exact
          element={
            <Protected isAuth={isAuth}>
              < ShowSaleLayout />
            </Protected>
          }
        ></Route>
        <Route
          path="dashboard/manage_sale/add_sale"
          exact
          element={
            <Protected isAuth={isAuth}>
              < AddSaleLayout />
            </Protected>
          }
        ></Route>
        <Route
          path="dashboard/manage_sale/edit_sale/:id"
          exact
          element={
            <Protected isAuth={isAuth}>
              < EditSaleLayout />
            </Protected>
          }
        ></Route>
        <Route
          path="dashboard/manage_employee"
          exact
          element={
            <Protected isAuth={isAuth}>
              < ShowEmployeeLayout />
            </Protected>
          }
        ></Route>
        <Route
          path="dashboard/manage_employee/edit/:id"
          exact
          element={
            <Protected isAuth={isAuth}>
              < EditEmployeeLayout />
            </Protected>
          }
        ></Route>
        <Route
          path="dashboard/manage_employee/add_employee"
          exact
          element={
            <Protected isAuth={isAuth}>
              <AddEmployeeLayout />
            </Protected>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

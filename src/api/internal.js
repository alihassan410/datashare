import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_INTERNAL_API_PATH,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// API's for Auth
export const login = async (data) => {
  let response;
  try {
    response = await api.post("/login", data);
  } catch (error) {
    return error;
  }
  return response;
};
export const GetUserByIdFront = async (data) => {
  try {
    let response = await api.get(`/GetUserById/${data}`);
    return response.data
  } catch (error) {
    console.log(error)
  }
}
export const EditUser = async (data) => {
  let response;
  try {
    response = await api.post("/EditUser", data);
  } catch (error) {
    return error;
  }
  return response;
};
export const register = async (data) => {
  let response;

  try {
    response = await api.post("/register", data);
  } catch (error) {
    return error;
  }

  return response;
};

export const getAllAdmin = async () => {
  let response;

  try {
    response = await api.get("/dashboard/manage_admin");
  } catch (error) {
    return error;
  }

  return response;
};

export const addAdmin = async (data) => {
  let response;

  try {
    response = await api.post("/dashboard/manage_admin/add_admin", data);
  } catch (error) {
    return error;
  }

  return response;
};

export const logout = async () => {
  let response;
  try {
    response = await api.post("/dashboard/logout");
  } catch (error) {
    return error;
  }

  return response;
};

export const editAdmin = async (adminId, data) => {
  let response;

  try {
    response = await api.put(`/dashboard/manage_admin/edit_admin/${adminId}`, data);
  } catch (error) {
    return error;
  }

  return response;
};

export const deleteAdmin = async (adminId) => {
  let response;

  try {
    response = await api.delete(`/dashboard/manage_admin/delete_admin/${adminId}`);
  } catch (error) {
    return error;
  }

  return response;
};

// API's for Milk
export const getAllMilk = async () => {
  let response;

  try {
    response = await api.get("/dashboard/manage_milk");
  } catch (error) {
    return error;
  }

  return response;
};
export const getMilkById = async (id) => {
  let response;
  try {
    response = await api.get("/dashboard/manage_milk/" + id);
  } catch (error) {
    return error;
  }
  return response;
};
export const EditMilkClient = async (data) => {
  let response;
  try {
    response = await api.post("/dashboard/manage_milk/EditMilk", data);
  } catch (error) {
    return error;
  }
  return response;
};
export const deleteMilk = async (id) => {
  let response;
  try {
    response = await api.delete("/dashboard/delete_milk/" + id);
  } catch (error) {
    return error;
  }
  return response;
};
export const getAnimalByIdInternal = async (id) => {
  let response;
  try {
    response = await api.get("/dashboard/manage_meat/getbyid/" + id);
  } catch (error) {
    return error;
  }
  return response;
};
export const EditMeatAnimal = async (data) => {
  let response;
  try {
    response = await api.put("/dashboard/manage_meat/update", data);
  } catch (error) {
    return error;
  }
  return response;
};
export const addMilk = async (data) => {
  let response;

  try {
    response = await api.post("/dashboard/manage_milk/add_milk", data);
  } catch (error) {
    return error;
  }

  return response;
};

// API's for Weight
export const addWeight = async (data) => {
  let response;

  try {
    response = await api.post("/dashboard/add_weight", data);
  } catch (error) {
    return error;
  }

  return response;
};

// API's for Meat Animal
export const addMeatAnimal = async (data) => {
  let response;

  try {
    response = await api.post("/dashboard/manage_meat/add_meat", data);
  } catch (error) {
    return error;
  }

  return response;
};

export const getAllMeatAnimals = async () => {
  let response;

  try {
    response = await api.get("/dashboard/manage_meat");
  } catch (error) {
    return error;
  }

  return response;
};

export const deleteMeatAnimal = async (id) => {
  let response;

  try {
    response = await api.delete(`/dashboard/manage_animal/${id}`);
  } catch (error) {
    return error;
  }

  return response;
};
export const getMilkAnimalById = async (id) => {
  let response;
  try {
    response = await api.get(`/dashboard/manage_animal/Milk/${id}`);
  } catch (error) {
    return error;
  }

  return response;
};
export const deleteMeatAnimalReal = async (id) => {
  let response;

  try {
    response = await api.delete(`/dashboard/delete_meat/${id}`);
  } catch (error) {
    return error;
  }
  return response;
};
// API's for Animal
export const addAnimal = async (data) => {
  let response;

  try {
    response = await api.post("/dashboard/manage_animal/add_animal", data);
  } catch (error) {
    return error;
  }

  return response;
};

export const getAnimalById = async (id) => {
  let response;

  try {
    response = await api.get(`/dashboard/manage_animal/${id}`);
  } catch (error) {
    return error;
  }

  return response;
};

export const editAnimal = async (data) => {
  let response;

  try {
    response = await api.put(`/dashboard/manage_animal/edit_animal`, data);
  } catch (error) {
    return error;
  }

  return response;
};

export const getAllAnimal = async () => {
  let response;

  try {
    response = await api.get("/dashboard/manage_animal");
  } catch (error) {
    return error;
  }

  return response;
};

export const deleteAnimal = async (id) => {
  let response;

  try {
    response = await api.delete(`/dashboard/manage_animal/${id}`);
  } catch (error) {
    return error;
  }

  return response;
};

// API's for Product
export const getAllProducts = async () => {
  let response;

  try {
    response = await api.get('/dashboard/manage_product');
  } catch (error) {
    return error;
  }

  return response;
};

export const uploadImage = (formData) => {
  return axios.post("/dashboard/manage_product/add_product", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const addProduct = async (data) => {
  let response;

  try {
    response = await api.post('/dashboard/manage_product/add_product', data);
  } catch (error) {
    return error;
  }

  return response;
};

export const updateProduct = async (data) => {
  let response;

  try {
    response = await api.put('/dashboard/manage_product/update_product', data);
  } catch (error) {
    return error;
  }

  return response;
};

export const deleteProduct = async (id) => {
  let response;

  try {
    response = await api.delete('/dashboard/manage_product/delete_product/' + id);
  } catch (error) {
    return error;
  }

  return response;
};
export const getProductById = async (id) => {
  let response;
  try {
    response = await api.get('/dashboard/manage_product/get_productbyid/' + id);
  } catch (error) {
    return error;
  }

  return response;
};
// API's for Employee
export const addEmployee = async (data) => {
  let response;

  try {
    response = await api.post("/dashboard/manage_employee/add_employee", data);
  } catch (error) {
    return error;
  }

  return response;
};
export const updateEmployee = async (data) => {
  let response;

  try {
    response = await api.put("/dashboard/manage_employee/update_employee", data);
  } catch (error) {
    return error;
  }

  return response;
};
export const deleteEmployeeByID = async (id) => {
  let response;
  console.log("Check", id);
  try {
    response = await api.delete("/dashboard/manage_employee/update_employee/" + id);
  } catch (error) {
    return error;
  }

  return response;
};
export const getAllEmployees = async () => {
  let response;

  try {
    response = await api.get("/dashboard/manage_employee");
  } catch (error) {
    return error;
  }

  return response;
};
export const getEmployeeById = async (id) => {
  let response;

  try {
    response = await api.get("/dashboard/manage_employee/" + id);
  } catch (error) {
    return error;
  }

  return response;
};
export const deleteEmployee = async (id) => {
  let response;

  try {
    response = await api.delete(`/dashboard/manage_employee/${id}`);
  } catch (error) {
    return error;
  }

  return response;
};
// API's for Disease Detection
export const detectDiseaseBySymptoms = async (symptoms) => {
  let response;
  try {
    response = await api.post("dashboard/disease_detection/disease_by_symptom", { symptoms });
  } catch (error) {
    return error;
  }
  console.log(response, symptoms);
  return response;
};
export const AddDiseaseBySymptoms = async (symptoms) => {
  let response;
  try {
    response = await api.post("dashboard/disease_detection/Adddisease_by_symptom", { symptoms });
  } catch (error) {
    return error;
  }
  console.log(response, symptoms);
  return response;
};
// API's for Inventory
export const addInventory = async (data) => {
  let response;

  try {
    response = await api.post("/dashboard/manage_inventory/add_inventory", data);
  } catch (error) {
    return error;
  }

  return response;
};

export const getAllInventory = async () => {
  let response;

  try {
    response = await api.get("/dashboard/manage_inventory");
  } catch (error) {
    return error;
  }

  return response;
};

export const deleteInventory = async (id) => {
  let response;

  try {
    response = await api.delete(`/dashboard/manage_inventory/${id}`);
  } catch (error) {
    return error;
  }

  return response;
};

// API's for Expense
export const getAllExpense = async () => {
  let response;

  try {
    response = await api.get("/dashboard/manage_expense");
  } catch (error) {
    return error;
  }

  return response;
};

export const addExpense = async (data) => {
  let response;

  try {
    response = await api.post("/dashboard/manage_expense/add_expense", data);
  } catch (error) {
    return error;
  }

  return response;
};
export const deleteExpense = async (id) => {
  let response;

  try {
    response = await api.delete("/dashboard/manage_expense/delete_expense/" + id);
  } catch (error) {
    return error;
  }

  return response;
};
// API's for Sale
export const getAllSales = async () => {
  let response;

  try {
    response = await api.get("/dashboard/manage_sale");
  } catch (error) {
    return error;
  }

  return response;
};

export const addSale = async (data) => {
  let response;

  try {
    response = await api.post("/dashboard/manage_sale/add_sale", data);
  } catch (error) {
    return error;
  }

  return response;
};

export const getSale = async (id) => {
  let response;

  try {
    response = await api.get("/dashboard/manage_sale/get_sale/" + id);
  } catch (error) {
    return error;
  }

  return response;
};
export const updateSale = async (data) => {
  let response;
  try {
    response = await api.put("/dashboard/manage_sale/update_sale", data);
  } catch (error) {
    return error;
  }

  return response;
};

export const deleteSale = async (id) => {
  let response;

  try {
    response = await api.delete("/dashboard/manage_sale/delete_sale/" + id);
  } catch (error) {
    return error;
  }

  return response;
};
// API's for Loss&Profit
export const getLossProfit = async (data) => {
  let response;

  try {
    response = await api.post("/dashboard/loss_profit", data);
  } catch (error) {
    return error;
  }

  return response;
};

// End all API's

api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalReq = error.config;
    const errorMessage = error.response && error.response.data && error.response.data.message;

    if (
      errorMessage === 'Unauthorized' &&
      (error.response.status === 401 || error.response.status === 500) &&
      originalReq &&
      !originalReq._isRetry
    ) {
      originalReq._isRetry = true;

      try {
        await axios.get(`${process.env.REACT_APP_INTERNAL_API_PATH}/refresh`, {
          withCredentials: true,
        });

        return api.request(originalReq);
      } catch (error) {
        return error;
      }
    }
    throw error;
  }
);
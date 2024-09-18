import * as yup from "yup";

const cowSchema = yup.object().shape({
    cow_code: yup.number().max(30).required("Code is required"),
    breed: yup.string().min(5).max(30).required("Breed is required"),
    weight: yup.number().required("Weight is required"),
    avg_milk: yup.number().required('Avg milk is required'),
    purchase_price: yup.number().required('Purchase price is required'),
    with_calf: yup.string().required(),
    age: yup.number().required('Age is required'),
    milking_status: yup.string().required('Milking status is required'),
    sex: yup.string().required('Sex is required'),
    disease_history: yup.string().required('Disease history is required if any'),
    total_calf: yup.number().required('Total calf is required'),
    death_date: yup.date().notRequired(),
    calving_history: yup.string().required('Calving history is required if any'),
    purchase_date: yup.date().required('Purchase date is required'),
    sale_date: yup.date().notRequired(),
    expected_delivery_date: yup.date().notRequired(),
});

export default cowSchema;
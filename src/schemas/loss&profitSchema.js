import * as Yup from 'yup';

const lossProfitSchema = Yup.object().shape({
  fromDate: Yup.date().required('From Date is required'),
  toDate: Yup.date().required('To Date is required')
});

export default lossProfitSchema;

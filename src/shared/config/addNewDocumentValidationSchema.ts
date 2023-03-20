import * as yup from 'yup';

export const addNewDocumentValidationSchema = yup.object({
  companySignatureName: yup.string().required('Company signature name is required'),
  documentName: yup.string().required('Document name is required'),
  documentStatus: yup.string().required('Document Status is required'),
  documentType: yup.string().required('Document type is required'),
  employeeNumber: yup.string().required('Employee number is required'),
  employeeSignatureName: yup.string().required('Employee signature name is required')
});

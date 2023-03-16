export interface User {
  id?: string;
  companySigDate: string;
  companySignatureName: string;
  documentName: string;
  documentStatus: string;
  documentType: string;
  employeeNumber: string;
  employeeSigDate: string;
  employeeSignatureName: string;
}

export interface UserSchema {
  userData: Array<User>;
  isLoading: boolean;
  error?: string;
}

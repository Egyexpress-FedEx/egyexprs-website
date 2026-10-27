export interface RegisterForGetAccData {
AccountNo: string;
UserID: string;
UserPwd: string;
}
export interface accResponse {
  Code: string
  CustomerDetails: CustomerDetails
  Description: string
}

export interface CustomerDetails {
  cl_AWBNoFr: any
  cl_AWBNoTo: any
  cl_AccCode: string
  cl_AccType: any
  cl_Active: any
  cl_AgentCode: any
  cl_AlertType: any
  cl_BankName: any
  cl_Blocked: any
  cl_BudgetAmt: any
  cl_BudgetType: any
  cl_CPerson: string
  cl_ContractAmt: any
  cl_CrDays: any
  cl_CrLimit: any
  cl_CreatedUser: any
  cl_Currency: any
  cl_CustAMail: any
  cl_CustAddress: string
  cl_CustAddress1: string
  cl_CustAddress2: string
  cl_CustAlert: any
  cl_CustCity: string
  cl_CustCode: string
  cl_CustCountry: string
  cl_CustEMail: string
  cl_CustFax: string
  cl_CustLocation: string
  cl_CustMobile: string
  cl_CustName: string
  cl_CustNote: string
  cl_CustPOBox: string
  cl_CustPhone: string
  cl_CustType: any
  cl_CustWebSite: any
  cl_Department: any
  cl_Designation: any
  cl_DivCode: any
  cl_ExportName: any
  cl_FSC: any
  cl_GPA: any
  cl_Hub: any
  cl_LicenseNo: any
  cl_OprTiming: any
  cl_PayMode: any
  cl_Route: any
  cl_SManCode: any
  cl_SaleArea: any
  cl_SignDate: any
  cl_Star: any
  cl_TariffAc: string
  cl_TaxRegNo: any
  cl_VAT: any
  cl_iConnect: any
}
 // city work 

 export interface getCity{
    Filter: string
    UserID: string
    UserPwd: string
 }

 export interface CityResponse{
  Code: string
  Description: string
  Response: Response[]
}

export interface Response {
  cl_AreaCode: string
  cl_CodeID: string
  cl_CodeName: string
  cl_CodeType: any
  cl_TelStart: any
  cl_ZipStart: any
}
///

export interface Request {
  Database: string;
  OnlineUserMastData: OnlineUserMastData;
  UserID: string;
  UserPwd: string;
}

export interface OnlineUserMastData {
  cl_Accno: string;
  cl_PWDAC: string;
  cl_Active: string;
  cl_UserID: string;
  cl_UserTag: string | null;
  cl_UserType: string;
  cl_UserName: string;
  cl_CoCode: string | null;
  cl_CustName: string;
  cl_CPerson: string;
  cl_CustAddress: string;
  cl_CustAddress1: string;
  cl_CustAddress2: string | null;
  cl_CustCity: string;
  cl_CustCountry: string;
  cl_CustPhone: string;
  cl_CustFax: string;
  cl_CustMobile: string;
  cl_CustEMail: string;
  cl_GeoLoc: string;
  cl_CustCityName: string;
  cl_CustCountryName: string;
  cl_SignDate: string;
}
export interface responseaafterregist {
  Code: string
  Description: string
}

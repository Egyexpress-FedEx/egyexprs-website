export interface ProductClassificationRequest {
  Database: string;
  Filter: string;
  MasterType: 'SERV';
  UserId: string;
  UserPwd: string;
}

export interface ProductClassificationResponse {
  Code: string;
  Description: string;
  Response: ProductClassificationItem[];
}

export interface ProductClassificationItem {
  cl_Amt1: number | null;
  cl_Amt2: number | null;
  cl_Category: string | null;
  cl_CodeID: string;
  cl_CodeName: string;
  cl_CodeType: string | null;
  cl_Desc1: string | null;
  cl_Desc2: string | null;
  cl_Desc3: string | null;
  cl_EffectDate: string | null;
  cl_IsActive: boolean | null;
  cl_Note: string | null;
}

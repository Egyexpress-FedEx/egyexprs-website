export interface ProductListRequest {
  MasterType: 'PROD';
  UserId: string;
  UserPwd: string;
}

export interface ProductListResponse {
  Code: string;
  Description: string;
  Response: ProductItem[];
}

export interface ProductItem {
  cl_CodeID: string;
  cl_CodeName: string;
}

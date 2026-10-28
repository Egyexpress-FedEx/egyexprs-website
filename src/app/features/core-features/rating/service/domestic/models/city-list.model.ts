export interface CityListRequest {
  Filter: string;
  UserID: string;
  UserPwd: string;
}

export interface CityListResponse {
  Code: string;
  Description: string;
  Response: CityItem[];
}

export interface CityItem {
  cl_AreaCode: string;
  cl_CodeID: string;
  cl_CodeName: string;
}

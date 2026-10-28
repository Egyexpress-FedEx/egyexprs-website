export interface CountryListRequest {
  Filter: string;
  UserID: string;
  UserPwd: string;
}

export interface CountryListResponse {
  Code: string;
  Description: string;
  Response: CountryItem[];
}

export interface CountryItem {
  cl_AreaCode: string | null;
  cl_CodeID: string;
  cl_CodeName: string;
  cl_CodeType: string | null;
  cl_TelStart: string | null;
  cl_ZipStart: string | null;
}

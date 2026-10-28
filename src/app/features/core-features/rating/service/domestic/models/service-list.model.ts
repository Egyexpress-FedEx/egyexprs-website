export interface ServiceListRequest {
  Filter: string;
  MasterType: 'SERV';
  UserId: string;
  UserPwd: string;
}

export interface ServiceListResponse {
  Code: string;
  Description: string;
  Response: ServiceItem[];
}

export interface ServiceItem {
  cl_CodeID: string;
  cl_CodeName: string;
}

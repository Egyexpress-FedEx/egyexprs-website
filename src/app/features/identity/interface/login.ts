export interface loginRequest {
  UserID: string;
  UserPwd: string;
}
export interface LoginResponse {
  Code: string;
  Description: string;
  UserCredentials: UserCredentials | null;
}

export interface UserCredentials {
  CoCode: string;
  DivCode: string;
  ShipmentType: string;
  UserID: string;
  UserName: string;
  UserPWD: string;
  UserTag: string;
  UserType: string;
}

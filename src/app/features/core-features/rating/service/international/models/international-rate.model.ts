export interface InternationalPackageData {
  cl_AWBNo: string;
  cl_PkgId: string;
  cl_PCs: string;
  cl_DimL: string;
  cl_DimW: string;
  cl_DimH: string;
}

export interface InternationalRateRequest {
  UserID: string;
  UserPwd: string;
  AccountNo: string;
  ActiveDataBase: string;
  Orgn_Code: string;
  Dest_Code: string;
  Serv_Type: string;
  Prod_Type: string;
  Ship_Wght: number;
  Dimension: string;
  Sl1: string;
  Sl2: string;
  Sl3: number;
  AWBPackageData: InternationalPackageData[];
}

export interface InternationalRateApiResponse {
  Description: string;
  JasonString: string;
  code: string;
}

export interface InternationalRateCharge {
  ChargesDescription: string;
  Amount: number;
  AmountBC: number;
  slno: number;
}

export interface InternationalRateResult {
  charges: InternationalRateCharge[];
  totalUsd: number;
  totalEgp: number;
}

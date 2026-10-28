export interface RateQueryFields {
  Orgn_Code: string;
  Dest_Code: string;
  Serv_Type: string;
  Prod_Type: string;
  Ship_Wght: number;
}

export interface RateQueryResponse {
  Description: string;
  JasonString: string;
  code: string;
}

export interface DomesticRateBreakdown {
  TrfAmnt: number;
  FSCAmnt: number;
  GPAAmnt: number;
  TaxAmnt: number;
  Total: number;
}

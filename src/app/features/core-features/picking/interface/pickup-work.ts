export interface PickingRequest {
  UserID: string
  UserPwd: string
  BookingData: BookingData
}

export interface BookingData {
  cl_BookingRefNo: string | null
  cl_BookingPrefix: string
  cl_BookingDate: string
  cl_BookingTime: string
  cl_Origin: string
  cl_Destination: string
  cl_ProductType: string | null
  cl_ServiceType: string
  cl_VehicleType: string
  cl_RefNo: string | null
  cl_NoofPieces: string
  cl_NoofShipments: string
  cl_ShipmentWeight: string
  cl_CashOnPickup: string | null
  cl_ShipmentCash: string | null
  cl_ShipmentValue: string | null
  cl_ShipmentValueCurrency: string | null
  cl_PickupReadyDate: string
  cl_PickupReadyTime: string
  cl_PickupBeforeTime: string
  cl_PickupInstruction: string
  cl_CustCode: string
  cl_CustName: string
  cl_BookingContactPerson: string
  cl_BookingPhone1: string
  cl_BookingPhone2: string
  cl_BookingMobile: string
  cl_BookingEmail: string
  cl_BookingAddress1: string
  cl_BookingAddress2: string
  cl_BookingCity: string
  cl_BookingCountry: string
  cl_SendersName: string
  cl_SendersContactPerson: string
  cl_SendersPhone1: string
  cl_SendersPhone2: string
  cl_SendersMobile: string
  cl_SendersEmail: string
  cl_SendersAddress1: string
  cl_SendersAddress2: string
  cl_SendersPinCode: string
  cl_SendersCity: string
  cl_SendersCountry: string
  cl_SendersMakaniNo: string
  cl_ReceiversName: string
  cl_ReceiversContactPerson: string
  cl_ReceiversPhone1: string
  cl_ReceiversPhone2: string
  cl_ReceiversMobile: string
  cl_ReceiversEmail: string
  cl_ReceiversAddress1: string
  cl_ReceiversAddress2: string
  cl_ReceiversPinCode: string
  cl_ReceiversCity: string
  cl_ReceiversCountry: string
  cl_ReceiversMakaniNo: string
  cl_PickupLandMark: string
  cl_PickupBranch: string | null
  cl_ThirdPartyPickup: string | null
  cl_ThirdPartyCode: string | null
  cl_InsShipment: string | null
  cl_InsProvider: string | null
  cl_InsAmount: string | null
  cl_Prioirty: string | null
  cl_PickupDone: string | null
  cl_PickupAllocated: string | null
  cl_Route: string | null
  cl_Courier: string | null
  cl_PSNo: string | null
  cl_SMSBooker: string | null
  cl_SMSShipper: string | null
  cl_SMSConsignee: string | null
  cl_SMSCourier: string | null
  cl_EmailBooker: string | null
  cl_EmailShipper: string | null
  cl_EmailConsignee: string | null
  cl_CreatedTime: string | null
  cl_CreatedBy: string | null
  cl_Cancelled: string | null
  cl_CancelledBy: string | null
  cl_CancelType: string | null
  cl_CancelReason: string | null
  cl_PRemarks: string
}
export interface pickupRes {
  BookingNo: string
  Code: string
  Description: string
}

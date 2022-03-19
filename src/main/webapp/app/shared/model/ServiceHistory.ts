export interface IServiceHistory {
  id?: number;
  additionalInformation?: string;
  empId?: number;
  empName?: string;
  endTime?: string;
  paymentRate?: number;
  serviceType?: string;
  startTime?: string;
  status?: string;
  storeId?: number;
  storeName?: string;
  totalPayment?: string;
  createdDate?: string;
  updatedDate?: string;
  storeRating?: number;
  storeRatingComment?: string;
  empRating?: number;
  empRatingComment?: string;
}

export class ServiceHistory implements IServiceHistory {
  constructor(
    public id?: number,
    public additionalInformation?: string,
    public empId?: number,
    public empName?: string,
    public endTime?: string,
    public paymentRate?: number,
    public serviceType?: string,
    public startTime?: string,
    public status?: string,
    public storeId?: number,
    public storeName?: string,
    public totalPayment?: string,
    public createdDate?: string,
    public updatedDate?: string,
    public storeRating?: number,
    public storeRatingComment?: string,
    public empRating?: number,
    public empRatingComment?: string
  ) {}
}

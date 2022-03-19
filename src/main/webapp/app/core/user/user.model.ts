export interface IUser {
  id?: any;
  login?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  activated?: boolean;
  langKey?: string;
  authorities?: string[];
  createdBy?: string;
  createdDate?: Date;
  lastModifiedBy?: string;
  lastModifiedDate?: Date;
  password?: string;
  secondaryImages?: string;
  description?: string;
  mobile?: string;
  personalId?: string;
  personalIdImage?: string;
  driverLicenseMotorbikeFront?: string;
  driverLicenseMotorbikeBack?: string;
  driverLicenseCarFront?: string;
  driverLicenseCarBack?: string;
  drinkLevel?: number;
  study?: number;
  lang?: number;
  imageUrl?: string;
  sex?: number;
  expiredDate?: Date;
  rating?: number;
  paymentRate?: number;
  totalPayment?: number;
}

export class User implements IUser {
  constructor(
    public id?: any,
    public login?: string,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public activated?: boolean,
    public langKey?: string,
    public authorities?: string[],
    public createdBy?: string,
    public createdDate?: Date,
    public lastModifiedBy?: string,
    public lastModifiedDate?: Date,
    public password?: string,
    public secondaryImages?: string,
    public description?: string,
    public mobile?: string,
    public personalId?: string,
    public personalIdImage?: string,
    public personalIdImageBack?: string,
    public driverLicenseMotorbikeFront?: string,
    public driverLicenseMotorbikeBack?: string,
    public driverLicenseCarFront?: string,
    public driverLicenseCarBack?: string,
    public drinkLevel?: number,
    public study?: number,
    public lang?: number,
    public imageUrl?: string,
    public sex?: number,
    public expiredDate?: Date,
    public rating?: number,
    public paymentRate?: number,
    public totalPayment?: number
  ) {}
}

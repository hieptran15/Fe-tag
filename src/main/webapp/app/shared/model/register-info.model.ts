import { Moment } from 'moment';

export interface IRegisterInfo {
  id?: number;
  name?: string;
  image?: string;
  secondaryImages?: string;
  description?: string;
  role?: string;
  mobile?: string;
  personalId?: string;
  personalIdImage?: string;
  personalIdImageBack?: string;
  driverLicenseMotorbikeFront?: string;
  driverLicenseMotorbikeBack?: string;
  driverLicenseCarFront?: string;
  driverLicenseCarBack?: string;
  drinkLevel?: number;
  study?: number;
  lang?: number;
  birthYear?: number;
  username?: string;
  sex?: number;
  email?: string;
  createdAt?: Moment;
  updatedAt?: Moment;
  paymentRate?: number;
  city?: string;
  district?: number;
  districtName?: string;
  ward?: number;
  wardName?: string;
}

export class RegisterInfo implements IRegisterInfo {
  constructor(
    public id?: number,
    public name?: string,
    public image?: string,
    public secondaryImages?: string,
    public description?: string,
    public role?: string,
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
    public birthYear?: number,
    public username?: string,
    public sex?: number,
    public email?: string,
    public paymentRate?: number,
    public city?: string,
    public district?: number,
    public districtName?: string,
    public ward?: number,
    public wardName?: string
  ) {}
}

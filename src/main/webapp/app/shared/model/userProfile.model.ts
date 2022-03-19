import { Moment } from 'moment';
import { ICountry } from './country.model';
import { ICity } from './city.model';
import { IDistrict } from './district.model';
import { IEthnic } from './ethnic.model';

export interface IProfile {
  activated?: boolean;
  address?: string;
  bankAccount?: string;
  bankName?: string;
  city?: ICity;
  country?: ICountry;
  email?: string;
  ethnic?: IEthnic;
  district?: IDistrict;
  firstName?: string;
  id?: number;
  identification?: string;
  imageUrl?: string;
  isSysAdmin?: boolean;
  langKey?: string;
  lastName?: string;
  login?: string;
  partnerId?: string;
  phone?: string;
  postalCode?: string;
  profilePic?: string;
  rating?: number;
  resetDate?: string;
  sex?: number;
  tenantId?: string;
  totalMoney?: string;
  ward?: string;
  yearOfBirth?: number;
}

export class Profile implements IProfile {
  constructor(
    public activated?: boolean,
    public address?: string,
    public bankAccount?: string,
    public bankName?: string,
    public city?: ICity,
    public country?: ICountry,
    public email?: string,
    public ethnic?: IEthnic,
    public district?: IDistrict,
    public firstName?: string,
    public id?: number,
    public identification?: string,
    public imageUrl?: string,
    public isSysAdmin?: boolean,
    public langKey?: string,
    public lastName?: string,
    public login?: string,
    public partnerId?: string,
    public phone?: string,
    public postalCode?: string,
    public profilePic?: string,
    public rating?: number,
    public resetDate?: string,
    public sex?: number,
    public tenantId?: string,
    public totalMoney?: string,
    public ward?: string,
    public yearOfBirth?: number
  ) {}
}

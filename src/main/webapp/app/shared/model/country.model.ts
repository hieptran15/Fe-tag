import { Moment } from 'moment';

export interface ICountry {
  id?: number;
  name?: string;
  code?: string;
  parentId?: number;
  status?: number;
  path?: string;
  areaNameLevel1?: string;
  areaNameLevel2?: string;
  areaNameLevel3?: string;
  areaOrder?: string;
  areaLevel?: string;
  createdTimestamp?: Moment;
  updatedTimestamp?: Moment;
}

export class Country implements ICountry {
  constructor(
    public id?: number,
    public name?: string,
    public code?: string,
    public parentId?: number,
    public status?: number,
    public path?: string,
    public areaNameLevel1?: string,
    public areaNameLevel2?: string,
    public areaNameLevel3?: string,
    public areaOrder?: string,
    public areaLevel?: string,
    public createdTimestamp?: Moment,
    public updatedTimestamp?: Moment
  ) {}
}

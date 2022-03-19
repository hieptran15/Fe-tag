import { Moment } from 'moment';

export interface IDistrict {
  id?: number;
  areaLevel?: number;
  areaNameLevel1?: string;
  areaNameLevel2?: string;
  areaNameLevel3?: string;
  areaOrder?: number;
  code?: string;
  name?: string;
  parentId?: number;
  path?: number;
  status?: number;
}

export class District implements IDistrict {
  constructor(
    public id?: number,
    public name?: string,
    public code?: string,
    public areaLevel?: number,
    public areaNameLevel1?: string,
    public areaNameLevel2?: string,
    public areaNameLevel3?: string,
    public areaOrder?: number,
    public parentId?: number,
    public path?: number,
    public status?: number
  ) {}
}

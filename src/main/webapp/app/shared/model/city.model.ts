import { Moment } from 'moment';

export interface ICity {
  id?: number;
  areaLevel?: number;
  areaNameLevel1?: string;
  areaNameLevel2?: string;
  areaNameLevel3?: string;
  areaOrder?: number;
  code?: string;
  name?: string;
  parentId?: number;
  path?: string;
  status?: number;
}

export class City implements ICity {
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
    public path?: string,
    public status?: number
  ) {}
}

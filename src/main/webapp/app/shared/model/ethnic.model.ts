import { Moment } from 'moment';

export interface IEthnic {
  id?: number;
  description?: string;
  code?: string;
  name?: string;
  weight?: number;
}

export class Ethnic implements IEthnic {
  constructor(public id?: number, public name?: string, public code?: string, public description?: string, public weight?: number) {}
}

import { Moment } from 'moment';

export interface IHit {
  id?: number;
  data?: string;
}

export class Hit implements IHit {
  constructor(public id?: number, public data?: string) {}
}

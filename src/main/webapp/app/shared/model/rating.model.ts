import { Moment } from 'moment';

export interface IRating {
  id?: number;
  rating?: number;
  userId?: number;
  createdAt?: Moment;
}

export class Rating implements IRating {
  constructor(public id?: number, public rating?: number, public userId?: number, public createdAt?: Moment) {}
}

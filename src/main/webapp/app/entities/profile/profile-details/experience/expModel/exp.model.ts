export interface IExp {
  id?: number;
  userId?: number;
  company?: string;
  country?: string;
  endDate?: Date;
  startDate?: Date;
}

export class Exp implements IExp {
  constructor(
    public id?: number,
    public userId?: number,
    public company?: string,
    public country?: string,
    public endDate?: Date,
    public startDate?: Date
  ) {}
}

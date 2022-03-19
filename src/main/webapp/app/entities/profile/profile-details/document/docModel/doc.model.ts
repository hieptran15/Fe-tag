export interface IDoc {
  id?: number;
  userId?: number;
  company?: string;
  fromYear?: number;
  toYear?: number;
}

export class Doc implements IDoc {
  constructor(
    public id?: number,
    public userId?: number,
    public company?: string,
    public country?: string,
    public endDate?: Date,
    public startDate?: Date
  ) {}
}

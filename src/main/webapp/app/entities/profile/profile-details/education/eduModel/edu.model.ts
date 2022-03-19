export interface IEdu {
  id?: number;
  userId?: number;
  company?: string;
  fromYear?: number;
  toYear?: number;
}

export class Edu implements IEdu {
  constructor(
    public id?: number,
    public userId?: number,
    public company?: string,
    public country?: string,
    public endDate?: Date,
    public startDate?: Date
  ) {}
}

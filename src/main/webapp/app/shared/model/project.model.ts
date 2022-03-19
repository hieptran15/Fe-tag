import { Moment } from 'moment';

export interface IProject {
  id?: number;
  name?: string;
  taskType?: string;
  rules?: string;
  status?: string;
  price?: number;
  url?: string;
  dailyWorkHours?: string;
  timePerHits?: string;
  startDate?: Moment;
  deadline?: Moment;
  bidClosed?: Moment;
  createdUser?: string;
  hitsDone?: string;
  hitsTotal?: string;
  workers?: string;
  nWorkers?: string;
  nHitsTotal?: string;
  nHitsTotalReal?: string;
  nSamples?: number;
}

export class Project implements IProject {
  constructor(
    public id?: number,
    public name?: string,
    public taskType?: string,
    public rules?: string,
    public status?: string,
    public price?: number,
    public url?: string,
    public dailyWorkHours?: string,
    public timePerHits?: string,
    public startDate?: Moment,
    public deadline?: Moment,
    public bidClosed?: Moment,
    public createdUser?: string,
    public hitsDone?: string,
    public hitsTotal?: string,
    public workers?: string,
    public nWorkers?: string,
    public nHitsTotal?: string,
    public nHitsTotalReal?: string,
    public nSamples?: number
  ) {}
}

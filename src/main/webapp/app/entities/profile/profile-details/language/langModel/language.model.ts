import { Moment } from 'moment';

export interface ILanguage {
  id?: number;
  userId?: number;
  isMainLang?: number;
  level?: number;
  name?: string;
}

export class Language implements ILanguage {
  constructor(public id?: number, public userId?: number, public isMainLang?: number, public level?: number, public name?: string) {}
}

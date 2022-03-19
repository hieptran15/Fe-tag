import { ILanguage } from './langModel/language.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfileService } from '../../../../layouts/profiles/profile.service';
import { Table } from 'primeng/table';
import { JhiEventManager } from 'ng-jhipster';

@Component({
  selector: 'jhi-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
})
export class LanguageComponent implements OnInit {
  @ViewChild('table')
  table: Table | undefined;
  languages = [
    { label: 'profile.listLanguage.vietnamese', value: 'Vietnamese' },
    { label: 'profile.listLanguage.english', value: 'English' },
    { label: 'profile.listLanguage.japanese', value: 'Japanese' },
    { label: 'profile.listLanguage.korea', value: 'Korea' },
    { label: 'profile.listLanguage.china', value: 'China' },
  ];
  levels = [
    { label: 'profile.listLevel.levelZero', value: 0 },
    { label: 'profile.listLevel.levelOne', value: 1 },
    { label: 'profile.listLevel.levelTwo', value: 2 },
    { label: 'profile.listLevel.levelThree', value: 3 },
  ];
  levelSelected: any;
  languageSelected: any;
  selectMainLang: any;
  listMainLangSelect: any;
  myLang: ILanguage = {};
  othersLang: ILanguage[] = [];
  othersLangInit: ILanguage[] = [];
  isEditRowItem: Boolean = false;
  showModalDelete = false;
  isEditMain = false;
  optionLanguage: any[] = [];
  itemDelete: any;

  constructor(private profileService: ProfileService, private eventManager: JhiEventManager) {}

  ngOnInit(): void {
    this.getLanguage();
  }

  openEditMainLang(): any {
    this.isEditMain = true;
    this.listMainLangSelect = this.languages.filter((item: any) => !this.othersLangInit.find((it: any) => it.name === item.value));
  }

  updateMainLang(): any {
    this.profileService
      .updateLang({
        ...this.myLang,
        isMainLang: 1,
        name: this.selectMainLang ? this.selectMainLang.value : this.myLang.name,
        level: 0,
      })
      .subscribe(
        () => {
          this.isEditMain = !this.isEditMain;
          this.getLanguage();
          this.eventManager.broadcast('reloadProfileStatus');
        },
        (err: any) => {
          console.log(err);
        }
      );
  }

  updateOtherLang(language: any): void {
    this.isEditRowItem = false;
    this.profileService
      .updateLang({
        ...language,
        level: this.levelSelected.value,
        name: this.languageSelected.value,
      })
      .subscribe(
        () => {
          this.getLanguage();
        },
        (err: any) => {
          console.log(err);
        }
      );
  }

  getLanguage(): any {
    this.profileService.getUserLang().subscribe(
      data => {
        this.myLang = data.response.find((item: any) => item.isMainLang === 1);
        this.othersLang = data.response.filter((item: any) => item.isMainLang === 0);
        this.othersLangInit = data.response.filter((item: any) => item.isMainLang === 0);
      },
      err => {
        console.log(err);
      }
    );
  }

  deleteItem(): void {
    this.profileService.deleteLang(this.itemDelete).subscribe(
      () => {
        this.getLanguage();
        this.showModalDelete = false;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  addOtherLang(): void {
    this.getOptionLanguage();
    const newRow = {
      isMainLang: 0,
      level: 0,
      name: this.optionLanguage[0].value,
    };
    this.levelSelected = this.levels.find(item => item.value === newRow.level);
    this.languageSelected = this.languages.find(item => item.value === newRow.name);
    if (this.table) {
      this.othersLang.push(newRow);
      this.table.initRowEdit(newRow);
      this.isEditRowItem = true;
      this.isEditMain = false;
    }
  }

  openModalDelete(language: any): void {
    if (!language.userId) {
      this.othersLang.pop();
    } else {
      this.showModalDelete = true;
      this.itemDelete = language;
    }
  }

  onClick(event: any): void {
    console.log('On clicked');
    event.preventDefault();
    event.stopPropagation();
  }

  onEditRowItem(language: any): void {
    this.getOptionLanguage(language);
    this.levelSelected = this.levels.find(item => item.value === language.level);
    this.languageSelected = this.languages.find(item => item.value === language.name);
    this.isEditRowItem = true;
    this.isEditMain = false;
  }

  getOptionLanguage(language?: any): void {
    this.optionLanguage = this.languages.filter(
      item =>
        (item.value !== this.myLang.name && !this.othersLangInit.find((it: any) => it.name === item.value)) || item.value === language?.name
    );
  }

  checkEnableButtonAdd(): Boolean {
    const isCheckEmptyLanguage = !this.myLang?.isMainLang;
    const isCheckFullOption = this.addOtherLang.length > this.othersLangInit.length || this.languages.length === this.othersLang.length + 1;
    return isCheckFullOption || this.isEditRowItem || isCheckEmptyLanguage;
  }

  checkEnableDropDownLanguage(): Boolean {
    return this.languages.length === this.othersLangInit.length + 1;
  }

  onRowEditCancel(language: any): void {
    this.isEditRowItem = false;
    if (!language.userId) {
      this.othersLang.pop();
    }
  }

  getLabelLanguage(languageName: any): any {
    return this.languages.find(item => item.value === languageName)?.label;
  }

  getLabelLevel(level: number): any {
    return this.levels.find(item => item.value === level)?.label;
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfileService } from '../../../../layouts/profiles/profile.service';
import { Table } from 'primeng/table';
import { IEdu } from 'app/entities/profile/profile-details/education/eduModel/edu.model';
import { JhiEventManager } from 'ng-jhipster';
import { RELOAD_PROFILE } from 'app/app.constants';

@Component({
  selector: 'jhi-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
})
export class EducationComponent implements OnInit {
  @ViewChild('table')
  table: Table | undefined;

  listLevel = [
    { label: 'profile.edu.listLevel.hightSchool', value: 'hightSchool' },
    { label: 'profile.edu.listLevel.intermediate', value: 'intermediate' },
    { label: 'profile.edu.listLevel.colleges', value: 'colleges' },
    { label: 'profile.edu.listLevel.university', value: 'university' },
    { label: 'profile.edu.listLevel.master', value: 'master' },
    { label: 'profile.edu.listLevel.doctor', value: 'doctor' },
  ];
  levelSelected: any;
  fromYear: any;
  toYear: any;
  certificationFrom: any;
  listYearSelect: any[] = [];
  listFromYearSelect: any[] = [];
  listToYearSelect: any[] = [];
  listEdu: IEdu[] = [];
  listEduInit: IEdu[] = [];
  isEditRowItem = false;
  showModalDelete = false;
  itemDelete: any;
  errSchoolName: any;
  errLevel: any;
  errFrom: any;
  errTo: any;
  regexSchoolName = /^[^!@#$%^()]*$/;
  isDropFrom = false;
  isDropTo = false;
  isShowTable = false;
  regexSpace = /\s(?=\s)/g;

  constructor(private profileService: ProfileService, private eventManager: JhiEventManager) {}

  ngOnInit(): void {
    const listYear = [];
    for (let i = 0; i <= new Date().getFullYear() - 1980; i++) {
      listYear.push({ label: 1980 + i, value: 1980 + i });
    }
    this.listYearSelect = listYear;
    this.listFromYearSelect = listYear;
    this.listToYearSelect = listYear;
    this.getEdu();
  }

  onSelectFromYear(): void {
    const yearCompare = this.fromYear || 1980;
    this.listToYearSelect = this.listYearSelect.filter(item => item.value >= yearCompare);
  }

  onSelectToYear(): void {
    const yearCompare = this.toYear || new Date().getFullYear();
    this.listFromYearSelect = this.listYearSelect.filter(item => item.value <= yearCompare);
  }

  updateEdu(edu: any): void {
    if (!this.levelSelected || (this.certificationFrom && this.certificationFrom?.length < 3)) {
      if (!this.levelSelected) {
        this.errLevel = 'profile.requiredField';
      } else {
        this.errLevel = '';
      }
      if (this.certificationFrom?.length < 3 && this.certificationFrom?.length > 0) {
        this.errSchoolName = 'profile.minLength';
      } else {
        this.errSchoolName = '';
      }
      if (this.table) {
        this.table.initRowEdit(edu);
      }
      return;
    }
    this.profileService
      .updateEdu({
        ...edu,
        certification: this.levelSelected.value,
        certificationFrom: this.certificationFrom?.replace(this.regexSpace, '').trim(),
        fromYear: this.fromYear,
        toYear: this.toYear,
      })
      .subscribe(
        () => {
          this.isEditRowItem = false;
          this.getEdu();
          this.eventManager.broadcast('reloadProfileStatus');
        },
        (err: any) => {
          console.log(err);
        }
      );
  }

  checkEnableButtonAdd(): Boolean {
    return this.isEditRowItem;
  }

  getEdu(): any {
    this.profileService.getUserEdu().subscribe(
      data => {
        this.listEdu = data.response;
        this.listEduInit = [...this.listEdu];
        this.isShowTable = data.response?.length > 0;
      },
      err => {
        console.log(err);
      }
    );
  }

  deleteItem(): void {
    this.profileService.deleteEdu(this.itemDelete).subscribe(
      () => {
        this.getEdu();
        this.showModalDelete = false;
        this.eventManager.broadcast(RELOAD_PROFILE);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  openModalDelete(exp: any): void {
    this.showModalDelete = true;
    this.itemDelete = exp;
  }

  onEditRowItem(exp: any): void {
    this.resetErr();
    this.fromYear = exp.fromYear;
    this.certificationFrom = exp.certificationFrom;
    this.levelSelected = this.listLevel.find(item => item.value === exp.certification);
    this.toYear = exp.toYear;
    this.onSelectFromYear();
    this.onSelectToYear();
    this.isEditRowItem = true;
  }

  addEdu(): void {
    this.isShowTable = true;
    this.resetErr();
    this.resetValue();
    const newRow = {};
    this.onSelectFromYear();
    this.onSelectToYear();
    setTimeout(() => {
      if (this.table) {
        this.listEdu.push(newRow);
        this.table.initRowEdit(newRow);
        this.isEditRowItem = true;
      }
    }, 0);
  }

  onRowEditCancel(exp: any): void {
    if (this.listEduInit.length === 0) {
      this.isShowTable = !this.isShowTable;
    }
    this.levelSelected = null;
    this.certificationFrom = '';
    this.fromYear = null;
    this.toYear = null;
    this.isEditRowItem = false;
    if (!exp.userId) {
      this.listEdu.pop();
    }
  }

  getCertification(level: any): any {
    return this.listLevel.find(item => item.value === level)?.label;
  }

  onClick(event: any): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onKeyPress(event: any): void {
    if (!this.regexSchoolName.test(event.key)) {
      event.preventDefault();
    }
  }

  resetErr(): void {
    this.errTo = '';
    this.errFrom = '';
    this.errLevel = '';
    this.errSchoolName = '';
  }

  resetValue(): void {
    this.fromYear = null;
    this.certificationFrom = null;
    this.toYear = null;
    this.levelSelected = null;
  }

  onChangeSelectLevel(): any {
    if (!this.levelSelected) {
      this.errLevel = 'profile.requiredField';
    } else {
      this.errLevel = '';
    }
  }
}

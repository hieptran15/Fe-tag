import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfileService } from '../../../../layouts/profiles/profile.service';
import { Table } from 'primeng/table';
import { IExp } from 'app/entities/profile/profile-details/experience/expModel/exp.model';
import { JhiEventManager } from 'ng-jhipster';
import { RELOAD_PROFILE } from 'app/app.constants';

@Component({
  selector: 'jhi-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent implements OnInit {
  @ViewChild('table')
  table: Table | undefined;
  startDateSelected: any;
  endDateSelected: any;
  lang: any;
  listExp: IExp[] = [];
  listExpInit: IExp[] = [];
  isEditRowItem: Boolean = false;
  showModalDelete: Boolean = false;
  itemDelete: any;
  company: any;
  errCompany: any;
  website: any;
  errWebsite: any;
  jobName: any;
  errJobName: any;
  regexSchoolName = /^[^!@#$%^()]*$/;
  regexSpace = /\s(?=\s)/g;
  errTo: any;
  errFrom: any;
  isShowTable = false;

  constructor(private profileService: ProfileService, private eventManager: JhiEventManager) {}

  ngOnInit(): void {
    this.getExp();
  }

  checkValidate(row: any): Boolean {
    return row;
  }

  onPressSpace(e: any): void {
    e.preventDefault();
  }

  updateExp(exp: any): void {
    if (!this.company || this.company?.length < 3) {
      if (!this.company || (this.company?.length < 3 && this.company?.length > 0)) {
        if (!this.company) {
          this.errCompany = 'profile.requiredField';
        }
        if (this.company?.length < 3 && this.company?.length > 0) {
          this.errCompany = 'profile.minLength';
        }
      } else {
        this.errCompany = '';
      }
      if (this.table) {
        this.table.initRowEdit(exp);
      }
      return;
    }
    this.profileService
      .updateExp({
        ...exp,
        company: this.company?.replace(this.regexSpace, '').trim(),
        website: this.website,
        jobName: this.jobName?.replace(this.regexSpace, '').trim(),
        startDate: this.startDateSelected,
        endDate: this.endDateSelected,
      })
      .subscribe(
        () => {
          this.isEditRowItem = false;
          this.getExp();
          this.eventManager.broadcast(RELOAD_PROFILE);
        },
        (err: any) => {
          console.log(err);
        }
      );
  }

  checkEnableButtonAdd(): Boolean {
    return this.isEditRowItem;
  }

  getExp(): any {
    this.profileService.getUserExp().subscribe(
      data => {
        this.listExp = data.response;
        this.listExpInit = [...this.listExp];
        this.isShowTable = data.response?.length > 0;
      },
      err => {
        console.log(err);
      }
    );
  }

  onKeyDownCompany(): any {
    setTimeout(() => {
      if (!this.company || this.company?.length < 3) {
        if (!this.company) {
          this.errCompany = 'profile.requiredField';
        }
        if (this.company?.length && this.company?.length < 3) {
          this.errCompany = 'profile.minLength';
        }
      } else {
        this.errCompany = '';
      }
    }, 0);
  }

  deleteItem(): void {
    this.profileService.deleteExp(this.itemDelete).subscribe(
      () => {
        this.getExp();
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
    this.company = exp.company;
    this.website = exp.website;
    this.jobName = exp.jobName;
    if (!exp.startDate || !exp.startDate) {
      if (!exp.startDate) {
        this.startDateSelected = null;
      }
      if (!exp.startDate) {
        this.endDateSelected = null;
      }
    } else {
      this.startDateSelected = new Date(exp.startDate);
      this.endDateSelected = new Date(exp.endDate);
    }
    this.isEditRowItem = true;
  }

  addExp(): void {
    this.isShowTable = true;
    this.resetErr();
    this.resetValue();
    const newRow = {};
    setTimeout(() => {
      if (this.table) {
        this.listExp.push(newRow);
        this.table.initRowEdit(newRow);
        this.isEditRowItem = true;
      }
    }, 0);
  }

  onRowEditCancel(exp: any): void {
    if (this.listExpInit.length === 0) {
      this.isShowTable = !this.isShowTable;
    }
    this.isEditRowItem = false;
    if (!exp.userId) {
      this.listExp.pop();
    }
  }

  resetErr(): void {
    this.errCompany = '';
    this.errWebsite = '';
    this.errJobName = '';
    this.errTo = '';
    this.errFrom = '';
  }

  resetValue(): void {
    this.company = null;
    this.website = null;
    this.jobName = null;
    this.startDateSelected = null;
    this.endDateSelected = null;
  }

  onClick(event: any): void {
    console.log('On clicked');
    event.preventDefault();
    event.stopPropagation();
  }

  onKeyPress(event: any): void {
    if (!this.regexSchoolName.test(event.key)) {
      event.preventDefault();
    }
  }
}

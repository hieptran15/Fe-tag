import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfileService } from '../../../../layouts/profiles/profile.service';
import { Table } from 'primeng/table';
import { JhiEventManager } from 'ng-jhipster';
import { RELOAD_PROFILE } from 'app/app.constants';

@Component({
  selector: 'jhi-bankinformation',
  templateUrl: './bankinformation.component.html',
  styleUrls: ['./bankinformation.component.scss'],
})
export class BankinformationComponent implements OnInit {
  @ViewChild('table')
  table: Table | undefined;

  listBankName = [
    { label: 'Á Châu (ACB)', value: 'Acbbank' },
    { label: 'Ngân hàng Quân đội (MB)', value: 'Mbbank' },
    { label: 'Đầu tư và phát triển (BIDV)', value: 'Bidv' },
    { label: 'Công thương Việt Nam (VIETINBANK)', value: 'Viettinbank' },
    { label: 'Agribank (VBA)', value: 'Agribank' },
    { label: 'Ngân hàng Xây dựng (CB)', value: 'CBbank' },
    { label: 'Ngân hàng Đại Dương (Oceanbank)', value: 'Oceanbank' },
    { label: 'Ngân hàng Dầu Khí Toàn Cầu (GPBank)', value: 'GPbank' },
    { label: 'Ngân hàng Á Châu (ACB)', value: 'ACbank' },
    { label: 'Ngân hàng Tiên Phong (TPBank)', value: 'TPbank' },
    { label: 'Ngân hàng Đông Á (DAB)', value: 'DAbank' },
    { label: 'Ngân hàng Đông Nam Á (SEABank)', value: 'SEAbank' },
    { label: 'Ngân hàng Bắc Á (BacABank)', value: 'BacAbank' },
    { label: 'Hàng Hải Việt Nam (MSB)', value: 'MSbank' },
    { label: 'Nam Á (Nam A Bank)', value: 'NamAbank' },
    { label: 'Việt Nam Thịnh Vượng (VPBank)', value: 'VPbank' },
    { label: 'Phương Đông (OCB)', value: 'OCB' },
    { label: 'Quốc tế (VIB)', value: 'VIB' },
    { label: 'Sài Gòn (SCB)', value: 'SCB' },
    { label: 'Sài Gòn Công Thương (SGB)', value: 'SGB' },
    { label: 'Sài Gòn-Hà Nội (SHB)', value: 'SHB' },
    { label: 'Sài Gòn Thương Tín (STB)', value: 'STB' },
    { label: 'Việt Nam Thương Tín (VietBank)', value: 'VietBank' },
    { label: 'Xuất Nhập khẩu Việt Nam (Eximbank)', value: 'Eximbank' },
    { label: 'Bưu điện Liên Việt (LienVietPostBank)', value: 'LienVietPostBank' },
    { label: 'Ngoại thương Việt Nam (Vietcombank)', value: 'Vietcombank' },
    { label: 'Ngân hàng TNHH MTV Shinhan Việt Nam (VBA)', value: 'Agribank' },
    { label: 'Kỹ Thương Việt Nam (TECHCOMBANK)', value: 'Techcombank' },
  ];
  profile: any;
  bankSelected: any;
  listBankInit: any[] = [];
  listBank: any[] = [];
  listItems: any;
  isEditRowItem: Boolean = false;
  showModalDelete: Boolean = false;
  itemDelete: any;
  accountNumber: any;
  isShowTable = false;
  errAccNumber = '';
  errBank = '';
  regexNumber = /[0-9]/;

  constructor(private profileService: ProfileService, private eventManager: JhiEventManager) {}

  ngOnInit(): void {
    this.getBank();
  }

  updateEdu(edu: any): void {
    if (this.checkValidate()) {
      if (this.table) {
        this.table.initRowEdit(edu);
      }
      return;
    }
    this.profileService
      .updateProfile({
        ...this.profile,
        bankName: this.bankSelected?.value,
        bankAccount: this.accountNumber,
      })
      .subscribe(
        () => {
          this.isEditRowItem = false;
          this.getBank();
          this.getListProcessItems();
          this.eventManager.broadcast(RELOAD_PROFILE);
        },
        (err: any) => {
          console.log(err);
        }
      );
  }

  checkEnableButtonAdd(): Boolean {
    return this.isEditRowItem || this.listBank.length >= 1;
  }

  getBankName(bankName: string): any {
    return this.listBankName.find(item => item.value === bankName)?.label;
  }

  getBank(): any {
    this.profileService.getUserProfile().subscribe(
      data => {
        this.listBank = data.response.bankName
          ? [{ userId: data.response?.id, bankName: data.response?.bankName, bankAccount: data.response?.bankAccount }]
          : [];
        this.listBankInit = [...this.listBank];
        this.profile = data.response;
        this.isShowTable = data.response?.bankName;
      },
      err => {
        console.log(err);
      }
    );
  }

  checkValidate(): boolean {
    if (!this.accountNumber || this.accountNumber?.toString()?.length < 7) {
      if (!this.accountNumber) {
        this.errAccNumber = 'profile.requiredField';
      }
      if (this.accountNumber && this.accountNumber?.toString()?.length < 7) {
        this.errAccNumber = 'profile.minLength';
      }
    } else {
      this.errAccNumber = '';
    }
    if (!this.bankSelected) {
      this.errBank = 'profile.requiredField';
    } else {
      this.errBank = '';
    }
    return this.accountNumber?.toString()?.length < 7 || !this.accountNumber || !this.bankSelected;
  }

  deleteItem(): void {
    this.profileService
      .updateProfile({
        ...this.profile,
        bankName: null,
        bankAccount: null,
      })
      .subscribe(
        () => {
          this.getBank();
          this.showModalDelete = false;
          this.eventManager.broadcast(RELOAD_PROFILE);
        },
        (err: any) => {
          console.log(err);
        }
      );
  }

  openModalDelete(): void {
    this.showModalDelete = true;
  }

  onEditRowItem(bank: any): void {
    this.errBank = '';
    this.errAccNumber = '';
    this.bankSelected = this.listBankName.find(item => item.value === bank.bankName);
    this.accountNumber = bank.bankAccount;
    this.isEditRowItem = true;
  }

  addEdu(): void {
    this.errBank = '';
    this.errAccNumber = '';
    this.isShowTable = !this.isShowTable;
    this.accountNumber = '';
    this.bankSelected = null;
    const newRow = {};
    setTimeout(() => {
      if (this.table) {
        this.listBank.push(newRow);
        this.table.initRowEdit(newRow);
        this.isEditRowItem = true;
      }
    }, 0);
  }

  onRowEditCancel(exp: any): void {
    if (this.listBankInit.length === 0) {
      this.isShowTable = !this.isShowTable;
    }
    this.isEditRowItem = false;
    if (!exp.userId) {
      this.listBank.pop();
    }
  }

  getCertification(level: any): any {
    return this.listBank.find(item => item.value === level)?.label;
  }

  onClick(event: any): void {
    console.log('On clicked');
    event.preventDefault();
    event.stopPropagation();
  }

  getListProcessItems(): void {
    const arr: Array<string> = ['./info', './language', './exp', './edu', './bank', './deals', './doc'];
    this.profileService.getPercent().subscribe(data => {
      this.listItems = data.response.map((item: any, index: number) => {
        return { ...item, routerLink: arr[index] };
      });
      console.log(this.listItems);
    });
  }

  checkNumber(event: any): any {
    if (this.regexNumber.test(event.key) === false) {
      event.preventDefault();
    }
  }

  checkValidateNumber(): any {
    setTimeout(() => {
      if (!this.accountNumber || this.accountNumber?.toString()?.length < 7) {
        if (!this.accountNumber) {
          this.errAccNumber = 'profile.requiredField';
        }
        if (this.accountNumber && this.accountNumber?.toString()?.length < 7) {
          this.errAccNumber = 'profile.minLength';
        }
      } else {
        this.errAccNumber = '';
      }
    }, 0);
  }

  onChangeSelectBank(): any {
    if (!this.bankSelected) {
      this.errBank = 'profile.requiredField';
    } else {
      this.errBank = '';
    }
  }
}

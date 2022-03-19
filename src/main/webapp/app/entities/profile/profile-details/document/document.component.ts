import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProfileService } from '../../../../layouts/profiles/profile.service';
import { Table } from 'primeng/table';
import { IDoc } from 'app/entities/profile/profile-details/document/docModel/doc.model';
import { UploadService } from 'app/shared/service/upload.service';
import * as fileSaver from 'file-saver';
import { JhiEventManager } from 'ng-jhipster';
import { RELOAD_PROFILE } from 'app/app.constants';

@Component({
  selector: 'jhi-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
})
export class DocumentComponent implements OnInit {
  @ViewChild('table')
  table: Table | undefined;
  @ViewChild('search')
  searchElement: ElementRef | undefined;
  listTypeFile = [
    {
      label: 'profile.doc.listTypeOption.degree',
      value: 'degree',
    },
    {
      label: 'profile.doc.listTypeOption.certificate',
      value: 'certificate',
    },
    {
      label: 'profile.doc.listTypeOption.letter',
      value: 'letter',
    },
    {
      label: 'profile.doc.listTypeOption.cv',
      value: 'cv',
    },
    {
      label: 'profile.doc.listTypeOption.others',
      value: 'others',
    },
  ];
  isFileSelected = false;
  typeFileSelected: any;
  fileName: any;
  fileNameSelected: any;
  listDoc: IDoc[] = [];
  showModalDelete = false;
  showModalAdd = false;
  itemDelete: any;
  fileToUpload: any;
  errTypeFile = '';
  errFileName = '';
  errFile = '';
  isShowTable = false;
  regexFileName = /^[^!@#$%^()\->+]*$/;
  regexSpace = /\s(?=\s)/g;

  constructor(private profileService: ProfileService, private uploadService: UploadService, private eventManager: JhiEventManager) {}

  ngOnInit(): void {
    this.getDoc();
  }

  getDoc(): any {
    this.profileService.getUserDoc().subscribe(
      data => {
        this.listDoc = data.response;
        this.isShowTable = data.response?.length > 0;
      },
      err => {
        console.log(err);
      }
    );
  }

  showSearch(): void {
    if (this.searchElement) {
      this.searchElement.nativeElement.focus();
    }
  }

  downloadFile(data: any, fileName: any, typeFile: any): any {
    const blob = new Blob([data.body]);
    fileSaver.saveAs(blob, `${fileName}${typeFile}`);
  }

  deleteItem(): void {
    this.profileService.deleteDoc(this.itemDelete).subscribe(
      () => {
        this.getDoc();
        this.showModalDelete = false;
        this.eventManager.broadcast('reloadProfileStatus');
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

  uploadFile(event: any): void {
    if (event.addedFiles && event.addedFiles[0]) {
      const file = event.addedFiles[0];
      this.fileNameSelected = file.name;
      this.fileToUpload = file;
      this.isFileSelected = true;
    }
  }

  onDownLoad(row: any): void {
    this.uploadService.downLoadFile(row.fileUrl).subscribe(
      data => {
        this.downloadFile(data, row.docName, row.fileUrl.substring(row.fileUrl.lastIndexOf('.'), row.fileUrl.length));
      },
      (err: any) => {
        console.log(err, 'err');
      }
    );
  }

  checkErrFormDoc(): Boolean {
    if (!this.fileToUpload) {
      this.errFile = 'profile.doc.validate.fileRequired';
    }
    if (!this.fileName) {
      this.errFileName = 'profile.doc.validate.fileNameRequired';
    }
    if (this.regexFileName.test(this.fileName) === false) {
      this.errFileName = 'profile.doc.validate.fileNameNoCharSpecial';
    }
    return !this.fileToUpload || !this.fileName || this.regexFileName.test(this.fileName) === false;
  }

  onChangeFileName(e: any): void {
    setTimeout(() => {
      if (!this.fileName || this.regexFileName.test(this.fileName) === false) {
        if (!this.fileName) {
          this.errFileName = 'profile.doc.validate.fileNameRequired';
        }
        if (this.regexFileName.test(this.fileName) === false) {
          this.errFileName = 'profile.doc.validate.fileNameNoCharSpecial';
        }
      } else {
        this.errFileName = '';
      }
    }, 0);
  }

  onShowModalAdd(): void {
    this.resetErr();
    this.typeFileSelected = null;
    this.showModalAdd = true;
  }

  getDocType(docType: any): any {
    return this.listTypeFile.find(item => item.value === docType)?.label;
  }

  cancelAdd(): void {
    this.fileName = null;
    this.typeFileSelected = null;
    this.fileToUpload = null;
    this.fileNameSelected = null;
    this.isFileSelected = false;
    this.showModalAdd = false;
  }

  resetErr(): void {
    this.errFile = '';
    this.errFileName = '';
    this.errTypeFile = '';
  }

  addDocument(): void {
    if (this.checkErrFormDoc()) {
      this.showSearch();
      return;
    }
    const formData = new FormData();
    formData.append('file', this.fileToUpload);
    formData.append('docType', this.typeFileSelected?.value);
    formData.append('docName', this.fileName?.replace(this.regexSpace, '').trim());
    this.profileService.updateDoc(formData).subscribe(
      () => {
        this.fileName = null;
        this.typeFileSelected = null;
        this.fileToUpload = null;
        this.fileNameSelected = null;
        this.isFileSelected = false;
        this.getDoc();
        this.showModalAdd = false;
        this.eventManager.broadcast(RELOAD_PROFILE);
      },
      err => {
        console.log(err);
      }
    );
  }
}

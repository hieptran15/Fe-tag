import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HitsService } from 'app/shared/service/hits.service';
import { IHit } from 'app/shared/model/hits.model';
import { FormBuilder } from '@angular/forms';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { IResponse } from 'app/shared/model/response.model';

@Component({
  selector: 'jhi-hits',
  templateUrl: './hits.component.html',
  styleUrls: ['./hits.component.scss'],
})
export class HitsComponent implements OnInit {
  @ViewChild('clickSearch') clickSearch!: ElementRef;

  isOpen = false;
  hits: IHit[] = [];
  searchForm: any;

  keySearch: any;
  totalRecords: any;
  pageCount: any;
  getFirst = 0;
  getRow = 5;

  uploadForm: any;
  uploadedFiles: any[] = [];

  constructor(private hitsservice: HitsService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchValue: [''],
    });
    if (!this.keySearch) {
      this.keySearch = '';
    }
    const option = {
      page: this.getFirst,
      size: this.getRow,
    };

    this.hitsservice.getAllHits(this.keySearch, this.getFirst, this.getRow).subscribe(data => {
      this.hits = data.body!.response;
      this.onSuccess(data.body?.response, data.headers);
    });

    this.uploadForm = this.fb.group({
      file: [''],
    });
  }

  paginate(event: any): any {
    this.getFirst = event.first;
    this.getRow = event.rows;
    const option = {
      page: event.first,
      size: event.rows,
    };
    this.hitsservice.getAllHits(this.keySearch, this.getFirst, this.getRow).subscribe(
      data => {
        this.hits = data.body!.response;
      },
      err => {
        console.log(err);
      }
    );
  }

  handleClick(event: any): any {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.clickSearch.nativeElement.classList.add('clickSearch');
    } else {
      this.clickSearch.nativeElement.classList.remove('clickSearch');
    }
  }

  onSubmit(): any {
    const option = {
      page: this.getFirst,
      size: this.getRow,
    };
    this.keySearch = this.searchForm.get('searchValue').value;
    this.hitsservice.getAllHits(this.keySearch, this.getFirst, this.getRow).subscribe(data => {
      this.hits = data.body!.response;
      this.onSuccess(data.body?.response, data.headers);
    });
  }

  onUpload(event: any): any {
    // for(let file of event.files) {
    //   this.uploadedFiles.push(file);
    // }
    //
    // this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }

  private onSuccess(hit: IHit[], headers: HttpHeaders): void {
    this.totalRecords = Number(headers.get('X-Total-Count'));
    console.log('totalRecords', this.totalRecords);
    this.hits = hit;
  }
}

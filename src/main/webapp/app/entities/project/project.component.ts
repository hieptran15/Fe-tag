import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { ProjectService } from 'app/shared/service/project.service';
import { IProject } from 'app/shared/model/project.model';
import * as Highcharts from 'highcharts';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { HighchartsChartComponent } from 'highcharts-angular';
import { IHit } from 'app/shared/model/hits.model';
import { HttpHeaders } from '@angular/common/http';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'jhi-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  @ViewChild('myChart') chart: HighchartsChartComponent | undefined;

  profileProcess: any;
  user: any;
  page: any;
  pageCount: any;
  getFirst = 0;
  getRow = 10;
  projectDetails: any;
  allProjects: IProject[] = [];
  dataChart: any;
  dropDownOption: any;
  totalRecords: any;
  lengthProject: IProject[] = [];
  selectedProjectFilter: any;
  selectedTypeProjectFilter: any;
  sortPriceProjectFilter: any;
  selectProjects = [
    { name: 'project.priceSortProject.allProject', code: '' },
    { name: 'project.priceSortProject.openProject', code: 'OPEN' },
    { name: 'project.priceSortProject.doingProject', code: 'DOING' },
  ];
  selectTypeProjects = [
    { name: 'project.priceSortProject.allProject', code: '' },
    { name: 'project.priceSortProject.imageClassification', code: 'IMAGE_CLASSIFICATION' },
    { name: 'project.priceSortProject.textClassification', code: 'TEXT_CLASSIFICATION' },
    { name: 'project.priceSortProject.editSentence', code: 'IMAGE_CLASSIFICATION' },
  ];
  selectTypeSort = [
    { name: 'project.priceSortProject.priceHighToLow', code: 'price', test: 'MAX' },
    { name: 'project.priceSortProject.lowToHighPrice', code: 'price', test: 'MIN' },
    { name: 'project.priceSortProject.nearestDeadline', code: 'deadline', test: 'NEAR' },
    { name: 'project.priceSortProject.furthestDeadline', code: 'deadline', test: 'FAR' },
  ];

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      plotShadow: false,
      type: 'pie',
    },
    title: {
      text: '',
    },
    subtitle: {
      text: '',
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    legend: {
      align: 'right',
      verticalAlign: 'top',
      layout: 'vertical',
      x: 0,
      y: 100,
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        },
      },
    },
    series: [
      {
        type: 'pie',
        innerSize: '60%',
        data: [
          { name: this.translationService.instant('project.closeProject'), y: 25, color: '#FFE200' },
          { name: this.translationService.instant('project.newProject'), y: 25, color: '#3DB39E' },
          { name: this.translationService.instant('project.doingProject'), y: 25, color: '#4D7CFE' },
          { name: this.translationService.instant('project.openProject'), y: 25, color: '#FE4F4C' },
        ],
        showInLegend: true,
      },
    ],
  };

  constructor(
    private profileService: ProfileService,
    private projectService: ProjectService,
    private translationService: TranslateService
  ) {
    translationService.onLangChange.subscribe((event: LangChangeEvent) => {
      console.log('Language changed', event, translationService.instant('register.title'));
      this.chartOptions.series = [
        {
          type: 'pie',
          innerSize: '60%',
          data: [
            { name: translationService.instant('project.closeProject'), y: 25, color: '#FE4F4C' },
            { name: translationService.instant('project.newProject'), y: 25, color: '#3DB39E' },
            { name: translationService.instant('project.doingProject'), y: 25, color: '#4D7CFE' },
            { name: translationService.instant('project.openProject'), y: 25, color: '#FFE200' },
          ],
          showInLegend: true,
        },
      ];
      if (this.chart) {
        console.log(this.chart);
        this.chart.updateOrCreateChart();
      }
    });
  }

  ngOnInit(): void {
    this.profileService.getPercent().subscribe(data => {
      this.profileProcess = data.response.some((item: any) => item.completed === false);
      console.log(this.profileProcess);
      console.log(data.response);
    });
    this.profileService.getUserProfile().subscribe(data => {
      this.user = data.response;
    });
    const option = {
      page: this.getFirst,
      size: this.getRow,
    };
    this.projectService.getAllProjects(option).subscribe(
      data => {
        this.allProjects = data.body?.response;
        this.onSuccess(data.body?.response, data.headers);
        console.log(this.allProjects);
        this.lengthProject = data.body?.response.filter((item: any) => item.taskType === 'IMAGE_CLASSIFICATION');
        console.log(this.lengthProject.length);
      },
      err => {
        console.log(err);
      }
    );
  }

  paginate(event: any): any {
    this.getFirst = event.first;
    this.getRow = event.rows;
    console.log(event.rows);
    console.log(event.first);
    const option = {
      page: event.first,
      size: event.rows,
    };
    this.projectService.getAllProjects(option).subscribe(
      data => {
        console.log(data);
        this.allProjects = data.body!.response;
        this.onSuccess(data.body?.response, data.headers);
      },
      err => {
        console.log(err);
      }
    );
  }

  filterProjects(e: any): void {
    console.log(e.value.code);
  }

  filterTypeProjects(e: any, key: string): void {
    console.log(key);
    const searchOption = { taskType: key };
    this.projectService.getAllProjects(searchOption).subscribe(
      data => {
        console.log(this.allProjects);
        this.allProjects = data.body!.response;
      },
      err => {
        console.log(err);
      }
    );
  }

  filterTypeDetails(e: any): void {
    console.log(e.value.code);
    console.log(e.value.test);
    if (e.value.test === 'MAX') {
      const option = {
        page: this.getFirst,
        size: this.getRow,
        price: e.value?.code,
      };
      this.projectService.getProjectsSortMin(option).subscribe(
        data => {
          console.log(data);
          this.allProjects = data.response;
        },
        err => {
          console.log(err);
        }
      );
    }

    if (e.value.test === 'MIN') {
      const option = {
        page: this.getFirst,
        size: this.getRow,
        price: e.value.code,
      };
      this.projectService.getProjectsSortMax(option).subscribe(
        data => {
          console.log(data);
          this.allProjects = data.response;
        },
        err => {
          console.log(err);
        }
      );
    }

    if (e.value.test === 'NEAR') {
      const option = {
        page: this.getFirst,
        size: this.getRow,
        deadline: e.value.code,
      };
      this.projectService.getDeadlineProjectsNearest(option).subscribe(
        data => {
          console.log(data);
          this.allProjects = data.response;
        },
        err => {
          console.log(err);
        }
      );
    }
    if (e.value.test === 'FAR') {
      const option = {
        page: this.getFirst,
        size: this.getRow,
        deadline: e.value.code,
      };
      this.projectService.getDeadlineProjectsFurthest(option).subscribe(
        data => {
          console.log(data);
          this.allProjects = data.response;
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  checkStatus(project: any): any {
    if (project.status === 'OPEN') {
      return 'bgOpen';
    } else if (project.status === 'NEW') {
      return 'bgNew';
    } else {
      return 'bgDoing';
    }
  }

  findProjectImages(): any {
    console.log('image');
  }

  private onSuccess(project: IProject[], headers: HttpHeaders): void {
    this.totalRecords = Number(headers.get('X-Total-Count'));
    console.log('totalRecords', this.totalRecords);
    this.allProjects = project;
  }
}

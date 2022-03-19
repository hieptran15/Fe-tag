import { UploadService } from './../../../shared/service/upload.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { JhiEventManager } from 'ng-jhipster';
import { Subscription } from 'rxjs';

@Component({
  selector: 'jhi-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
})
export class ProfileDetailsComponent implements OnInit, OnDestroy {
  profile: any;
  imgUrl: any;
  percent: any;
  changeText = false;
  fileToUpload: any = null;
  showModalAvatar = false;
  fileName: any;
  profileProcess: any;
  listItems: any;
  router = [{ router: 'info' }, { router: 'language' }];
  reloadProfileSubscription: Subscription;

  constructor(private profileService: ProfileService, private uploadService: UploadService, private eventManager: JhiEventManager) {
    this.reloadProfileSubscription = eventManager.subscribe('reloadProfileStatus', () => {
      this.getListProcessItems();
    });
  }

  ngOnDestroy(): void {
    // unsubscribe event
    this.reloadProfileSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getProfile();
    this.getPercent();
    this.getListProcessItems();
  }

  getProfile(): any {
    this.profileService.getUserProfile().subscribe(
      data => {
        this.profile = data.response;
        this.imgUrl = data.response.profilePic;
      },
      err => {
        console.log(err);
      }
    );
  }

  confirmAvatar(): void {
    const formData = new FormData();
    formData.append('file', this.fileToUpload);
    this.uploadService.uploadImage(formData).subscribe(
      (res: any) => {
        const url = res.response?.fileName;
        this.profileService.getLinkUpload(url).subscribe(
          data => {
            this.profileService
              .updateProfile({
                ...this.profile,
                profilePic: data.response,
              })
              .subscribe(
                () => {
                  this.getProfile();
                  this.showModalAvatar = false;
                },
                (err: any) => {
                  console.log(err);
                }
              );
          },
          (err: any) => {
            console.log(err);
          }
        );
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  getPercent(): void {
    this.profileService.getPercent().subscribe(
      data => {
        this.percent = data.response.profileProgess;
      },
      err => {
        console.log(err);
      }
    );
  }

  uploadFile(event: any): void {
    console.log(event);
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.fileToUpload = file;
      const reader = new FileReader();
      reader.onload = e => (this.imgUrl = reader.result);
      reader.readAsDataURL(file);
    }
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
}

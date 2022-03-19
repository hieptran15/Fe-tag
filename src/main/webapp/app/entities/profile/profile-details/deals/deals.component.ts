import { Component, OnInit } from '@angular/core';
import { ProfileService } from './../../../../layouts/profiles/profile.service';
@Component({
  selector: 'jhi-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss'],
})
export class DealsComponent implements OnInit {
  profile: any;
  displayModal: boolean | undefined;
  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.getProfile();
  }
  getProfile(): any {
    this.profileService.getUserProfile().subscribe(
      data => {
        this.profile = data.response;
        console.log(5, this.profile);
      },
      err => {
        console.log(err);
      }
    );
  }
  showModalDialog(): any {
    this.displayModal = true;
  }
}

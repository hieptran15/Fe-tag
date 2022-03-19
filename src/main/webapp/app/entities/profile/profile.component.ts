import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProfileService } from 'app/layouts/profiles/profile.service';

@Component({
  selector: 'jhi-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any;
  constructor(
    private alertService: MessageService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.profileService.getUserProfile().subscribe(data => {
      this.user = data.response;
    });
  }
}

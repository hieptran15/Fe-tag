import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../../layouts/profiles/profile.service';
import { FormBuilder, Validators } from '@angular/forms';
import { LocationService } from '../../../../shared/util/location.service';
import { ConfirmPasswordValidator } from 'app/entities/profile/profile-details/loginsecurity/confirm-password.validator';

@Component({
  selector: 'jhi-loginsecurity',
  templateUrl: './loginsecurity.component.html',
  styleUrls: ['./loginsecurity.component.scss'],
})
export class LoginsecurityComponent implements OnInit {
  contactForm: any;
  profile: any;
  password: any;
  isEditContact = false;
  isEditLocation = false;
  showModalContact = false;
  showModalChangePassWord = false;
  rePassword: any;
  newPassword: any;

  constructor(private locationService: LocationService, private profileService: ProfileService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group(
      {
        password: ['', Validators.required],
        newPassword: ['', Validators.required],
        rePassword: ['', Validators.required],
      },
      {
        validator: ConfirmPasswordValidator('newPassword', 'rePassword'),
      }
    );
    this.getProfile();
  }

  showEditContact(): any {
    this.isEditLocation = !this.isEditLocation;
    this.isEditContact = !this.isEditContact;
  }

  closeEditContact(): any {
    this.isEditContact = !this.isEditContact;
  }

  updateContact(): any {
    this.rePassword = this.showModalContact = true;
  }

  updateLocation(): any {
    this.showModalChangePassWord = true;
  }
  showEditLocation(): any {
    this.isEditLocation = !this.isEditLocation;
  }

  closeEditLocation(): any {
    this.isEditLocation = !this.isEditLocation;
  }

  onSubmit(): any {}

  getProfile(): any {
    this.profileService.getUserProfile().subscribe(
      data => {
        this.profile = data.response;
      },
      err => {
        console.log(err);
      }
    );
  }

  changePassword(): any {
    this.locationService
      .changePassword({
        currentPassword: this.contactForm.get('password').value,
        newPassword: this.contactForm.get('newPassword').value,
      })
      .subscribe(
        data => {
          this.showModalChangePassWord = !this.showModalChangePassWord;
          this.isEditContact = !this.isEditContact;
          this.newPassword = data.response.map((i: any) => {
            return { lable: i.title };
          });
        },
        err => {
          console.log(err);
        }
      );
  }
}

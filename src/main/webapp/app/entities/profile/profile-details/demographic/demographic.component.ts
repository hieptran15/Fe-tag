import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../../layouts/profiles/profile.service';
import { FormBuilder, Validators } from '@angular/forms';
import { LocationService } from '../../../../shared/util/location.service';

@Component({
  selector: 'jhi-demographic',
  templateUrl: './demographic.component.html',
  styleUrls: ['./demographic.component.scss'],
})
export class DemographicComponent implements OnInit {
  contactForm: any;
  listYears: any[] = [];
  d = new Date();
  ethnics: any[] = [];
  locationForm: any;
  profile: any = {};
  isEditContact = false;
  isEditDemographic = false;
  showModalContact = false;
  showModalDemographic = false;
  Years: any;

  constructor(private locationService: LocationService, private profileService: ProfileService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    for (let i = 1990; i < this.d.getFullYear(); i++) {
      this.listYears.push(i);
    }
    this.locationForm = this.formBuilder.group({
      gender: ['', [Validators.required]],
      yearOfBirth: ['', [Validators.required]],
      ethnic: [null, [Validators.required]],
      identification: ['', [Validators.required]],
    });
    this.getProfile();
    this.getEthnic();
  }

  updateLocation(): any {
    this.showModalDemographic = true;
  }

  closeEditLocation(): any {
    this.isEditDemographic = !this.isEditDemographic;
  }

  showEditLocation(profile: any): any {
    console.log('12', profile);
    this.locationForm.patchValue({
      gender: profile.sex,
      yearOfBirth: profile.yearOfBirth,
      ethnic: profile.ethnic && profile.ethnic.code,
      identification: profile.identification,
    });
    this.isEditDemographic = !this.isEditDemographic;
  }

  confirmDemographic(): any {
    // console.log(this.locationForm.value);
    // this.profileService
    //   .updateLocation({
    //     ...this.profile,
    //     sex: this.locationForm.get('gender').value,
    //     yearOfBirth: this.locationForm.get('yearOfBirth').value,
    //     ethnic: this.ethnics.find(et => et.code === this.locationForm.get('ethnic').value),
    //     identification: this.locationForm.get('identification').value,
    //   })
    //   .subscribe(
    //     () => {
    //       this.showModalDemographic = !this.showModalDemographic;
    //       this.isEditDemographic = !this.isEditDemographic;
    //       this.getProfile();
    //     },
    //     (err: any) => {
    //       console.log(err);
    //     }
    //   );
  }

  getProfile(): any {
    this.profileService.getUserProfile().subscribe(
      data => {
        this.profile = data.response;
        console.log('23', this.profile);
      },
      err => {
        console.log(err);
      }
    );
  }
  getEthnic(): any {
    this.locationService.getEthnic().subscribe(
      data => {
        this.ethnics = data.response;
      },
      err => {
        console.log(err);
      }
    );
  }
  get checkDemographic(): any {
    return this.locationForm.controls;
  }
  changeGender(e: any): any {
    console.log(e.target.value);
  }

  onEthnicChanged(event: any): void {
    console.log('onEthnicChanged', event.target.value);
  }
}

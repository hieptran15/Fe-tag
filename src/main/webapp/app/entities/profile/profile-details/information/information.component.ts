import { ICountry } from './../../../../shared/model/country.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from './../../../../layouts/profiles/profile.service';
import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../../../shared/util/location.service';
import { JhiEventManager } from 'ng-jhipster';

@Component({
  selector: 'jhi-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss'],
})
export class InformationComponent implements OnInit {
  contactForm: any;
  d = new Date();
  city: any;
  district: any;
  profile: any;
  listItems: any;
  ListEthnics: any[] = [];
  country: any;
  address: any;
  postalCode: any;
  email: any;
  locationForm: any;
  phone: any;
  firstName: any;
  lastName: any;
  listCountry: ICountry[] = [];
  listCity: ICountry[] = [];
  listDistrict: ICountry[] = [];
  isEditProfile = false;
  showModalProfile = false;
  identification: any;
  years: any;
  yearOfBirth: any;
  ethnics: any;
  errLevel: any;
  gender: any;
  profileProcess: any;
  listYears: any[] = [];
  isEditting = true;
  showModalSuccess = false;
  firstPhone = { name: '(+84)', code: 1 };
  listPhone = [{ name: '(+84)', code: 1 }];

  sexes = [
    // { name: 'profile.info.select', code: null, inActive: false },
    { name: 'profile.info.male', code: 1, inActive: true },
    { name: 'profile.info.female', code: 0, inActive: true }
  ];
  regex = /^[^!@#$%^()~&*,./';<>?|:"`]*$/;
  regexName = /^[A-Z][a-z]+\s[A-Z][a-z]+$/;
  regexNumberOne = /[^0]/;
  regexNumber = /[0-9]/;
  regexSpace = /\s(?=\s)/g;
  validator: any = {
    country: true
  };
  myFormSubmit: any = { valid: true };

  constructor(private profileService: ProfileService, private formBuilder: FormBuilder, private locationService: LocationService,private eventManager: JhiEventManager) {
  }

  ngOnInit(): void {
    for (let i = 1990; i < this.d.getFullYear(); i++) {
      this.listYears.push({
        label: i,
        value: i,
      });
    }
    this.getCountry();
    this.getProfile();
    this.getEthnic();
  }

  showEditProfile(profile: any): any {
    (this.firstName = profile?.firstName),
      (this.lastName = profile?.lastName),
      (this.email = profile?.email),
      (this.ethnics = profile.ethnic && this.findInArray(this.ListEthnics, profile.ethnic, 'code')),
      (this.identification = profile?.identification),
      ((this.phone = profile.phone ? (profile?.phone?.split(' '))[1] : ''),
        (this.city = profile.city && this.findInArray(this.listCity, profile.city, 'code'))),
      (this.address = profile?.address),
      (this.district = profile.district && this.findInArray(this.listDistrict, profile.district, 'code')),
      (this.country = profile.country && this.findInArray(this.listCountry, profile.country, 'code')),
      (this.gender = this.sexes.find(item => profile.sex === item.code)),
      (this.years = profile?.yearOfBirth),
      (this.postalCode = profile?.postalCode);
    this.isEditProfile = !this.isEditProfile;
    console.log(this.phone);
  }

  closeEditProfile(): any {
    this.isEditProfile = !this.isEditProfile;
  }

  confirmProfile(): any {
    this.profileService
      .updateProfile({
        ...this.profile,
        firstName: this.firstName.replace(this.regexSpace, '').trim(),
        lastName: this.lastName,
        email: this.email,
        ethnic: this.ethnics,
        identification: this.identification,
        phone: `${this.firstPhone.name} ${this.phone}`,
        city: this.city,
        district: this.district,
        address: this.address.replace(this.regexSpace, '').trim(),
        country: this.country,
        sex: this.gender?.code,
        yearOfBirth: this.years,
        postalCode: this.postalCode,
      })
      .subscribe(
        () => {
          this.showModalSuccess = !this.showModalSuccess;
          this.showModalProfile = !this.showModalProfile;
          this.isEditProfile = !this.isEditProfile;
          this.getProfile();
          this.getListProcessItems();
          this.eventManager.broadcast('reloadProfileStatus');
        },
        (err: any) => {
          console.log(err);
        }
      );
  }

  getProfile(): any {
    this.profileService.getUserProfile().subscribe(
      data => {
        this.profile = data.response;
        this.locationService.getCity(data.response?.country?.code).subscribe(
          dt => {
            this.listCity = dt.response;
          },
          err => {
            console.log(err);
          }
        );

        this.locationService.getDistrict(data.response?.city?.code).subscribe(
          dt => {
            this.listDistrict = dt.response;
          },
          err => {
            console.log(err);
          }
        );
      },
      err => {
        console.log(err);
      }
    );
  }

  getEthnic(): any {
    this.locationService.getEthnic().subscribe(
      data => {
        this.ListEthnics = data.response;
      },
      err => {
        console.log(err);
      }
    );
  }

  getCountry(): any {
    this.locationService.getCountry().subscribe(
      data => {
        this.listCountry = data.response.filter((item: any) => item.areaLevel === 1);
      },
      err => {
        console.log(err);
      }
    );
  }

  getCity(e: any): any {
    this.locationService.getCity(e.value?.code).subscribe(
      data => {
        this.listCity = data.response;
        //console.log(3,this.listCity)
        // this.listCity.unshift({'name': '-- Chọn thành phố --'});
        // console.log('listciti',this.listCity)
        this.checkLocation();
        console.log(this.myFormSubmit);
      },
      err => {
        console.log(err);
      }
    );
  }

  getDistrict(e: any): any {
    this.locationService.getCity(e.value?.code).subscribe(
      data => {
        this.listDistrict = data.response;
        this.checkLocation();
        console.log(this.myFormSubmit);
      },
      err => {
        console.log(err);
      }
    );
  }

  check(myForm: any): any {
    this.showModalProfile = true;
  }

  // onPressSpace(e: any): void {
  //   e.preventDefault();
  // }
  onPressSpace(event: any): void {
    if (!this.regexName.test(event.key)) {
      event.preventDefault();
    }
  }

  findInArray<T>(array: Array<T>, object: T, key: string): T | null | undefined {
    return array.find((item: T) => item[key] === object[key]) ? array.find((item: T) => item[key] === object[key]) : null;
  }

  onKeyPress(event: any, regex: any): void {
    console.log('event', event);
    if (!regex.test(event.key)) {
      event.preventDefault();
    }
  }

  onKeyPressPhone(event: any): void {
    if (this.phone?.length === 0) {
      if (!this.regexNumberOne.test(event.key)) {
        event.preventDefault();
      }
    } else {
      if (!this.regexNumber.test(event.key)) {
        event.preventDefault();
      }
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

  getMale(): any {
    if (this.profile?.sex === null) {
      return null;
    }
    return this.sexes.find((item: any) => item.code === this.profile?.sex)?.name;
  }

  changeValueSex($event: any): void {
    console.log($event.value.code);
    if ($event.value.code != null) {
      this.gender = $event.value;
    }
    console.log('gender', this.gender);
  }

  onClick(event: any): void {
    console.log('On clicked');
    event.preventDefault();
    event.stopPropagation();
  }

  checkLocation(): void {
    const listToCheck = ['country', 'city', 'district'];
    let valid = true;
    for (let i = 0; i < listToCheck.length; i++) {
      const item: any = listToCheck[i];
      valid = (this[item] && this[item].length !== 0);
      valid = valid === null ? false : valid;
      console.log(item, valid);
      if (valid === false) {
        this.myFormSubmit.valid = valid;
        break;
      }
    }
    this.myFormSubmit.valid = valid;
  }

  districtChange($event: any): void {
    this.district = $event.value;
    this.checkLocation();
    console.log('districtChange', this.myFormSubmit.valid);
  }

}

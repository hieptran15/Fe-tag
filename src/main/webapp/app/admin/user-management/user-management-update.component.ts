import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { LANGUAGES } from 'app/core/language/language.constants';
import { IUser, User } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { Authority } from 'app/shared/constants/authority.constants';
import { drinkLevels, studyLevels, languages } from 'app/shared/constants/user-info.constants';
import { UploadService } from '../../shared/service/upload.service';
import { isDevMode } from '@angular/core';
import { formatDate } from '@angular/common';
import { uploadPicture } from '../../shared/util/common-utils';
import { IRegisterInfo } from '../../shared/model/register-info.model';
import { map } from 'rxjs/operators';
import { Observable, zip } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'jhi-user-mgmt-update',
  templateUrl: './user-management-update.component.html',
})
export class UserManagementUpdateComponent implements OnInit {
  uploadPicture = uploadPicture;
  user!: User;
  languages_web = LANGUAGES;
  authorities: string[] = [];
  lang: string[] = [];
  isSaving = false;
  Authority = Authority;
  drinkLevels = drinkLevels;
  studyLevels = studyLevels;
  languages = languages;
  formData = new FormData();
  imageHostForDevMode = '';

  personalIdImg = {
    src: '',
    obj: null,
    changed: false,
  };

  personalIdImgBack = {
    src: '',
    obj: null,
    changed: false,
  };

  carLicenseImgFront = {
    src: '',
    obj: null,
    changed: false,
  };

  carLicenseImgBack = {
    src: '',
    obj: null,
    changed: false,
  };

  bikeLicenseImgFront = {
    src: '',
    obj: null,
    changed: false,
  };

  bikeLicenseImgBack = {
    src: '',
    obj: null,
    changed: false,
  };

  primaryImg = {
    src: '',
    obj: null,
    changed: false,
  };

  editForm = this.fb.group({
    id: [],
    login: [
      '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),
      ],
    ],
    firstName: ['', [Validators.maxLength(50)]],
    lastName: ['', [Validators.maxLength(50)]],
    email: ['', [Validators.minLength(5), Validators.maxLength(254), Validators.email]],
    activated: [],
    langKey: [],
    authorities: [],
    description: [],
    drinkLevel: [],
    studyLevel: [],
    imageUrl: [],
    lang: [],
    sex: [],
    expiredDate: [],
    paymentRate: [''],
    personalId: ['', [Validators.required]],
    personalIdImageBack: [],
    personalIdImage: [],
    driverLicenseMotorbikeFront: [],
    driverLicenseMotorbikeBack: [],
    driverLicenseCarFront: [],
    driverLicenseCarBack: [],
  });

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private uploadService: UploadService
  ) {
    if (process.env.NODE_ENV === 'development') {
      this.imageHostForDevMode = 'http://103.1.238.67';
    }
  }

  ngOnInit(): void {
    this.route.data.subscribe(({ user }) => {
      if (user) {
        this.user = user;
        if (this.user.id === undefined) {
          this.user.activated = true;
        }
        if (this.user.imageUrl !== null && this.user.imageUrl!.trim() !== '') {
          this.primaryImg.src = this.user.imageUrl!;
        }
        if (this.user.personalIdImage !== null && this.user.personalIdImage!.trim() !== '') {
          this.personalIdImg.src = this.user.personalIdImage!;
        }
        if (this.user.personalIdImageBack !== null && this.user.personalIdImageBack!.trim() !== '') {
          this.personalIdImgBack.src = this.user.personalIdImageBack!;
        }
        if (this.user.driverLicenseMotorbikeFront !== null && this.user.driverLicenseMotorbikeFront!.trim() !== '') {
          this.bikeLicenseImgFront.src = this.user.driverLicenseMotorbikeFront!;
        }
        if (this.user.driverLicenseMotorbikeBack !== null && this.user.driverLicenseMotorbikeBack!.trim() !== '') {
          this.bikeLicenseImgBack.src = this.user.driverLicenseMotorbikeBack!;
        }
        if (this.user.driverLicenseCarFront !== null && this.user.driverLicenseCarFront!.trim() !== '') {
          this.carLicenseImgFront.src = this.user.driverLicenseCarFront!;
        }
        if (this.user.driverLicenseCarBack !== null && this.user.driverLicenseCarBack!.trim() !== '') {
          this.carLicenseImgBack.src = this.user.driverLicenseCarBack!;
        }
        this.updateForm(user);
      }
    });
    this.userService.authorities().subscribe(authorities => {
      this.authorities = authorities.body!;
    });
  }

  previousState(): void {
    window.history.back();
  }

  onSave(): void {
    this.isSaving = true;
    this.updateUser(this.user);
    // Upload image first to get the url, then save user information

    const allUploadImageObservables: Observable<HttpResponse<any>>[] = [];

    // upload images
    this.addImageUploadObservables(this.personalIdImg, allUploadImageObservables, this.user, 'personalIdImage');
    this.addImageUploadObservables(this.personalIdImgBack, allUploadImageObservables, this.user, 'personalIdImageBack');
    this.addImageUploadObservables(this.primaryImg, allUploadImageObservables, this.user, 'imageUrl');
    this.addImageUploadObservables(this.bikeLicenseImgFront, allUploadImageObservables, this.user, 'driverLicenseMotorbikeFront');
    this.addImageUploadObservables(this.bikeLicenseImgBack, allUploadImageObservables, this.user, 'driverLicenseMotorbikeBack');
    this.addImageUploadObservables(this.carLicenseImgFront, allUploadImageObservables, this.user, 'driverLicenseCarFront');
    this.addImageUploadObservables(this.carLicenseImgBack, allUploadImageObservables, this.user, 'driverLicenseCarBack');

    if (allUploadImageObservables.length > 0) {
      zip(...allUploadImageObservables).subscribe(values => {
        console.log('finish uploading images: ', values);
        this.save();
      });
    } else {
      this.save();
    }
  }

  private save(): void {
    if (this.user.id !== undefined) {
      this.userService.update(this.user).subscribe(
        () => this.onSaveSuccess(),
        () => this.onSaveError()
      );
    } else {
      this.userService.create(this.user).subscribe(
        () => this.onSaveSuccess(),
        () => this.onSaveError()
      );
    }
  }

  private updateForm(user: User): void {
    this.lang = [];
    const currentLang: number = user.lang ? user.lang : 0;
    languages.forEach((language, index) => {
      if ((Math.pow(2, index) & currentLang) === Math.pow(2, index)) {
        this.lang.push(language);
      }
    });
    console.log('user.expiredDate: ', user.expiredDate);

    this.editForm.patchValue({
      id: user.id,
      login: user.login,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      activated: user.activated,
      langKey: user.langKey,
      authorities: user.authorities,
      description: user.description,
      drinkLevel: user.drinkLevel,
      studyLevel: user.study,
      imageUrl: user.imageUrl,
      lang: this.lang,
      sex: user.sex,
      paymentRate: user.paymentRate,
      expiredDate: user.expiredDate !== null ? formatDate(user.expiredDate!.toString(), 'yyyy-MM-dd', 'en') : '',
      personalId: user.personalId,
      personalIdImage: user.personalIdImage,
      personalIdImageBack: user.personalIdImageBack,
      driverLicenseMotorbikeFront: user.driverLicenseMotorbikeFront,
      driverLicenseMotorbikeBack: user.driverLicenseMotorbikeBack,
      driverLicenseCarFront: user.driverLicenseCarFront,
      driverLicenseCarBack: user.driverLicenseCarBack,
      // expiredDate: user.expiredDate,
    });
  }

  private updateUser(user: User): void {
    let langValue = 0;
    this.editForm.get(['lang'])!.value.forEach((language: string) => {
      langValue =
        langValue + (this.languages.findIndex(lang => lang === language) === -1 ? 0 : Math.pow(2, this.languages.indexOf(language)));
    });
    console.log('Update user infor before saving: ', langValue);
    user.login = this.editForm.get(['login'])!.value;
    user.firstName = this.editForm.get(['firstName'])!.value;
    user.lastName = this.editForm.get(['lastName'])!.value;
    user.email = this.editForm.get(['email'])!.value;
    user.activated = this.editForm.get(['activated'])!.value;
    user.langKey = this.editForm.get(['langKey'])!.value;
    user.authorities = this.editForm.get(['authorities'])!.value;
    user.description = this.editForm.get(['description'])!.value;
    user.drinkLevel = parseInt(this.editForm.get(['drinkLevel'])!.value, 10);
    user.study = parseInt(this.editForm.get(['studyLevel'])!.value, 10);
    user.imageUrl = this.editForm.get(['imageUrl'])!.value;
    user.sex = this.editForm.get(['sex'])!.value;
    user.paymentRate = this.editForm.get(['paymentRate'])!.value;
    user.lang = langValue;
    user.expiredDate = new Date(this.editForm.get(['expiredDate'])!.value);
    user.personalIdImage = this.editForm.get(['personalIdImage'])!.value;
    user.personalIdImageBack = this.editForm.get(['personalIdImageBack'])!.value;
    user.personalId = this.editForm.get(['personalId'])!.value;
    user.driverLicenseMotorbikeFront = this.editForm.get(['driverLicenseMotorbikeFront'])!.value;
    user.driverLicenseMotorbikeBack = this.editForm.get(['driverLicenseMotorbikeBack'])!.value;
    user.driverLicenseCarFront = this.editForm.get(['driverLicenseCarFront'])!.value;
    user.driverLicenseCarBack = this.editForm.get(['driverLicenseCarBack'])!.value;
  }

  private onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  private onSaveError(): void {
    this.isSaving = false;
  }

  extendExpiredDate(month: number): void {
    const date = new Date(this.editForm.get(['expiredDate'])!.value);
    date.setMonth(date.getMonth() + month);
    console.log('Date: ', date);
    this.editForm.patchValue({
      expiredDate: formatDate(date.toString(), 'yyyy-MM-dd', 'en'),
    });
  }

  addImageUploadObservables(field: any, currentList: any, user: IUser, saveField: any): void {
    if (field.changed && field.obj != null) {
      const formData = new FormData();
      formData.append('username', user.login!);
      formData.append('file', field.obj!);
      currentList.push(
        this.uploadService.uploadImage(formData).pipe(
          map(item => {
            // console.log('Finish uploading cmt back image');
            // user[saveField] = item.body;
            return item;
          })
        )
      );
    }
  }
}

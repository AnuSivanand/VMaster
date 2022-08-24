import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomValidators } from 'src/app/shared/common/CustomValidators';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public changePassForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private toastrService: ToastrService,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.changePassForm = this.fb.group({
      currentPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmNewPassword: new FormControl('', [Validators.required])
    }, {
      validator: CustomValidators.mustMatch('newPassword', 'confirmNewPassword')
    }
    );
  }

  get formValues() {
    return this.changePassForm.controls;
  }

  onUpdatePassword() {
    let formVal = this.changePassForm.getRawValue();
    let changePassItem = {
      'current-password': formVal.currentPassword,
      'new-password': formVal.newPassword
    }
    this.apiService.changePassword(changePassItem).subscribe((resp) => {
      if (resp && resp.status === true) {
        this.toastrService.success(resp.message);
        setTimeout(()=>{
          this.authService.logout().subscribe((resp) => {
          this.authService.finishLogout();
          });
        },1000);
        
      } else {
        this.toastrService.error(resp.message);
      }
    });
  };
}



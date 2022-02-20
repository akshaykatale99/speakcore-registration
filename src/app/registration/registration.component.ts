import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RegistrationService } from '../services/registration.service';
import { StatesService } from '../services/states.service';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { State } from '../models/states.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  activeStep = 0;
  isLoading = false;
  stepData: any[] = [{
    title: 'Login',
    indicator: 'Register'
  }, {
    title: 'Contact Information',
    indicator: 'Submit Info'
  }, {
    title: 'Complete',
    indicator: 'Complete'
  }];
  password: String = '';
  staticPassword: String = '12345678';
  registrationForm: FormGroup;
  states$: Observable<State[]>;
  constructor(
    private toast: ToastrService,
    private registration: RegistrationService,
    public statesservice: StatesService
  ) { 

    this.states$ = this.statesservice.getStates();

    this.registrationForm = new FormGroup({
      firstName: new FormControl('',[
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50)
          // this.valider.validAlphaOnly
      ]),
      lastName: new FormControl('',[
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50)
          // this.valider.validAlphaOnly
      ]),
      state: new FormControl('',[
          Validators.required,
        ]),
      email: new FormControl('',[
          Validators.required,
          Validators.email,
          Validators.minLength(5),
          Validators.maxLength(50)
      ]),
      confirmEmail: new FormControl('',[
        Validators.required,
        Validators.email,
        Validators.minLength(5),
        Validators.maxLength(50)
        // this.validateConfirmPassword
      ]),
      subscribe: new FormControl(false),
    }, { validators: [
      this.checkEmail
    ] });

  }

  ngOnInit(): void {
  }

  login(){
    if(this.password != this.staticPassword){
      this.toast.error("Invalid Password", "", {
        timeOut: 3000,
        positionClass: "toast-bottom-center"
      });
      return;
    }

    this.activeStep++;
  }

  checkEmail: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    // console.log(group);
    let email = group.get('email')?.value;
    let confirmEmail = group.get('confirmEmail')?.value;
    return email === confirmEmail ? null : { notSame: true }
  }

  onSubmitRegistration(){
    if(this.registrationForm.invalid){
      this.registrationForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.registration.registerUser(this.registrationForm.value).subscribe({
      next: data => {
        this.isLoading = false;
        // console.log(data.id);
        this.activeStep++;
      },
      error: error => {
        this.isLoading = false;
        this.toast.error(error, "", {
          timeOut: 3000,
          positionClass: "toast-bottom-center"
        });
        console.log(error);
      }
    })
  }

  // validateConfirmPassword: ValidatorFn = (control: AbstractControl) : ValidationErrors | null => {
	// 	if (!control.parent) {
  //     return null;
  //   }
	// 	// if(/\D/.test(control.value)){
	// 	// 	errors['invalid'] = true;
	// 	// }
  //   let confirmEmail = control;
  //   let email = control.parent?.get('email') as FormControl;
    
  //   if (email.value !== confirmEmail.value) {
  //     return { notMatch: true };
  //   }

	// 	return null;
	// }

}

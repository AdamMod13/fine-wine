import {Component, ComponentFactoryResolver, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
import {SpinnerService} from "../Shared/spinner/spinner.service";
import {ErrorModalService} from "../Shared/error-modal/error-modal.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {
  private closeSub: Subscription;
  private storeSub: Subscription;

  public isLoginMode: boolean = true;
  public error: string | null = null;

  public showLoginModal: boolean = false;
  public showSignUpModal: boolean = false;

  public loginForm = new FormGroup({
    email: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required),
  })

  public signUpForm = new FormGroup({
    email: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required),
  })

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>,
    private spinnerService: SpinnerService,
    public errorService: ErrorModalService
  ) {
  }

  ngOnInit() {
    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.error = authState.authError;
      if (this.error) {
        this.errorService.open(this.error);
      }
      if (authState.user) {
        this.closeModals();
        this.closeSubscriptions();
      }
      this.spinnerService.setLoading(false);
    });
  }

  openLoginModal() {
    this.showLoginModal = true;
    this.isLoginMode = true;
  }

  openSignUpModal() {
    this.showSignUpModal = true;
    this.isLoginMode = false;
  }

  onSubmitLoginForm() {
    if (!this.loginForm.valid) {
      this.loginForm.controls['email']?.markAsTouched();
      this.loginForm.controls['password']?.markAsTouched();
      return;
    }
    const email = this.loginForm.controls['email']?.value;
    const password = this.loginForm.controls['password']?.value;

    if (this.isLoginMode && email && password) {
      this.spinnerService.setLoading(true);
      this.store.dispatch(
        new AuthActions.LoginStart({email: email, password: password})
      );
    }

    this.loginForm.reset();
  }

  onSubmitSignUpForm() {
    if (!this.signUpForm.valid) {
      this.loginForm.controls['email']?.markAsTouched();
      this.loginForm.controls['password']?.markAsTouched();
      return;
    }
    const email = this.signUpForm.controls['email']?.value;
    const password = this.signUpForm.controls['password']?.value;

    if (!this.isLoginMode && email && password) {
      this.spinnerService.setLoading(true);
      this.store.dispatch(
        new AuthActions.SignupStart({email: email, password: password})
      );
    }

    this.signUpForm.reset();
  }

  closeLoginForm() {
    this.showLoginModal = false;
    this.loginForm.reset();
  }

  closeSignUpForm() {
    this.showSignUpModal = false;
    this.signUpForm.reset();
  }

  closeModals() {
    this.closeLoginForm();
    this.closeSignUpForm();
  }

  clearLoginForm() {
    this.loginForm.reset();
  }

  clearSignUpForm() {
    this.signUpForm.reset();
  }

  onHandleError() {
    this.store.dispatch(new AuthActions.ClearError());
  }

  closeSubscriptions() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  ngOnDestroy() {
    this.closeSubscriptions();
  }
}

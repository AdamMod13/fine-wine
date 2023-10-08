import {Component, ComponentFactoryResolver, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {
  private closeSub: Subscription;
  private storeSub: Subscription;

  public isLoginMode: boolean = true;
  public isLoading: boolean = false;
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
    private store: Store<fromApp.AppState>
  ) {
  }

  ngOnInit() {
    this.storeSub = this.store.select('auth').subscribe(authState => {
      console.log(authState)
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error) {
        // this.showErrorAlert(this.error);
      }
      if (authState.user) {
        this.closeModals();
        this.closeSubscriptions();
      }
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
      return;
    }
    const email = this.loginForm.controls['email']?.value;
    const password = this.loginForm.controls['email']?.value;

    if (this.isLoginMode && email && password) {
      this.store.dispatch(
        new AuthActions.LoginStart({email: email, password: password})
      );
    }

    this.loginForm.reset();
  }

  onSubmitSignUpForm() {
    if (!this.signUpForm.valid) {
      return;
    }
    const email = this.signUpForm.controls['email']?.value;
    const password = this.signUpForm.controls['email']?.value;

    if (!this.isLoginMode && email && password) {
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

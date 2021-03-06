import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatMenuModule } from '@angular/material/menu';

import { TestAuthService } from './services/auth/test-auth.service';
import { AccountService } from './services/account/account.service';
import { AuthService } from './services/auth/auth.service';
import { TestingAccountService } from './services/account/test-account.service';

import { ApiRoutes } from './utilities/api-routes';
import { UserInterfaceResources } from './utilities/user-interface.resources';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let appComponent: AppComponent;
  let authService: AuthService;
  let accountService: AccountService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatMenuModule, MatToolbarModule],

      providers: [
        AppComponent,
        { provide: AuthService, useClass: TestAuthService },
        { provide: AccountService, useClass: TestingAccountService },
      ],
      declarations: [AppComponent],
    }).compileComponents();

    router = TestBed.inject(Router);
    appComponent = TestBed.inject(AppComponent);
    authService = TestBed.inject(AuthService);
    accountService = TestBed.inject(AccountService);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render specific labels for non authorized guests', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.logo span').textContent).toEqual(UserInterfaceResources.appNameLabel);
    expect(compiled.querySelector('.username').textContent).toEqual(`${UserInterfaceResources.welcomeMessageLabel} Guest`);
    expect(compiled.querySelector('a.home').textContent).toEqual(UserInterfaceResources.homeMenuLabel);
    expect(compiled.querySelector('a.about').textContent).toEqual(UserInterfaceResources.aboutMenuLabel);
    expect(compiled.querySelector('.copyright').textContent).toEqual(
      ` © ${new Date().getFullYear()} ${UserInterfaceResources.appNameLabel} - All Rights Reserved `
    );
    expect(compiled.querySelector('.login').textContent).toEqual(UserInterfaceResources.loginLabel.toUpperCase());
    expect(compiled.querySelector('.register').textContent).toEqual(UserInterfaceResources.registerLabel.toUpperCase());
  });

  it('#ngOnInit sets initial user parameters', () => {
    appComponent.ngOnInit();
    expect(appComponent.isAuthenticated).toBeFalsy();
    expect(appComponent.username).toEqual('Guest');
  });

  it('#logout logs out user and redirect to Guest route', () => {
    spyOn(accountService, 'logout');
    spyOn(router, 'navigate');
    appComponent.logout();
    expect(accountService.logout).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledWith([ApiRoutes.Default]);
  });

  it('#ngOnDestroy unsubscribes from parameter of AuthService', () => {
    spyOn(authService.isLoggedIn, 'unsubscribe');
    appComponent.ngOnDestroy();
    expect(authService.isLoggedIn.unsubscribe).toHaveBeenCalled();
  });
});

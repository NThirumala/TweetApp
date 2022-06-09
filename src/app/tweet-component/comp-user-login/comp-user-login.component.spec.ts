import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CompUserLoginComponent } from './comp-user-login.component';
import { UserServiceService } from 'src/app/services/user-service.service';
import { loginErrorResponse, loginSuccessResponse } from './comp-user-login.component.spec.util';
import { of } from 'rxjs';

describe('CompUserLoginComponent', () => {
  let component: CompUserLoginComponent;
  let fixture: ComponentFixture<CompUserLoginComponent>;
    let service : UserServiceService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompUserLoginComponent ],
      imports:[
          HttpClientTestingModule, RouterTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompUserLoginComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(UserServiceService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should check whether form is valid', () =>{
      component.loginform.controls.username.setValue('Thirumala.Nizampatnam@gmail.com');
      component.loginform.controls.password.setValue('thirumala');
      fixture.detectChanges();
      expect(component.loginform.valid).toBeTruthy();
  });
  it('should check whether submit is disabled', () =>{
      component.loginform.controls.username.setValue('');
      component.loginform.controls.password.setValue('');
      fixture.detectChanges();
      expect(component.loginform.invalid).toBeTruthy();
  });
  it('on click submit', () => {
    spyOn<any>(service, 'login').and.returnValue(of(loginSuccessResponse));
    spyOn<any>(sessionStorage,'setItem');
    fixture.detectChanges();
    component.login();
    expect(sessionStorage.setItem).toHaveBeenCalled();
  });
  it('should check whetheruser not founsd on click submit ', () =>{
    spyOn<any>(service, 'login').and.returnValue(of(loginErrorResponse));
    fixture.detectChanges();
    component.login();
    expect(component.userNotFound).toBe(true);
  })

});

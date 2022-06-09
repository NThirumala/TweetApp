import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { UserServiceService } from 'src/app/services/user-service.service';

import { CompUserRegisterComponent } from './comp-user-register.component';
import { registrationEmailInUseErrorResponse, registrationSuccess } from './comp-user-register.component.spec.util';

describe('CompUserRegisterComponent', () => {
  let component: CompUserRegisterComponent;
  let fixture: ComponentFixture<CompUserRegisterComponent>;
    let service : UserServiceService;
    let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompUserRegisterComponent ],
      imports:[RouterTestingModule, HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompUserRegisterComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(UserServiceService);
    router = TestBed.inject(Router);
    component.registrationForm.controls.password.setValue('thirumala');
    component.registrationForm.controls.cpassword.setValue('thirumala');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should check whether Registration Email is in use or not', () =>{
    spyOn<any>(service, 'adduser').and.returnValue(of(registrationEmailInUseErrorResponse));
    // component.registrationForm.controls.firstname.setValue('thirumala');
    // component.registrationForm.controls.lastname.setValue('devi');
    // component.registrationForm.controls.gender.setValue('Female');
    // component.registrationForm.controls.dob.setValue('01-06-1998');
    // component.registrationForm.controls.email.setValue('thirumala.nizampatnam@gmail.com');
    // component.registrationForm.controls.password.setValue('thirumala');
    // component.registrationForm.controls.cpassword.setValue('thirumala');
    // component.registrationForm.controls.contactnumber.setValue('7661828239');
    component.register();
    fixture.detectChanges();
    expect(component.registrationFailed).toBe(true);
    expect(component.msg).toBe('Email ID already in Use, please enter new email.');
  });
  it('should navigate to login page in succesul user registraion', () =>{
    const navigateSpy = spyOn(router, 'navigate');
    spyOn<any>(service, 'adduser').and.returnValue(of(registrationSuccess));
    component.register();
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });
  it('should check whether password and confirm password fields are different', () =>{
    component.registrationForm.controls.password.setValue('thirumala');
    component.registrationForm.controls.cpassword.setValue('thirumalaaaa');
    fixture.detectChanges();
    component.register();
    expect(component.cpassError).toBe(true);
  });
  it('should set erorr message when email invalid', () => {
    component.registrationForm.controls.email.setValue('thirumala.nizampatnam@gmail.comqwer');
    fixture.detectChanges();
    component.register();
    expect(component.registrationForm.invalid).toBeTruthy();
  });
  it('should set error message when date format missmatch', () =>{
    component.registrationForm.controls.dob.setValue('01-06-19');
    fixture.detectChanges();
    component.register();
    expect(component.registrationForm.controls.dob.errors?.pattern).toBeTruthy();
  });
  it('should set error message for invalid Contact number', () =>{
    component.registrationForm.controls.contactnumber.setValue('1231231231213');
    fixture.detectChanges();
    component.register();
    expect(component.registrationForm.controls.contactnumber.errors?.pattern).toBeTruthy();
  })
});

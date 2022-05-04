import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompUserLoginComponent } from './comp-user-login.component';

describe('CompUserLoginComponent', () => {
  let component: CompUserLoginComponent;
  let fixture: ComponentFixture<CompUserLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompUserLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompUserLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

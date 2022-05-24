import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompUserRegisterComponent } from './comp-user-register.component';

describe('CompUserRegisterComponent', () => {
  let component: CompUserRegisterComponent;
  let fixture: ComponentFixture<CompUserRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompUserRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompUserRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PkaskoComponent } from './pkasko.component';

describe('PkaskoComponent', () => {
  let component: PkaskoComponent;
  let fixture: ComponentFixture<PkaskoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PkaskoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PkaskoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

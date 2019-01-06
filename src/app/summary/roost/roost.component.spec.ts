import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoostComponent } from './roost.component';

describe('RoostComponent', () => {
  let component: RoostComponent;
  let fixture: ComponentFixture<RoostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

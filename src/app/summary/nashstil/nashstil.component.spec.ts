import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NashstilComponent } from './nashstil.component';

describe('NashstilComponent', () => {
  let component: NashstilComponent;
  let fixture: ComponentFixture<NashstilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NashstilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NashstilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

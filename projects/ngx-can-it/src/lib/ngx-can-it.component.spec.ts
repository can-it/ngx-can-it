import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxCanItComponent } from './ngx-can-it.component';

describe('NgxCanItComponent', () => {
  let component: NgxCanItComponent;
  let fixture: ComponentFixture<NgxCanItComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgxCanItComponent]
    });
    fixture = TestBed.createComponent(NgxCanItComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

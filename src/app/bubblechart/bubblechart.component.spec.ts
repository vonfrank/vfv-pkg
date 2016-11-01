/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BubblechartComponent } from './bubblechart.component';

describe('BubblechartComponent', () => {
  let component: BubblechartComponent;
  let fixture: ComponentFixture<BubblechartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BubblechartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BubblechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

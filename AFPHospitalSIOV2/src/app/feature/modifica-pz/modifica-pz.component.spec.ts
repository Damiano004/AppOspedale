/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ModificaPzComponent } from './modifica-pz.component';

describe('ModificaPzComponent', () => {
  let component: ModificaPzComponent;
  let fixture: ComponentFixture<ModificaPzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificaPzComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificaPzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

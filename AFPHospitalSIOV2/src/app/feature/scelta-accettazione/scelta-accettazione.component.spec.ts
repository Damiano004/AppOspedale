/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SceltaAccettazioneComponent } from './scelta-accettazione.component';

describe('SceltaAccettazioneComponent', () => {
  let component: SceltaAccettazioneComponent;
  let fixture: ComponentFixture<SceltaAccettazioneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SceltaAccettazioneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SceltaAccettazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

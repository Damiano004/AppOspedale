import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-scelta-accettazione',
  templateUrl: './scelta-accettazione.component.html',
  styleUrls: ['./scelta-accettazione.component.scss'],
  imports: [DividerModule, ButtonModule, RouterLink]
})
export class SceltaAccettazioneComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

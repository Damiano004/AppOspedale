import { Component, inject, input } from '@angular/core';
import { Paziente } from '../../core/models/Paziente.model';
import {DatePipe} from '@angular/common';
import { AFPHospitalAPIService } from '../../core/services/afphospital-api.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  imports:[DatePipe, CardModule, ButtonModule, DividerModule],
  styleUrls: ['./card.component.scss']
})
export class CardComponent{
  readonly pz = input.required<Paziente>();
  readonly api = inject(AFPHospitalAPIService);
}

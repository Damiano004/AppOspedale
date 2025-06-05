import { Component, inject, input, signal } from '@angular/core';
import { Paziente } from '../../core/models/Paziente.model';
import {DatePipe} from '@angular/common';
import { AFPHospitalAPIService } from '../../core/services/afphospital-api.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { SelectComponent } from "../select/select.component";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  imports: [DatePipe, CardModule, ButtonModule, DividerModule, DialogModule, SelectModule, SelectComponent],
  styleUrls: ['./card.component.scss'],
})
export class CardComponent{
  readonly pz = input.required<Paziente>();
  readonly api = inject(AFPHospitalAPIService);
  readonly idOs = signal<number>(-1);

  visibile: boolean = false;

  mostraPopUp() {
    this.visibile = true;
  }

  isDisabeled(): boolean{
    if(this.idOs() <0){
      return true;
    }
    return false;
  }

  trasferisciPaziente(){
    this.visibile = false;
    this.api.traferisciPaziente(this.pz().id_paziente, this.idOs())
  }
}

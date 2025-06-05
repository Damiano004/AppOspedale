import { Component, inject, signal } from '@angular/core';
import { AFPHospitalAPIService } from '../../core/services/afphospital-api.service';
import {RouterLink} from '@angular/router';
import { CardComponent } from "../../UI/card/card.component";
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { Ospedale } from '../../core/models/Paziente.model';

@Component({
  selector: 'app-lista-pz',
  imports: [RouterLink, CardComponent,ButtonModule,SelectModule],
  templateUrl: './lista-pz.component.html',
  styleUrl: './lista-pz.component.scss'
})
export class ListaPzComponent {
  api = inject(AFPHospitalAPIService);
  readonly ospedale = signal<Ospedale>({nome:'',id:0,citta:''});

  chiamaChangeOspedale(){
    this.api.changeHospital(this.ospedale())
  }
}

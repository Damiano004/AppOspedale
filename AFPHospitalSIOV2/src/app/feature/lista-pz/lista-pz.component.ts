import { Component, inject } from '@angular/core';
import { AFPHospitalAPIService } from '../../core/services/afphospital-api.service';
import {RouterLink} from '@angular/router';
import { CardComponent } from "../../UI/card/card.component";
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-lista-pz',
  imports: [RouterLink, CardComponent,ButtonModule],
  templateUrl: './lista-pz.component.html',
  styleUrl: './lista-pz.component.scss'
})
export class ListaPzComponent {
  api = inject(AFPHospitalAPIService);
}

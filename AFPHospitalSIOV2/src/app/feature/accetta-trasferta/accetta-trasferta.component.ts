import { Component, inject } from '@angular/core';
import { AFPHospitalAPIService } from '../../core/services/afphospital-api.service';
import { SelectModule } from 'primeng/select';
import { TransferCardComponent } from "../../UI/transfer-card/transfer-card.component";

@Component({
  selector: 'app-accetta-trasferta',
  templateUrl: './accetta-trasferta.component.html',
  styleUrls: ['./accetta-trasferta.component.scss'],
  imports: [SelectModule, TransferCardComponent]
})
export class AccettaTrasfertaComponent {
  readonly api = inject(AFPHospitalAPIService);

  changeHospital(event: any){
    this.api.changeHospital(event);
    this.api.getListaReparti;
  }
}

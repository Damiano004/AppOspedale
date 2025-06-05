import { Component, inject, input, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DatePipe } from '@angular/common';
import { Paziente, Reparto, StatoPZ } from '../../core/models/Paziente.model';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { AFPHospitalAPIService } from '../../core/services/afphospital-api.service';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-transfer-card',
  templateUrl: './transfer-card.component.html',
  styleUrls: ['./transfer-card.component.scss'],
  imports: [CardModule, ButtonModule, DatePipe, DividerModule, DialogModule, SelectModule]
})
export class TransferCardComponent implements OnInit{
  readonly api = inject(AFPHospitalAPIService);
  readonly pz = input.required<Paziente>();
  readonly statiPZ: StatoPZ[] = ['IN CARICO', 'IN ATTESA', 'NON FORNITO'];
  readonly stato = signal<StatoPZ>('NON FORNITO');
  readonly idRep = signal<number|null>(null);

  visibile: boolean = false;

  ngOnInit(): void {
    this.api.getListaReparti();
  }

  mostraPopUp() {
    this.visibile = true;
  }

  cambiaReparto(newRep: any){
    let tempRep = newRep.value as Reparto;

    if(!tempRep){
      console.log("il reparto selezionato è nullo");
      this.idRep.set(null);
      return;
    }
    console.log("impostato il reparto: ", tempRep.nome);
    this.idRep.set(tempRep.id);
  }

  cambiaStato(newStato: any){
    let tempStato = newStato.value;
    if(!tempStato){
      console.log("lo stato selezionato è nullo");
      this.stato.set('NON FORNITO');
      return;
    }
    console.log("impostato lo stato ", tempStato);
    this.stato.set(tempStato);
  }

  accettaTrasferimento(): void{
    this.visibile = false;
    let statoValue = this.stato() === 'NON FORNITO' ? null : this.stato();
    let params = {
      idPz: this.pz().id_paziente,
      stato: statoValue,
      id_reparto: this.idRep()
    };
    console.log("accettando paziente: ",params);
    this.api.accettaPazienteTrasferito(params);
  }
}

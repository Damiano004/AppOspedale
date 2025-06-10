import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ListboxModule } from 'primeng/listbox';
import { CodiceColore, ModificaPaziente, Paziente, Reparto, StatoPZ } from '../../core/models/Paziente.model';
import { ButtonModule } from 'primeng/button';
import { AFPHospitalAPIService } from '../../core/services/afphospital-api.service';
import { Router } from '@angular/router';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-modifica-pz',
  templateUrl: './modifica-pz.component.html',
  styleUrls: ['./modifica-pz.component.scss'],
  imports: [FloatLabelModule, ListboxModule, DatePickerModule, FormsModule, ButtonModule, SelectModule]
})
export class ModificaPzComponent implements OnInit{
  readonly api = inject(AFPHospitalAPIService);
  readonly #router = inject(Router);

  readonly pz = inject(Router).getCurrentNavigation()?.extras.state?.['pz'] as Paziente;
  readonly nome = signal<string>(this.pz.nome);
  readonly stato = signal<StatoPZ | null>(this.pz.stato);
  readonly cognome = signal<string>(this.pz.cognome);
  readonly dataNascita = signal<string>('');
  readonly dataNascitaParse = computed(() =>
    this.dataNascita() ? new Date(this.dataNascita()) : new Date('1970-01-01')
  )
  readonly codiceFiscale = signal<string>(this.pz.codice_fiscale);
  readonly codiceColore = signal<CodiceColore>(this.pz.codice_colore);
  readonly reparto = signal<number| null>(this.pz.id_reparto);
  readonly statiPZ: StatoPZ[] = ['IN CARICO', 'IN ATTESA', 'NON FORNITO'];
  readonly options = [
    { name: '⚪ BIANCO', value: 'BIANCO' },
    { name: '🟢 VERDE', value: 'VERDE' },
    { name: '🔵 AZZURRO', value: 'AZZURRO' },
    { name: '🟠 ARANCIONE', value: 'ARANCIONE' },
    { name: '🔴 ROSSO', value: 'ROSSO' }
  ];

  ngOnInit(): void {
    this.api.getListaReparti();
  }

  salvaModifica(){
    let pzTmp: ModificaPaziente = {
      codice: this.calcolaCodicePZ(),
      nome: this.nome(),
      cognome: this.cognome(),
      dataNascita: this.dataNascitaParse(),
      codiceFiscale: this.codiceFiscale(),
      codiceColore: this.codiceColore(),
      stato: this.stato(),
      reparto: this.reparto(),
      idPz: this.pz.id_paziente
    }
    console.log("sending: ",pzTmp);
    this.api.modificaPaziente(pzTmp);
    this.#router.navigate(['/lista-pz']);
  }

  calcolaCodicePZ(): string{
    let year = new Date().getFullYear();
    return this.nome().charAt(0) +
      this.cognome().charAt(0) +
      year;
  }

  cambiaReparto(newRep: any){
    let tempRep = newRep.value as Reparto;

    if(!tempRep){
      console.log("il reparto selezionato è nullo");
      this.reparto.set(null);
      return;
    }
    console.log("impostato il reparto: ", tempRep.nome);
    this.reparto.set(tempRep.id);
  }

  cambiaStato(newStato: any){
    let tempStato = newStato.value as StatoPZ;
    if(!tempStato || tempStato === 'NON FORNITO'){
      console.log("lo stato selezionato è nullo");
      this.stato.set(null);
      return;
    }
    console.log("impostato lo stato ", tempStato);
    this.stato.set(tempStato);
  }
}

import { Component, computed, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ListboxModule } from 'primeng/listbox';
import { CodiceColore, CreazionePaziente, ModificaPaziente, Paziente, StatoPZ } from '../../core/models/Paziente.model';
import { ButtonModule } from 'primeng/button';
import { AFPHospitalAPIService } from '../../core/services/afphospital-api.service';

@Component({
  selector: 'app-modifica-pz',
  templateUrl: './modifica-pz.component.html',
  styleUrls: ['./modifica-pz.component.css'],
  imports: [FloatLabelModule, ListboxModule, DatePickerModule, FormsModule, ButtonModule]
})
export class ModificaPzComponent {
  readonly #api = inject(AFPHospitalAPIService);

  readonly pz = input.required<Paziente>();
  readonly nome = signal<string>('');
  readonly stato = signal<StatoPZ>('NON FORNITO');
  readonly cognome = signal<string>('');
  readonly dataNascita = signal<string>('');
  readonly dataNascitaParse = computed(() =>
    this.dataNascita() ? new Date(this.dataNascita()) : new Date('1970-01-01')
  )
  readonly codiceFiscale = signal<string>('');
  readonly codiceColore = signal<CodiceColore>('NON FORNITO');
  readonly reparto = signal<number>(0);
  readonly options = [
    { name: '⚪ BIANCO', value: 'BIANCO' },
    { name: '🟢 VERDE', value: 'VERDE' },
    { name: '🔵 AZZURRO', value: 'AZZURRO' },
    { name: '🟠 ARANCIONE', value: 'ARANCIONE' },
    { name: '🔴 ROSSO', value: 'ROSSO' }
  ];

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
      idPz: this.pz().id_paziente
    }

  }

  calcolaCodicePZ(): string{
    return this.nome().charAt(0) +
      this.cognome().charAt(0) +
      this.dataNascitaParse().getFullYear()
  }
}

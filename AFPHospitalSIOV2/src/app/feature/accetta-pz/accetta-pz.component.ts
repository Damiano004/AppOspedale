import {Component, computed, inject, signal} from '@angular/core';
import {CodiceColore, CreazionePaziente} from '../../core/models/Paziente.model';
import {FormsModule} from '@angular/forms';
import {AFPHospitalAPIService} from '../../core/services/afphospital-api.service';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ListboxModule } from 'primeng/listbox';
import { ButtonModule } from 'primeng/button';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-accetta-pz',
  imports: [
    FormsModule,
    DatePickerModule,
    InputTextModule,
    FloatLabelModule,
    ListboxModule,
    ButtonModule,
    ToggleSwitchModule
  ],
  templateUrl: './accetta-pz.component.html',
  styleUrl: './accetta-pz.component.scss'
})
export class AccettaPzComponent {
  readonly #AFPHospitalAPI = inject(AFPHospitalAPIService);
  readonly #router = inject(Router);
  readonly options = [
  { name: '⚪ BIANCO', value: 'BIANCO' },
  { name: '🟢 VERDE', value: 'VERDE' },
  { name: '🔵 AZZURRO', value: 'AZZURRO' },
  { name: '🟠 ARANCIONE', value: 'ARANCIONE' },
  { name: '🔴 ROSSO', value: 'ROSSO' }
];

  /**
   * -- ANAGRAFICA
   * - nome
   * - cognome
   * - data di nascita ???
   * - codice fiscale
   *
   * -- PZ
   * - codice colore
   * - codie pz
   * - stato
   */
  tempId: number = 10;
  checked: boolean = false;
  readonly nome = signal<string>('');
  readonly cognome = signal<string>('');
  readonly dataNascita = signal<string>('');
  readonly dataNascitaParse = computed(() =>
    this.dataNascita() ? new Date(this.dataNascita()) : new Date('1970-01-01')
  )
  readonly codiceFiscale = signal<string>('');
  readonly codiceColore = signal<CodiceColore>('NON FORNITO');

  calcolaCodicePZ(): string{
    if(this.checked){
      let now = new Date();
      let formattedNow = formatDate(now, 'dd/MM/yyyy-HH:mm', 'it');
      this.nome.set(formattedNow);
      this.cognome.set('Paziente');
      this.tempId++;
      return'000'+this.tempId;
    }
    return this.nome().charAt(0) +
      this.cognome().charAt(0) +
      this.dataNascitaParse().getFullYear()
  }

  accettaPaziente(): void{
    let pzTmp: CreazionePaziente = {
      codice: this.calcolaCodicePZ(),
      nome: this.nome(),
      cognome: this.cognome(),
      dataNascita: this.dataNascitaParse(),
      codiceFiscale: this.getCodiceFiscale(),
      codiceColore: this.codiceColore(),
      stato: 'IN CARICO',
      id_ospedale: -1
    }
    console.log("mandando paziente");
    this.#AFPHospitalAPI.accettaPaziente(pzTmp);
    this.#router.navigate(['/lista-pz']);
  }

  /**
   * true -> DATI OK
   * false --> dati ko
   */
  validateInput(): boolean{
    if(!this.checked){
      if (!this.nome()) return false;
      if (!this.cognome()) return false;
      if (
        !this.codiceFiscale() ||
        this.codiceFiscale().length !== 16
      ) return false;
      if (!this.dataNascitaParse()) return false;
    }
    if (this.codiceColore() === 'NON FORNITO') return false;
    if (this.#AFPHospitalAPI.currentHospital() === -1) return false;

    return true;
  }

  getCodiceFiscale(): string {
    if(!this.checked){
      return this.codiceFiscale();
    }
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 16; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }


}

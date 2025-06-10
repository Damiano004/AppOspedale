import { ModificaPaziente, Reparto, StatoPZ } from './../models/Paziente.model';
import { computed, inject, Injectable, signal } from '@angular/core';
import {CreazionePaziente, Ospedale, Paziente} from '../models/Paziente.model';
import { HttpClient } from '@angular/common/http';
import { HttpRes } from '../models/RespManager';
import {finalize, map, retry} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AFPHospitalAPIService {

  readonly #URL = "http://localhost:3000";

  readonly #http = inject(HttpClient);
  readonly #router = inject(Router);

  readonly #selectedHospital = signal<number>(-1);
  readonly #listaOspedali = signal<Ospedale[]>([]);
  readonly #listaPz = signal<Paziente[]>([]);
  readonly #listaReparti = signal<Reparto[]>([]);

  listaOs = computed(() => this.#listaOspedali());
  listaRep = computed(() => this.#listaReparti());
  currentHospital = computed(() => this.#selectedHospital());
  listaPz = computed(() =>
    this.#listaPz().filter(pz => pz.stato !== 'TRASFERITO')
  );
  listaInTrasferta = computed(() =>
    this.#listaPz().filter(pz => pz.stato === 'TRASFERITO')
  );

  changeHospital(newHospital: any){
    console.log("value:")
    console.log(newHospital);
    let tempId = newHospital.value as number;

    if(!tempId || tempId< 0){
      console.log("il nuovo ospedale inserito non esiste o è stato inserito un id minore di 0");
      return;
    }
    console.log("messo un id: ",tempId)
    this.#selectedHospital.set(tempId);
    this.getListaPazienti();
  }

  getListaPazienti(): void{
    this.#http.get<HttpRes>(this.#URL+"/lista-pz/"+this.#selectedHospital())
    .pipe(
      retry(3),
      map((res) => JSON.parse(res.body as string) as Paziente[])
    )
    .subscribe((data) => this.#listaPz.set(data));
  }

  getListaOspedali(): void{
    this.#http.get<HttpRes>(this.#URL+"/lista-ospedali")
    .pipe(
      retry(3),
      map((res) => JSON.parse(res.body as string) as Ospedale[])
    )
    .subscribe((data) => this.#listaOspedali.set(data));
  }

  getListaReparti(): void{
    console.log("calling ",this.#URL+"/lista-reparti/"+this.#selectedHospital());
    this.#http.get<HttpRes>(this.#URL+"/lista-reparti/"+this.#selectedHospital())
    .pipe(
      retry(3),
      map((res) => JSON.parse(res.body as string) as Reparto[])
    )
    .subscribe((data) => this.#listaReparti.set(data))
    console.log("ritornato i reparti dell'ospedale ",this.#selectedHospital(), " length: ",this.#listaReparti().length)
  }

  accettaPazienteTrasferito(params:{ idPz: number,stato: StatoPZ|null; id_reparto: number|null}): void {
    this.#http.put<HttpRes>(this.#URL+"/accetta-trasferta",params)
    .pipe(
      retry(3),
      finalize(() => this.getListaPazienti())
    )
    .subscribe(data=>{
      if(data.state === 'KO') console.error(data.error);
    })
  }

  accettaPaziente(pz: CreazionePaziente): void{
    pz.id_ospedale = this.#selectedHospital();
    console.log("sending", pz);
    this.#http.post<HttpRes>(`${this.#URL}/accetta-pz`, pz)
      .pipe(
        retry(3),
        finalize(() => this.getListaPazienti())
      )
      .subscribe(data => {
        if (data.state === 'KO') console.error(data.error);
        this.#router.navigate(['/lista-pz']);
      });
  }

  modificaPaziente(pz: ModificaPaziente): void{
    console.log("Sending ",`${this.#URL}/modifica-pz`);
    this.#http.put<HttpRes>(`${this.#URL}/modifica-pz`,pz)
      .pipe(
        retry(3),
        finalize(() => this.getListaPazienti())
      )
      .subscribe(res => {
        if(res.state === 'KO'){
          console.error(res.error);
        }
      })
  }

  traferisciPaziente(idPaziente: number, idOspedale: number): void{
    console.log("Sending ",`${this.#URL}/trasferisci-pz/${idPaziente}/${idOspedale}`);
    this.#http.put<HttpRes>(`${this.#URL}/trasferisci-pz/${idPaziente}/${idOspedale}`, {})
      .pipe(
        retry(3),
        finalize(() => this.getListaPazienti())
      )
      .subscribe(res => {
        if (res.state ==='KO'){
          console.error(res.error);
        }
      })
  }

  dimettiPaziente(idPaziente: number): void{
    this.#http.delete<HttpRes>(`${this.#URL}/dimetti-pz/${idPaziente}`, {})
      .pipe(
        retry(3),
        finalize(() => this.getListaPazienti())
      )
      .subscribe(res => {
        if (res.state ==='KO'){
          console.error(res.error);
        }
      })
  }
}

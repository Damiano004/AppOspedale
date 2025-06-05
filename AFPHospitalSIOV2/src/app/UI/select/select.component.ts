import { Component, inject, model } from '@angular/core';
import { SelectModule } from 'primeng/select';
import { AFPHospitalAPIService } from '../../core/services/afphospital-api.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  imports: [SelectModule]
})
export class SelectComponent{
  readonly api = inject(AFPHospitalAPIService);
  readonly idOs = model<number>(-1);

  cambiaIdOs(newId: any): void{
    let tempId = newId.value as number;

    if(!tempId || tempId< 0){
      console.log("il nuovo ospedale inserito non esiste o è stato inserito un id minore di 0");
      return;
    }
    console.log("id cambiato con ",tempId);
    this.idOs.set(tempId);
  }
}

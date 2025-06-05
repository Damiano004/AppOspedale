import { Component, inject, Input, Signal, signal, input, model } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { SelectComponent } from "../select/select.component";
import { AFPHospitalAPIService } from '../../core/services/afphospital-api.service';
import { Paziente } from '../../core/models/Paziente.model';

@Component({
  selector: 'app-transfer-overlay',
  templateUrl: './transfer-overlay.component.html',
  styleUrls: ['./transfer-overlay.component.scss'],
  imports: [DialogModule, SelectModule, ButtonModule, SelectComponent]
})
export class TransferOverlayComponent{
  readonly idOs = signal<number>(-1);
  readonly api = inject(AFPHospitalAPIService);

  readonly pz = input.required<Paziente>();
  visibile = model<boolean>(false);

  trasferisciPaziente(){
    this.visibile.set(false);
    this.api.traferisciPaziente(this.pz().id_paziente, this.idOs())
  }

  aa(a:boolean){
    console.log("setting to ",a);
    this.visibile.set(a);
  }

  isDisabeled(): boolean{
    if(this.idOs() <0){
      return true;
    }
    return false;
  }
}

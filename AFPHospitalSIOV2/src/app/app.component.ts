import { SelectModule } from 'primeng/select';
import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AFPHospitalAPIService } from './core/services/afphospital-api.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, SelectModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly api = inject(AFPHospitalAPIService);
}

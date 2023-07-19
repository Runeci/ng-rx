import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DeskComponent } from './desk/desk.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterModule, DeskComponent, MatToolbarModule,]
})
export class AppComponent {
  title = 'legacy';
}

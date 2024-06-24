import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JsonMergeComponent } from './json-merge/json-merge.component';
import { JsonDublicateComponent } from './json-dublicate/json-dublicate.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, JsonMergeComponent, JsonDublicateComponent],
})
export class AppComponent {
  title = 'json-merger';
}

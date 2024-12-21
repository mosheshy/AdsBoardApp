import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
    <div class="app-container">
      <h1>Bulletin Board </h1>
      <router-outlet></router-outlet>
    </div>
  `,
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'my-ads-app';
}

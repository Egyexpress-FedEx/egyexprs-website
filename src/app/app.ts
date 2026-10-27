import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from './layouts/navbar/nav/nav';
import { Footer } from './layouts/footer/footer';
import { GlobalLoader } from './shared/ui/global-loader/global-loader';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, Footer, GlobalLoader],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('egyptEgXpressWebSite');
}

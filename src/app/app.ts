import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from './layouts/navbar/nav/nav';
import { Footer } from './layouts/footer/footer';
import { GlobalLoader } from './shared/ui/global-loader/global-loader';
import { NavigationHistory, NavigationHistoryBar } from './shared/ui/navigation-history/navigation-history';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, Footer, GlobalLoader, NavigationHistoryBar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly navigationHistory = inject(NavigationHistory);
  protected readonly title = signal('egyptEgXpressWebSite');
}

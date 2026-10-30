import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthState } from './shared/stats/auth-state';
import { Toast } from './shared/ui/toast/toast';
import { Nav } from './layouts/navbar/nav/nav';
import { Footer } from './layouts/footer/footer';
import { ConnectionDialog } from './shared/ui/connection-dialog/connection-dialog';
import { GlobalLoader } from './shared/ui/global-loader/global-loader';
import { NavigationHistory, NavigationHistoryBar } from './shared/ui/navigation-history/navigation-history';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, Footer, GlobalLoader, NavigationHistoryBar, ConnectionDialog, Toast],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly auth = inject(AuthState);
  readonly navigationHistory = inject(NavigationHistory);
  protected readonly title = signal('egyptEgXpressWebSite');
}

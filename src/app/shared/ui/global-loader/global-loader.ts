import { Component, inject } from '@angular/core';
import { LoadingState } from '../../stats/loading-state';

@Component({
  selector: 'app-global-loader',
  templateUrl: './global-loader.html',
  styleUrl: './global-loader.css',
})
export class GlobalLoader {
  readonly loadingState = inject(LoadingState);
}

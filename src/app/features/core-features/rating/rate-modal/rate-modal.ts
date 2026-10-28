import { AfterViewInit, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-rate-modal',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './rate-modal.html',
  styleUrl: './rate-modal.css',
})
export class RateModal implements AfterViewInit {
  @ViewChild('dialog') dialog!: ElementRef<HTMLDialogElement>;
  private readonly router = inject(Router);
  ngAfterViewInit() { this.dialog.nativeElement.showModal(); }
  close() { void this.router.navigateByUrl('/home'); }
  backdrop(event: MouseEvent) {
    if (event.target === this.dialog.nativeElement) {
      const bounds = this.dialog.nativeElement.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) this.close();
    }
  }
}

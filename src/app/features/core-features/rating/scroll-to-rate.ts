import { afterNextRender, Directive, ElementRef, inject, Injector, Input, OnChanges } from '@angular/core';

@Directive({ selector: '[appScrollToRate]' })
export class ScrollToRate implements OnChanges {
  @Input() appScrollToRate: unknown;
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector = inject(Injector);

  ngOnChanges(): void {
    if (!this.appScrollToRate) return;
    afterNextRender(() => {
      const target = this.element.nativeElement;
      if (!this.appScrollToRate || !target.isConnected) return;
      const reducedMotion = target.ownerDocument.defaultView?.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      const behavior: ScrollBehavior = reducedMotion ? 'instant' : 'smooth';
      const dialog = target.closest('dialog');
      if (dialog) {
        dialog.scrollBy?.({ top: target.getBoundingClientRect().top - dialog.getBoundingClientRect().top - 24, behavior });
      } else {
        target.scrollIntoView?.({ behavior, block: 'start' });
      }
    }, { injector: this.injector });
  }
}

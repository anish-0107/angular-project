import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {

  // Binds to the element's style properties
  @HostBinding('style.transform') transform = 'scale(1)';
  @HostBinding('style.boxShadow') boxShadow = 'none';
  @HostBinding('style.borderColor') borderColor = '#333';
  @HostBinding('style.transition') transition = 'all 0.3s ease';

  // Hover In
  @HostListener('mouseenter') onMouseEnter() {
    this.transform = 'scale(1.02)'; // Slight zoom
    this.boxShadow = '0 10px 20px rgba(179, 157, 219, 0.2)'; // Faint Purple Glow
    this.borderColor = '#B39DDB'; // Purple border on hover
  }

  // Hover Out
  @HostListener('mouseleave') onMouseLeave() {
    this.transform = 'scale(1)';
    this.boxShadow = 'none';
    this.borderColor = '#333';
  }
}
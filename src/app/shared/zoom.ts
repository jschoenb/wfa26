import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[bsZoom]',
})
export class Zoom {

  private isZoomed = false;

  @HostBinding('style.transform')
  get transform() {
    return this.isZoomed ? 'scale(1.5)' : 'scale(1)';
  }

  @HostBinding('style.transition')
  transition = 'transform 150ms ease';

  @HostListener('mouseenter')
  onMouseEnter(){
    this.isZoomed = true;
  }

  @HostListener('mouseleave')
  onMouseLeave(){
    this.isZoomed = false;
  }
}

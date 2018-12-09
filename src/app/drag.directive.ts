import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDrag]'
})
export class DragDirective {

  mousedown = false;
  startLeft = 0;
  startTop = 0;
  mousedownLeft = 0;
  mousedownTop = 0;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'cursor', 'pointer');
    this.renderer.setStyle(this.elementRef.nativeElement, 'position', 'relative');
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event) {
    event.preventDefault();
    this.mousedown = true;
    this.mousedownLeft = event.clientX;
    this.mousedownTop = event.clientY;
    this.startLeft = Number.parseInt(this.elementRef.nativeElement.style.left);
    this.startTop = Number.parseInt(this.elementRef.nativeElement.style.top);

    if(isNaN(this.startLeft))
      this.startLeft = 0;
    if(isNaN(this.startTop))
      this.startTop = 0;
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event) {
    this.mousedown = false;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event) {    
    if(this.mousedown) {
      let diffLeft = event.clientX - this.mousedownLeft;
      let diffTop = event.clientY - this.mousedownTop;
      let newLeft = this.startLeft + diffLeft;
      let newTop = this.startTop + diffTop;
      this.renderer.setStyle(this.elementRef.nativeElement, 'left', newLeft+"px");
      this.renderer.setStyle(this.elementRef.nativeElement, 'top', newTop+"px");
    }
  }
}

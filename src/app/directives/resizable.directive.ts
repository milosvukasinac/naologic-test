import {Directive, ElementRef, Inject, Output} from '@angular/core';
import {distinctUntilChanged, fromEvent, map, switchMap, takeUntil, tap} from 'rxjs';
import {DOCUMENT} from '@angular/common';

@Directive({
  selector: '[resizable]'
})
export class ResizableDirective {

  @Output()
  readonly resizable = fromEvent<MouseEvent>(
    this.elementRef.nativeElement,
    'mousedown'
  ).pipe(
    tap((e) => e.preventDefault()),
    switchMap(() => {
      const {width, right} = this.elementRef.nativeElement
        .closest('th')!
        .getBoundingClientRect();

      return fromEvent<MouseEvent>(this.documentRef, 'mousemove').pipe(
        map(({clientX}) => width + clientX - right),
        distinctUntilChanged(),
        takeUntil(fromEvent(this.documentRef, 'mouseup'))
      );
    })
  );

  constructor(
    @Inject(DOCUMENT) private readonly documentRef: Document,
    @Inject(ElementRef)
    private readonly elementRef: ElementRef<HTMLElement>
  ) {
  }

}

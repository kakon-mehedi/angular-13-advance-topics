import {
	Directive,
	ElementRef,
	EventEmitter,
	HostListener,
	Input,
	Output,
} from '@angular/core';

@Directive({
	selector: '[hilight]',
})
export class HighlightDirective {
	@Input('hilight')
	highlightColor: string = 'greenyellow';

	@Input()
	index!: number;

	@Output()
	rating: EventEmitter<number> = new EventEmitter();

	constructor(private el: ElementRef) {}

	@HostListener('mouseenter')
	onHover() {
		this.hilight(this.index);
	}

	hilight(index: number) {
		const stars = Array.from(document.querySelectorAll<any>('.star'));

		for (let star of stars) {
			if (star.id <= index) {
				star.style.color = this.highlightColor;
			} else {
				star.style.color = 'black';
			}
		}
	}

	@HostListener('click')
	onClick() {
		let count = 0;
		const stars = Array.from(document.querySelectorAll<any>('.star'));

		for (let star of stars) {
			if (star.style.color === this.highlightColor) count++;
		}

		this.rating.next(count);
	}
}

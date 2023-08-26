import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ErrorStateMatcher, MatOption } from '@angular/material/core';
import { MatSelect, MatSelectChange } from '@angular/material/select';

@Component({
	selector: 'app-mat-select-kakon',
	templateUrl: './mat-select.component.html',
	styleUrls: ['./mat-select.component.scss'],
})
export class MatSelectComponent implements OnInit {
	@ViewChild('toppingsSelect') tpSelect!: MatSelect;

	toppings = new FormControl();
	error!: ErrorStateMatcher;
	kakonClass: string = 'show-all';
	myPlaceholder: string = 'Sample placeholder';

	toppingList: string[] = [
		'Pepperoni',
		'Extra cheese',
		'Mushroom',
		'Onion',
		'Sausage',
		'Tomato',
	];

	myAriaLabel = 'Kakons aria label';

	constructor() {}

	ngOnInit(): void {}

	compareFn(iterableOption: any, selectedOption: any) {
		if (iterableOption === selectedOption) return true;
		return false;
	}

	sort(a: any, b: any) {
		return 1;
	}

	openChange(e: any) {
		console.log('Opened changed ====> ' + e);
	}

	selectionChange(e: MatSelectChange) {
		console.log('Selection changed ====> ');
		console.dir(e);
	}

	ngAfterViewInit() {
		console.dir(this.tpSelect.options);

		/* Pringitng all the options value and select onion is a default option */

		this.tpSelect.options.forEach((option: MatOption) => {
			console.log(option.value);

			if (String(option.value).toLowerCase() === 'onion') {
				setTimeout(() => option.select(), 0); // used setTimeout to solve NG0100 error
			}
		});

		/* Testing default async methods */

		/* open mat select by default */
		setTimeout(() => this.tpSelect.open(), 0);

		console.log(this.tpSelect.controlType);
		console.log(this.tpSelect.customTrigger);
		console.log(this.tpSelect.defaultTabIndex);
		console.log(this.tpSelect.empty);
		console.log(this.tpSelect.errorState);
		console.log(this.tpSelect.focused);

		this.tpSelect.focus();

		/* Close the mat select */
		//  setTimeout(()=> this.tpSelect.close(), 0)
	}
}

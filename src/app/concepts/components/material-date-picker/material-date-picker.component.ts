import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatDateRangeInput,
  MatDateRangePicker,
} from '@angular/material/datepicker';

@Component({
	selector: 'app-material-date-picker',
	templateUrl: './material-date-picker.component.html',
	styleUrls: ['./material-date-picker.component.scss'],
})
export class MaterialDatePickerComponent implements OnInit {
  @ViewChild('picker') picker!: MatDateRangePicker<Date>
  @ViewChild('dateRangeInput') dateRangeInput!: MatDateRangeInput<Date>

	today: Date = new Date();
	tomorrow: Date = new Date('2023-08-27');

	constructor() {}

	ngOnInit(): void {}

	ngAfterViewInit() {
		setTimeout(() => {
			this.dateRangeInput.focused = true; // Making rangeInput focused by default
		}, 0);

		console.log('Control type: ' + this.dateRangeInput.controlType);

		this.dateRangeInput.stateChanges.subscribe((res) => {
			// state change occur
			console.log(this.dateRangeInput.value);
		});

		console.log(this.dateRangeInput.min);

		console.log(this.dateRangeInput.id);


    // this.picker.close();

	}

	filterDate<D>(date: D) {
		return false;
	}

	datePickerOpened() {
		console.log('Picker opend');
		console.log(this.dateRangeInput.focused);
	}

	opened() {
		console.log('Opened');
	}

	closed() {
		console.log('Closed');
	}

	monthSelected() {
		console.log('Month selected');
	}

	viewChanged() {
		console.log('View changed');
	}

	yearSelected() {
		console.log('Year selected');
	}
}

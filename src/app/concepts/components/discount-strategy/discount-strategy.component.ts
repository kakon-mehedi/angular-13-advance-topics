import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/product';
import {
	PersonalDiscountStrategy,
	SeasionalDiscountStrategy,
} from '../../shared/strategies';

@Component({
	selector: 'app-discount-strategy',
	templateUrl: './discount-strategy.component.html',
	styleUrls: ['./discount-strategy.component.scss'],
})
export class DiscountStrategyComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {
		this.giveDiscount();
	}

	giveDiscount() {
		const macbookM1 = new Product(
			'Apple MacBook Air',
			100000,
			new SeasionalDiscountStrategy()
		);

		const iphone15 = new Product(
			'Apple Iphone 15',
			90000,
			new PersonalDiscountStrategy()
		);

		console.log(
			macbookM1.getDiscountedPrice(),
			iphone15.getDiscountedPrice()
		);
	}
}

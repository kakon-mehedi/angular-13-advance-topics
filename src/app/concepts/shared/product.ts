import { IDiscountStrategy } from './discountStrategy.interface';

export class Product {
	constructor(
		public name = '',
		public price = 0,
		public discount: IDiscountStrategy | null
	) {}

	getDiscountedPrice() {
		return this.discount?.calculate(this.price);
	}
}

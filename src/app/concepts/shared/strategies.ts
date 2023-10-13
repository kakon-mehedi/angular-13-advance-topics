import { IDiscountStrategy } from './discountStrategy.interface';

export class SeasionalDiscountStrategy implements IDiscountStrategy {
	calculate(price: number): number {
		const discount = 0.85;
		return price * discount;
	}
}

export class PersonalDiscountStrategy implements IDiscountStrategy {
	calculate(price: number): number {
		const discount = 0.5;
		return price * discount;
	}
}

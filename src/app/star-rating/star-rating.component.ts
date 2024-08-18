import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-star-rating',
	templateUrl: './star-rating.component.html',
	styleUrls: ['./star-rating.component.scss'],
})
export class StarRatingComponent implements OnInit {
	totalStars = 5;

	stars = new Array(this.totalStars);

	constructor() {}

	ngOnInit(): void {}

	getRating(rating: number) {
		console.log(rating);
	}
}

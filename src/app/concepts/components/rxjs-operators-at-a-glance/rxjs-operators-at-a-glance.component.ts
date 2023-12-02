import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { from, map, of, filter, take, mergeMap } from 'rxjs';

@Component({
	selector: 'app-rxjs-operators-at-a-glance',
	templateUrl: './rxjs-operators-at-a-glance.component.html',
	styleUrls: ['./rxjs-operators-at-a-glance.component.scss'],
})
export class RxjsOperatorsAtAGlanceComponent implements OnInit {
	constructor(private http: HttpClient) {}

	ngOnInit(): void {
		this.creationalOperators();
		this.transformationOperators();
	}

	creationalOperators() {
		/**
		 * of()
		 * converts the whole argument into one observable
		 * I have a result and I want to wrap this result as an observable, then this of operator will be used
		 */

		const str = 'Hello World';
		const str$ = of(str);
		str$.subscribe((result) => console.log({ result }));
		// Will emit a single item with the type of string
		// result: "Hello World"

		const arr = [1, 2, 3];
		const arr$ = of(arr);
		arr$.subscribe((result) => console.log({ result }));
		// Will emit a single item with the type of Array<number>
		// result: [1,2,3]

		const arr2 = [4, 5, 6];
		const arr2$ = of(arr, arr2);
		arr2$.subscribe((result) => console.log({ result }));
		// Will emit a single two values each with the type of Array<number>
		// result: [1,2,3]
		// result: [4,5,6]

		const imAPromise = fetch(
			'https://pokeapi.co/api/v2/pokemon/ditto'
		).then((response) => response.json());
		const imAPromise$ = of(imAPromise);
		imAPromise$.subscribe((result) => console.log({ result }));
		// Will emit a single item with the type of Promise
		// result: Promise

		/**
		 * from()
		 * converts each elements of the argument into obvservable
		 */

		const str2 = 'Hello World';
		const str2$ = from(str);
		str$.subscribe((result) => console.log({ result }));
		// Will emit each character from the given string
		// result: "H"
		// result: "e"
		// result: "l"
		// result: "l"
		// result: "o"
		// result: " "
		// result: "W"
		// result: "o"
		// result: "r"
		// result: "l"
		// result: "d"

		const arr3 = [1, 2, 3];
		const arr3$ = from(arr);
		arr$.subscribe((result) => console.log({ result }));
		// Will emit each value within the array that was given as input to the operator.
		// result: 1
		// result: 2
		// result: 3

		const imAPromise2 = fetch(
			'https://pokeapi.co/api/v2/pokemon/ditto'
		).then((response) => response.json());
		const imAPromise2$ = from(imAPromise);
		imAPromise$.subscribe((result) => console.log({ result }));
		// Will emit the return value of the endpoint that we called to get the information about "Ditto".
		// result: This will now be an object of information about the pokemon "Ditto".
	}

	transformationOperators() {
		/**
		 * map()
		 * concatmap()
		 * mergemap()
		 * exhaustmap()
		 */

		// --------------------------------------MAP--------------------------------------------------------
		// --------------------------------------------------------------------------------------------------
		const names = ['kakon', 'mehedi', 'tamanna'];
		const names$ = from(names);

		names$
			.pipe(
				map((name: any) => {
					return name.toUpperCase();
				})
			)
			.subscribe((res) => console.log(res)); // KAKON, MEHEDI, TAMANNA

		// --------------------------------------Map, Filter, Take--------------------------------------------------------
		// ---------------------------------------------------------------------------------------------------------------
		const numbers$ = of(1, 2, 3, 4, 5, 6)
			.pipe(
				map((number) => number * 2), // 2,4, 6, 8, 10, 12
				filter((number) => number > 4), // 6, 8, 10, 12
				take(3) // 6, 8, 10
			)
			.subscribe((res) => console.log(res)); // 6, 8, 10

		// --------------------------------------Merge Map---------------------------------------------------------------
		// ---------------------------------------------------------------------------------------------------------------

		/**
		 * It solved multiple subscription problem.
		 * Ek ba ekadhik observable ki niye, then each observable ke subscribe kore finally 1 ta observable return kore.
		 * It takes an observable and maps each emitted value to another observable
		 * then subscribes to all the mapped observables and emits their values as they arrive
		 * Then the emitted values are merged into a single stream
		 * It does not maintain any order, jeta agey complete hoy otai emit kore agey
		 * It is mainly useful for handling concurrent operations that may emit values in any order.
		 */

		of('photos', 'posts', 'users') //outer observable
			.pipe(
				mergeMap((currentItem) => {
					const url =
						'https://jsonplaceholder.typicode.com/' + currentItem;
					console.log(url);
					return this.http.get(url); //inner observable and it is returning the subscribed value.
				})
			)
			.subscribe((data) => {
				console.log(data); // will get the photos, posts and users API data.
			});

		// ---------Amra ekhane merge map use na kore only map use korle diffence ta aro better bujht parbo---------------
		// ---------------------------------------------------------------------------------------------------------------

		of('photos', 'posts', 'users') //outer observable
			.pipe(
				map((currentItem) => {
					const url =
						'https://jsonplaceholder.typicode.com/' + currentItem;
					console.log(url);
					return this.http.get(url); // direct observable gulo ke return kore dise.
				})
			)
			.subscribe((data) => {
				console.log(data); // amra ekhane 3 ta http call er observable pabo
			});

		// --------------------------------------Concat Map---------------------------------------------------------------
		// ---------------------------------------------------------------------------------------------------------------

		/**
		 * similar to mergeMap, but it subscribes to each mapped observable sequentially,
		 * waiting for each to complete before subscribing to the next one.
		 * mane ekta observable complete na houa porjonto arekta subscribe kore na.
		 * Then the emitted values are concatenated into a single stream, which means that they will arrive in the order in which they were emitted.
		 * concatMap is useful when you need to maintain the order of emitted values.
		 */

		of('photos', 'posts', 'users') //outer observable
			.pipe(
				mergeMap((currentItem) => {
					const url =
						'https://jsonplaceholder.typicode.com/' + currentItem;
					console.log(url);
					return this.http.get(url); //inner observable and it is returning the subscribed value.
				})
			)
			.subscribe((data) => {
				console.log(data); // will get the photos, posts and users API data.
			});
	}

	filterOperators() {
		/**
		 * filter()
		 * take()
		 * takeUntil()
		 */

		const numbers$ = of(1, 2, 3, 4, 5, 6)
			.pipe(
				map((number) => number * 2), // 2,4, 6, 8, 10, 12
				filter((number) => number > 4), // 6, 8, 10, 12
				take(3) // 6, 8, 10
			)
			.subscribe((res) => console.log(res)); // 6, 8, 10
	}
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { filter, interval, of, switchMap, take } from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	constructor(private http: HttpClient) {}

	ngOnInit(): void {

		/**
		 * Creating ids observable by interval creational operator 
		 */
		const ids = interval(1).pipe(
			filter((id) => id > 0),  // Filter value from ids
			take(5) // only take 5 values from ids
		);

		ids.pipe(
			switchMap((id) => {
				return this.http.get(
					`https://jsonplaceholder.typicode.com/todos/${id}`
				);
			})
		).subscribe((data) => console.log(data));
	}
}

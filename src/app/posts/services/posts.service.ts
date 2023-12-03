import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class PostsService {
	constructor(private http: HttpClient) {}

	getPosts() {
		const url = 'https://jsonplaceholder.typicode.com/posts';

		return this.http.get(url);
	}
}

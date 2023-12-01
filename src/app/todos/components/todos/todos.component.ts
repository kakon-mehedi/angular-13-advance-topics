import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ITodo } from '../../state/todos.reducer';
import { Observable } from 'rxjs';
import { getTodos } from '../../state/todos.selectors';

@Component({
	selector: 'app-todos',
	templateUrl: './todos.component.html',
	styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
	todos$?: Observable<ITodo[]>;
	constructor(private todosStore: Store) {}

	ngOnInit(): void {
		this.todos$ = this.todosStore.select(getTodos);
	}
}

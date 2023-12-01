import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { pathToFileURL } from 'url';
import { TodosComponent } from './components/todos/todos.component';
import { CreateTodoComponent } from './components/create-todo/create-todo.component';
import { EditTodoComponent } from './components/edit-todo/edit-todo.component';

const routes: Routes = [
	{
		path: '',
		component: TodosComponent,
	},

	{
		path: 'todos',
		component: TodosComponent,
	},
];

@NgModule({
	declarations: [TodosComponent, CreateTodoComponent, EditTodoComponent],
	imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TodosModule {}
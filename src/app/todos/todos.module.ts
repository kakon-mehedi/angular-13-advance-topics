import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { pathToFileURL } from 'url';
import { TodosComponent } from './components/todos/todos.component';
import { CreateTodoComponent } from './components/create-todo/create-todo.component';
import { EditTodoComponent } from './components/edit-todo/edit-todo.component';
import { StoreModule } from '@ngrx/store';
import { TodosFeatureKey, TodosModuleReducers } from './state';
import { CountersComponent } from './components/counters/counters.component';
import { MaterialModule } from '../shared/modules/material.module';

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
	declarations: [
		TodosComponent,
		CreateTodoComponent,
		EditTodoComponent,
		CountersComponent,
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		StoreModule.forFeature(TodosFeatureKey, TodosModuleReducers),
		MaterialModule,
	],
})
export class TodosModule {}

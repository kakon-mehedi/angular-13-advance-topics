import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggerService } from './logger.service';

const routes: Routes = [];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: [LoggerService],
})
export class AppRoutingModule {
	constructor() {
		console.log();
	}
}

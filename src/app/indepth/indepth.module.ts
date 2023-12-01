import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CustomNumberPipe } from './custom-number.pipe';
import { NumberSeparatorPipe } from './number-separator.pipe';
import { IndepthService } from './indepth.service';
import { ClickOutsideDirective } from './click-outside.directive';
import { ZoomInDirective } from './zoom-in.directive';
import { testClass, testData } from './test.constant';

@NgModule({
	declarations: [
		HomeComponent,
		AboutComponent,
		CustomNumberPipe,
		NumberSeparatorPipe,
		ClickOutsideDirective,
		ZoomInDirective,
		testClass,
	],
	imports: [CommonModule],
	providers: [IndepthService, testData],
	exports: [HomeComponent, NumberSeparatorPipe, testData],
})
export class IndepthModule {
	constructor() {
		console.log('In depth module runs');
	}
}

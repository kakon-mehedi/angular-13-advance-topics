import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DiscountStrategyComponent } from './concepts/components/discount-strategy/discount-strategy.component';
import { QuestionTypeWebDevSimplifiedComponent } from './concepts/components/question-type-web-dev-simplified/question-type-web-dev-simplified.component';
import { MaterialModule } from './shared/modules/material.module';

@NgModule({
  declarations: [
    AppComponent,
    DiscountStrategyComponent,
    QuestionTypeWebDevSimplifiedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

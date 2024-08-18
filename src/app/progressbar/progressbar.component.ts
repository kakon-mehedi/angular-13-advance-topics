import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, filter, interval, take } from 'rxjs';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.scss']
})
export class ProgressbarComponent implements OnInit {
  defaultProgress = 0;
  
  progress$: Observable<number> = new BehaviorSubject(this.defaultProgress);

  constructor() { }

  ngOnInit(): void {
    this.progress$ = interval(10).pipe(filter(number => number > 0), take(100));
  }



}

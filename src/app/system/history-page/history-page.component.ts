import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, combineLatest } from "rxjs";
import * as moment from 'moment';

import { CategoryService } from '../shared/services/categories.service';
import { EventsService } from '../shared/services/events.service';
import { Category } from '../shared/models/category.model';
import { HMEvent } from '../shared/models/event.model';

@Component({
  selector: 'hm-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.less']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

    constructor( private categoryService: CategoryService,
               private eventsService: EventsService
              ) { }

    isLoaded = false;
    sub1: Subscription;

    categories: Category[] = [];
    events: HMEvent[] = [];

    chartData: any = [];

    ngOnInit() {
        this.sub1 = combineLatest(
            this.categoryService.getCategories(),
            this.eventsService.getEvents()
      ).subscribe((data: [Category[], HMEvent[]]) => {
            this.categories = data[0];
            this.events = data[1];
            this.calculateChartData();

            this.isLoaded = true;
      });
  }

  calculateChartData(): void {
      this.categories.forEach((cat) => {
          const catEvent = this.events.filter((e) => e.category === cat.id && e.type === 'outcome');
          this.chartData.push({
              name: cat.name,
              value: catEvent.reduce((total, e) => {
                  total +=e.amount;
                  return total;
            }, 0)
          })
      })
  }

  ngOnDestroy() {
    if(this.sub1) {
      this.sub1.unsubscribe();
    }
  }

}

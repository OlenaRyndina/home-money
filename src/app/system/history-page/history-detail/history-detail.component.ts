import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { EventsService } from '../../shared/services/events.service';
import { CategoryService } from '../../shared/services/categories.service';
import { Category } from '../../shared/models/category.model';
import { HMEvent } from '../../shared/models/event.model';

@Component({
    selector: 'hm-history-detail',
    templateUrl: './history-detail.component.html',
    styleUrls: ['./history-detail.component.less']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {

    event: HMEvent;
    category: Category;

    isLoaded = false;
    sub1: Subscription;

    constructor(private route: ActivatedRoute,
                private eventsService: EventsService,
                private categoryService: CategoryService) { }

    ngOnInit() {
        this.sub1 = this.route.params
            .pipe(
                mergeMap((params: Params) => this.eventsService.getEventById(params['id'])))
            .pipe(
                mergeMap((event: HMEvent) => {
                  this.event = event;
                  return this.categoryService.getCategoryById(event.category);
                }))
            .subscribe((category: Category) => {
                  this.category = category;
                  this.isLoaded = true;
            })
  }

  ngOnDestroy() {
    if(this.sub1) {
      this.sub1.unsubscribe();
    }
  }
}

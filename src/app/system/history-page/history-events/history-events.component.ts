import { Component, OnInit, Input } from '@angular/core';
import { HMEvent } from '../../shared/models/event.model';
import { Category} from '../../shared/models/category.model';

@Component({
    selector: 'hm-history-events',
    templateUrl: './history-events.component.html',
    styleUrls: ['./history-events.component.less']
})
export class HistoryEventsComponent implements OnInit {

    @Input() categories: Category[] = [];
    @Input() events: HMEvent[] = [];

    searchValue = '';
    searchPlaceholder = 'Сумма';
    searchField = 'amount';

    constructor() { }

    ngOnInit(): void {
        this.events.forEach((e) => {
        e.catName = this.categories.find(c => c.id === e.category).name;
    });
  }

    getEventClass(e: HMEvent) {
        return {
            'btn btn-sm': true,
            'btn-danger': e.type === 'outcome',
            'btn-success': e.type === 'income'
        };
    }

    changeCriteria(field: string) {
        const namesMap = {
            amount: 'Сумма',
            date: 'Дата',
            category: 'Категория',
            type: 'Тип'
        };
        this.searchPlaceholder = namesMap[field];
        this.searchField = field;
    }

}

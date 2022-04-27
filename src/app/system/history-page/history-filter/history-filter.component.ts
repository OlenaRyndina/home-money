import { Component, EventEmitter, Output, Input } from '@angular/core';
import {Category } from '../../shared/models/category.model';

@Component({
    selector: 'hm-history-filter',
    templateUrl: './history-filter.component.html',
    styleUrls: ['./history-filter.component.less']
})
export class HistoryFilterComponent {

    @Output() onFilterCancel = new EventEmitter<any>();
    @Output() onFilterApply = new EventEmitter<any>();

    @Input() categories: Category[] = [];

    selectedPeriod = 'd';
    selectedTypes = [];
    selectedCategories = [];

    timePeriods = [
        {type: 'd', label: 'день'},
        {type: 'w', label: 'неделя'},
        {type: 'M', label: 'месяц'}
    ]

    types = [
        {type: 'income', label: 'Доход'},
        {type: 'outcome', label: 'Расход'}
    ];

    closeFilter() {
        this.selectedTypes = [];
        this.selectedCategories = [];
        this.selectedPeriod = 'd';
        this.onFilterCancel.emit();
    }

    private calculatedInputParams(field: string, checked: boolean, value: string) {
        if(checked) {
            this[field].indexOf(value) === -1 ? this[field].push(value) : null;
        } else {
            this[field] = this[field].filter(i => i !== value);
        }      
    }

    handleChangeType(event) {
        let checked = event.checked;
        let value = event.value;
        this.calculatedInputParams('selectedTypes', checked, value);      
    }

    handleChangeCategory(event) {
        let checked = event.checked;
        let value = event.value;
        this.calculatedInputParams('selectedCategories', checked, value);
    }

    applyFilter() {
        this.onFilterApply.emit({
            types: this.selectedTypes,
            categories: this.selectedCategories,
            period: this.selectedPeriod
        });
    }
}

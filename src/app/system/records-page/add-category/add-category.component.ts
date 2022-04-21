import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription} from 'rxjs';

import { CategoryService } from '../../shared/services/categories.service';
import { Category } from '../../shared/models/category.model';

@Component({
    selector: 'hm-add-category',
    templateUrl: './add-category.component.html',
    styleUrls: ['./add-category.component.less']
})

export class AddCategoryComponent implements OnDestroy{

    sub1: Subscription;
    @Output() onCategoryAdd = new EventEmitter<Category>();

    constructor(private categoryService: CategoryService) { }
    
    onSubmit(form: NgForm) {
        let {name, capacity} = form.value;
        console.log(name, capacity);

        const category = new Category(name, capacity);

        this.sub1 = this.categoryService.addCategory(category)
            .subscribe((category: Category) => {
                form.reset();
                form.form.patchValue({capacity: 1});
                this.onCategoryAdd.emit(category);
        });
    }

    ngOnDestroy() {
        if (this.sub1) {
            this.sub1.unsubscribe();
        }
    }
}

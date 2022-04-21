import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription} from 'rxjs';

import { Category } from '../../shared/models/category.model';
import { CategoryService } from '../../shared/services/categories.service';
import { Message } from '../../../shared/models/message.model';

@Component({
    selector: 'hm-edit-category',
    templateUrl: './edit-category.component.html',
    styleUrls: ['./edit-category.component.less']
})
export class EditCategoryComponent implements OnInit, OnDestroy {
    
    sub1: Subscription;
    @Input() categories: Category[] = [];
    @Output() onCategoryEdit = new EventEmitter<Category>();
    currentCategoryId = 1;
    currentCategory: Category;
    message: Message;

    constructor(private categoryService: CategoryService) { }

    ngOnInit(){
        this.message = new Message('success', '');
        this.onCategoryChange();
    } 
    
    onCategoryChange() {
        this.currentCategory = this.categories
            .find(c => c.id === +this.currentCategoryId);
    }

    onSubmit(form: NgForm) {
        let {name, capacity} = form.value;

        const category = new Category(name, capacity, +this.currentCategoryId);

        this.sub1 = this.categoryService.updateCategory(category)
            .subscribe((category: Category) => {
              this.onCategoryEdit.emit(category);
              this.categories.map((item, i, arr) => {
                if (item.id === +this.currentCategoryId) {
                    arr.splice(i, 1, category)
                }
              })
              this.message.text = 'Категория успешно отредактирована.';
              window.setTimeout(() => this.message.text = '', 5000);
            })
    }

    ngOnDestroy() {
        if (this.sub1) {
            this.sub1.unsubscribe();
        }    
    }
}

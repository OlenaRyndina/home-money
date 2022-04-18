import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { combineLatest } from "rxjs";

import { BillService } from '../shared/services/bill.service';

@Component({
  selector: 'hm-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.less']
})
export class BillPageComponent implements OnInit, OnDestroy {
    sub1: Subscription;

    constructor(
        private billService: BillService
    ) {}

    ngOnInit() {
        this.sub1 = combineLatest (
            this.billService.getBill(),
            this.billService.getCurrency()
        ).subscribe((data/*: [Bill, any]*/) => {
            /*this.bill = data[0];
            this.currency = data[1];*/
            console.log(data);
        });
    }

    ngOnDestroy() {
        this.sub1.unsubscribe();
    }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Bill } from '../models/bill.model';
import { BaseApi } from '../../../shared/core/base-api';

@Injectable()
export class BillService extends BaseApi{
	constructor(public override http: HttpClient){
		super(http);
	}

	getBill(): Observable<any> {
        return this.get('bill');
	}

	updateBill(bill: Bill): Observable<Bill> {
		return this.put('bill', bill);
	}

	getCurrency(base: string = 'UAH'): Observable<any> {
        return this.http.get(`http://data.fixer.io/api/latest?access_key=0e4934812d0bb9662eb7350da6008e7e&format=1`)
	}
}
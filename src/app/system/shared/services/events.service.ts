import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseApi } from '../../../shared/core/base-api';
import { HMEvent } from '../models/event.model';

@Injectable()
export class EventsService extends BaseApi {
	constructor(public override http: HttpClient) {
		super(http);
	}

	addEvent(event: HMEvent): Observable<HMEvent> {
		return this.post('events', event);
	}

	getEvents(): Observable<HMEvent[]> {
		return this.get('events');
	}

	getEventById(id: string): Observable<HMEvent> {
		return this.get(`events/${id}`);
	}
}
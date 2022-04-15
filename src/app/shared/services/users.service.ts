import { HttpClient } from '@angular//common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../models/user.model';

@Injectable()
export class UsersService {
	constructor(private http: HttpClient) {}

	getUserByEmail(email: string): Observable<any> {
		return this.http.get(`http://localhost:3000/users?email=${email}`)
	}

	createNewUser(user: User): Observable<any> {
        return this.http.post('http://localhost:3000/users', user)
	}

}
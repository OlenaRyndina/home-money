import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../../../shared/models/user.model';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
    selector: 'hm-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

    date: Date = new Date();
    user: User;

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
        this.user = JSON.parse(window.localStorage.getItem('user'))[0];
    }

    onLogout() {
        this.authService.logout();
        this.router.navigate(['/login']);                         
     }
}

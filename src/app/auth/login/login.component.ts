import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';
import { Message } from '../../shared/models/message.model';
import { AuthService } from '../../shared/services/auth.service';
import { fadeStateTrigger } from '../../shared/animations/fade.animation';

@Component({
    selector: 'hm-login',
    templateUrl: './login.component.html',
    styleUrls: [
        './login.component.less',
        '../auth.component.less'],
    animations: [fadeStateTrigger]
})
export class LoginComponent implements OnInit {

    form!: FormGroup;
    message: Message;

    constructor(
        private usersService: UsersService,
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private title: Title,
        private meta: Meta
      ) {
            title.setTitle('Вход в систему');
            meta.addTags([
                {name: 'keywords', content: 'логин, вход, система'},
                {name: 'description', content: 'Страница для входа в систему'}
                ]);
       }

    ngOnInit(): void {
        this.message = new Message('danger', '');
        this.route.queryParams
            .subscribe((params: Params) => {
                if (params['nowCanLogin']) {
                    this.showMessage({
                        text: 'Теперь вы можете зайти в систему', 
                        type: 'success'});
                } else if (params['accessDenied']) {
                    this.showMessage({
                        text: 'Для работы с системой вам необходимо войти',
                        type: 'warning'
                    })
                }
            });

        this.form = new FormGroup({
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

    private showMessage(message: Message) {
        this.message = message;
        window.setTimeout(() => {
             this.message.text = '';
        }, 5000);
    }    

    onSubmit() {
        const formData = this.form.value;
        this.usersService.getUserByEmail(formData.email)
            .subscribe((user: User[]) => {
                if(user[0]) {
                    if (user[0].password === formData.password) {
                        this.message.text = '';
                        window.localStorage.setItem('user', JSON.stringify(user));
                        this.authService.login();
                        this.router.navigate(['/system', 'bill']);
                    } else {
                        this.showMessage({
                            text: 'Пароль неверный',
                            type: 'danger'
                        });
                    }
                } else {
                    this.showMessage({
                        text: 'Такого пользователя не существует',
                        type: 'danger'
                    });
                }
            });
    }
}

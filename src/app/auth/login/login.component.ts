import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';
import { Message } from '../../shared/models/message.model';

@Component({
    selector: 'hm-login',
    templateUrl: './login.component.html',
    styleUrls: [
        './login.component.less',
        '../auth.component.less']
})
export class LoginComponent implements OnInit {

    form!: FormGroup;
    message: Message;

    constructor(
        private usersService: UsersService
      ) { }

    ngOnInit(): void {
        this.message = new Message('danger', '');
        this.form = new FormGroup({
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

    private showMessage(text: string, type: string = 'danger') {
        this.message = new Message(type, text);
        window.setTimeout(() => {
             this.message.text = '';
        }, 5000);
    }    

    onSubmit() {
        const formData = this.form.value;
        this.usersService.getUserByEmail(formData.email)
            .subscribe((user: User[]) => {
                if(user[0]) {
                    console.log(user[0]);
                    if (user[0].password === formData.password) {
                         console.log(true);
                    } else {
                      this.showMessage('Пароль неверный');
                    }
                } else {
                  this.showMessage('Такого пользователя не существует');
                }
            });
    }
}

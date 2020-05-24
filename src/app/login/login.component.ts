import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators, FormControl } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Uslg } from './uslg';
// import { url } from 'inspector';
// import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

//用户名必须a开头
function userNameValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^a/)) {
    return { invalidUser: true };
  }
}
@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //对应我们登陆的表单
  myForm: FormGroup;

  //输入用户名的输入控件
  userName: AbstractControl;

  //输入密码的输入控件
  password: AbstractControl;

  name$: Observable<string>;
  pswd$: Observable<string>;
  usslg$: Observable<Uslg>;
  baseUrl = 'http://127.0.0.1:8888/';
  title: any;

  constructor(private fb: FormBuilder, private authService: AuthService, private httpClient: HttpClient, private router: Router) {
    this.myForm = this.fb.group(
      {
        'userName': ['', Validators.compose([Validators.required, userNameValidator, Validators.minLength(5)])],
        // , 
        // Validators.minLength(5)
        'password': ['', Validators.compose([Validators.required, Validators.minLength(8)])]
      }
    );

    this.userName = this.myForm.controls['userName'];
    this.password = this.myForm.controls['password'];
    this.name$ = this.userName.valueChanges;
    // this.pswd$ = this.password.valueChanges;
    this.userName.valueChanges.subscribe(val => {
      console.log(val);
    });
    this.password.valueChanges.subscribe(val => {
      console.log(val);
    });
    // this.password.valueChanges.subscribe(val => {
    //   console.log(val);
    // });
  }
  ngOnInit(): void {
    this.usslg$ = <Observable<Uslg>>this.httpClient.get(this.baseUrl + 'usslg');
  }


  //查询用户名是否匹配
  search() {
    if (this.userName.value) {
      this.usslg$ = <Observable<Uslg>>this.httpClient.get(this.baseUrl + 'usslg/' + this.userName.value);
      // console.log('匹配！');
    } else {
      // return 0;
      this.usslg$ = <Observable<Uslg>>this.httpClient.get(this.baseUrl + 'usslg');
      // console.log('不匹配！');
      // alert('用户名和密码不匹配');
    }
  }


  onSubmit(value: any) {
    console.log(value);
  }

  validation(): void {
    if (!this.myForm.value) {
      return;
    }

    this.httpClient.post(this.baseUrl + "usslg", this.myForm.value).subscribe((val) => {
      // console.log(this.myForm.value);

      // console.log(val);

      if (val == true) {
        this.authService.login();
        this.router.navigate(['/management']);
        console.log(val)
      } else (
        alert('用户名或密码错误！请重新登录！')
      )

    }

    );
  }
}

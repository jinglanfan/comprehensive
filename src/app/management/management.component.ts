import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../stsmanagement/user';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {
  // title: any;
  title = 'dashboard';
  myForm: FormGroup;
  userName: AbstractControl;
  id: AbstractControl;
  number: AbstractControl;
  users$: Observable<User>;
  baseUrl = 'http://127.0.0.1:8888/';
  currentUser: User;


  constructor(private fb: FormBuilder, private httpClient: HttpClient, private authService: AuthService) {
    this.myForm = this.fb.group({
      'userName': [''],
      'number': [''],
      'id': ['']
    });
    this.userName = this.myForm.controls['userName'];
    this.id = this.myForm.controls['id'];
    this.number = this.myForm.controls['number'];
  }




  ngOnInit(): void {
    this.users$ = <Observable<User>>this.httpClient.get(this.baseUrl + 'users');
  }

  search() {
    if (this.id.value) {
      this.users$ = <Observable<User>>this.httpClient.get(this.baseUrl + 'users/' + this.id.value);
    } else {
      this.users$ = <Observable<User>>this.httpClient.get(this.baseUrl + 'users');
    }
  }

  add() {
    if (!this.id.value || !this.userName.value || !this.number.value) {
      alert('添加信息不能为空！');
      console.log("添加信息不能为空！");
      return 0;
    } else {
      console.log(this.myForm.value);
      this.httpClient.post(this.baseUrl + 'user', this.myForm.value).subscribe(
        (val: any) => {
          if (val.succ) {
            alert('添加成功！');
          }
        }
      );
    }

  }

  select(u: User) {
    this.currentUser = u;
    this.myForm.setValue(this.currentUser);
  }

  delete() {
    if (!this.currentUser) {
      alert('必须先选择用户！');
    } else {
      this.httpClient.delete(this.baseUrl + 'user/' + this.currentUser.id).subscribe(
        (val: any) => {
          if (val.succ) {
            alert('删除成功！');
          }
        }
      )
    }
  }

  update() {
    if (!this.currentUser) {
      alert('必须先选择用户！');
    } else {
      this.httpClient.put(this.baseUrl + 'user', this.myForm.value).subscribe(
        (val: any) => {
          if (val.succ) {
            alert('修改成功！');
          }
        }
      )
    }
  }

  logout() {
    this.authService.logout();
  }

}

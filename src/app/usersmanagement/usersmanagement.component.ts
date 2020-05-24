import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-management',
  templateUrl: './usersmanagement.component.html',
  styleUrls: ['./usersmanagement.component.css']
})
export class UsersmanagementComponent implements OnInit {
  // title: any;
  title = 'dashboard';
  myForm: FormGroup;
  userName: AbstractControl;
  // id: AbstractControl;
  // number: AbstractControl;
  password: AbstractControl;
  usslg$: Observable<User>;
  baseUrl = 'http://127.0.0.1:8888/';
  currentUser: User;
  modalRef: BsModalRef;

  constructor(private fb: FormBuilder, private httpClient: HttpClient, private authService: AuthService, private modalService: BsModalService) {
    this.myForm = this.fb.group({
      'userName': [''],
      'password': [''],
    });
    this.userName = this.myForm.controls['userName'];
    this.password = this.myForm.controls['password'];
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {
    this.usslg$ = <Observable<User>>this.httpClient.get(this.baseUrl + 'usslg');
  }

  search() {
    if (this.userName.value) {
      this.usslg$ = <Observable<User>>this.httpClient.get(this.baseUrl + 'usslg/' + this.userName.value);
    } else {
      this.usslg$ = <Observable<User>>this.httpClient.get(this.baseUrl + 'usslg');
    }
  }

  reset(): void {
    try {
      this.myForm.controls['id'].reset();
      this.myForm.controls['userName'].reset();
      this.myForm.controls['number'].reset();
    } catch (error) {
    }
  }

  allsearch() {
    if (this.userName.value) {
      this.usslg$ = <Observable<User>>this.httpClient.get(this.baseUrl + 'usslg');
    }
  }

  add() {
    if (!this.userName.value || !this.password.value) {
      alert('添加信息不能为空！');
      console.log("添加信息不能为空！");
      return 0;
    } else {
      console.log(this.myForm.value);
      this.httpClient.post(this.baseUrl + 'uslg', this.myForm.value).subscribe(
        (val: any) => {
          if (val.succ) {
            alert('添加成功！');
            this.allsearch();
          }
        }
      );
    }
  }

  select(u: User) {
    this.currentUser = u;
    this.myForm.setValue(this.currentUser);
  }

  // check(){
  //   type.value="radio";
  // }

  delete() {
    if (!this.currentUser) {
      alert('必须先选择用户！');
    } else {
      this.httpClient.delete(this.baseUrl + 'uslg/' + this.currentUser.userName).subscribe(
        (val: any) => {
          if (val.succ) {
            alert('删除成功！');
            this.allsearch();
          }
        }
      )
    }
  }

  update() {
    if (!this.currentUser) {
      alert('必须先选择用户！');
    } else {
      this.httpClient.put(this.baseUrl + 'uslg', this.myForm.value).subscribe(
        (val: any) => {
          if (val.succ) {
            alert('修改成功！');
            this.allsearch();
          }
        }
      )
    }
  }

  // logout() {
  //   this.authService.logout();
  // }

}

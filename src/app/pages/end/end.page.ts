import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-end',
  templateUrl: './end.page.html',
  styleUrls: ['./end.page.scss'],
})
export class EndPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  startGame(){
    this.router.navigateByUrl('/home');
  }

  exit(){
    App.exitApp();
  }

}

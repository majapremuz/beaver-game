import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-end',
  templateUrl: './end.page.html',
  styleUrls: ['./end.page.scss'],
})
export class EndPage implements OnInit, OnDestroy {

  private backButtonSub!: Subscription;

  constructor(
    private router: Router,
    private platform: Platform
  ) { }

  ngOnInit() {
    this.backButtonSub = this.platform.backButton.subscribeWithPriority(9999, () => {
      console.log('Back button disabled');
    });
  }

  ngOnDestroy() {
    if (this.backButtonSub) {
      this.backButtonSub.unsubscribe();
    }
  }

  startGame(){
    this.router.navigateByUrl('/home');
  }

  exit(){
    App.exitApp();
  }

}

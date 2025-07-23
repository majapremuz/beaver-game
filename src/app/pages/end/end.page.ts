import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { PointService } from 'src/app/services/points.service';

@Component({
  selector: 'app-end',
  templateUrl: './end.page.html',
  styleUrls: ['./end.page.scss'],
})
export class EndPage implements OnInit, OnDestroy {
  totalScore: number = 0;
  backgroundMusic!: HTMLAudioElement
  private backButtonSub!: Subscription;

  constructor(
    private router: Router,
    private platform: Platform,
    private pointService: PointService
  ) { }

  ngOnInit() {
    this.startBackgroundMusic();
    this.backButtonSub = this.platform.backButton.subscribeWithPriority(9999, () => {
      console.log('Back button disabled');
    });
  }

  ngOnDestroy() {
    if (this.backButtonSub) {
      this.backButtonSub.unsubscribe();
    }
  }

  ionViewWillEnter() {
  this.totalScore = this.pointService.getPoints();
}

  ionViewWillLeave() {
    this.stopBackgroundMusic();
  }

  startBackgroundMusic() {
  if (this.backgroundMusic) {
    this.backgroundMusic.pause();
    this.backgroundMusic.currentTime = 0;
  }

  this.backgroundMusic = new Audio('assets/sounds/spring-time-lofi.mp3');
  this.backgroundMusic.loop = true;
  this.backgroundMusic.volume = 0.5;
  this.backgroundMusic.play().catch(error => {
    console.error('Error playing background music:', error);
  });
}

  stopBackgroundMusic() {
    if (this.backgroundMusic) {
      this.backgroundMusic.pause();
      this.backgroundMusic.currentTime = 0;
      this.backgroundMusic = undefined as any;
    }
  }

    toggleMusic() {
    if (this.backgroundMusic) {
      if (this.backgroundMusic.paused) {
        this.backgroundMusic.play();
      } else {
        this.backgroundMusic.pause();
      }
    }
  }

  startGame(){
    this.router.navigateByUrl('/home');
  }

  exit(){
    App.exitApp();
  }

}

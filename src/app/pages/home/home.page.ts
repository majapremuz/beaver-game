import { Component } from '@angular/core';
import { ContentApiInterface, ContentObject } from 'src/app/model/content';
import { ControllerService } from 'src/app/services/controller.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  translate: any = [];

  contents: Array<ContentObject> = [];
  backgroundMusic!: HTMLAudioElement;

  constructor(
    private dataCtrl: ControllerService,
    private router: Router
  ) {}


  ionViewWillEnter(){
    this.dataCtrl.setHomePage(true);
    this.startBackgroundMusic();
  }

  ionViewWillLeave() {
    this.dataCtrl.setHomePage(false);
    this.stopBackgroundMusic();
  }

  startGame() {
    this.router.navigateByUrl('/obitelj').then(() => {
      this.resetGameState();
    });
  }
  
  resetGameState() {
    localStorage.clear();
  }

  startBackgroundMusic() {
    if (this.backgroundMusic) {
      this.backgroundMusic.pause();
      this.backgroundMusic.currentTime = 0;
    } else {
      this.backgroundMusic = new Audio('assets/sounds/spring-time-lofi.mp3');
    }
  
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

}

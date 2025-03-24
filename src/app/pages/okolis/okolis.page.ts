import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-okolis',
  templateUrl: './okolis.page.html',
  styleUrls: ['./okolis.page.scss'],
})
export class OkolisPage implements OnInit {
  showImage = false;
  showInfo = false; 
  showError = false;
  backgroundMusic!: HTMLAudioElement;


  // State to track if images have been dropped correctly
  droppedImages = { 
    bow1: false,
    bow2: false, 
    bow3: false,
    bow4: false, 
  };

  constructor(private router: Router) {}

  ngOnInit() {
    this.startBackgroundMusic();
  }

  startBackgroundMusic() {
    if (!this.backgroundMusic) {
      this.backgroundMusic = new Audio('assets/sounds/spring-time-lofi.mp3');
      this.backgroundMusic.loop = true;
      this.backgroundMusic.volume = 0.5;
      this.backgroundMusic.play().catch(error => {
        console.error('Error playing background music:', error);
      });
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
  
  toggleImage() {
    this.showImage = !this.showImage;
  }

  // Start the drag operation and store the imageId
  dragStart(event: DragEvent, imageId: string) {
    this.showImage = false;
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', imageId);
    }
  }

  // Allow dropping on the drop zones
  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  // Handle the drop event for each image
  onDrop(event: DragEvent, targetId: string) {
    event.preventDefault();
    const data = event.dataTransfer?.getData('text/plain');
  
    if (data === targetId) {
      this.droppedImages[data as keyof typeof this.droppedImages] = true;
      this.playSound('correct');
      this.checkCompletion();
      const dropZone = event.target as HTMLElement;
      dropZone.classList.add('dropped');
    } else {
      this.playSound('wrong');
      this.showError = true; // Show the red 'X' image
  
      // Hide the error image after 2 seconds
      setTimeout(() => {
        this.showError = false;
      }, 2000);
    }
  }

  // Check if all images have been dropped in the correct spots
  checkCompletion() {
    if (Object.values(this.droppedImages).every(value => value === true)) {
      this.showInfo = true;
    }
  }

  // Function to play a sound based on success or failure
  playSound(type: 'correct' | 'wrong') {
    let audio = new Audio();
    audio.src = type === 'correct' ? 'assets/sounds/correct.mp3' : 'assets/sounds/wrong.mp3';
    audio.load();
    audio.play();
  }

  nextPage() {
    this.router.navigate(['/zastita']);
  }
}

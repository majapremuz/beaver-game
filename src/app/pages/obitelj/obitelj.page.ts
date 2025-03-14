import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-obitelj',
  templateUrl: './obitelj.page.html',
  styleUrls: ['./obitelj.page.scss'],
})
export class ObiteljPage implements OnInit {
  showImage = false;
  showInfo = false; 
  showError = false;

  // State to track if images have been dropped correctly
  droppedImages = { 
    stick1: false,
    stick2: false, 
    stick3: false 
  };

  constructor(private router: Router) {}

  ngOnInit() {}

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
    this.router.navigate(['/next-page']);
  }
}

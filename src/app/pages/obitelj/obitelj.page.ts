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
  backgroundMusic!: HTMLAudioElement;
  private isDragging = false;
  private startX = 0;
  private startY = 0;


  // State to track if images have been dropped correctly
  droppedImages = { 
    dabar1: false,
    dabar2: false, 
    dabar3: false,
    dabar4: false, 
  };

  constructor(private router: Router) {}

  ngOnInit() {
    this.startBackgroundMusic();
  }

  ionViewWillEnter() {
    this.resetGame();
  }

  ionViewWillLeave() {
    this.stopBackgroundMusic();
  }

  resetGame() {
    this.showImage = false;
    this.showInfo = false;
    this.showError = false;
  
    this.droppedImages = {
      dabar1: false,
      dabar2: false,
      dabar3: false,
      dabar4: false
    };
  
    document.querySelectorAll('.drop-zone').forEach(zone => {
      zone.classList.remove('dropped');
    });
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
  
  toggleImage() {
    this.showImage = !this.showImage;
  }

  // Start the drag operation and store the imageId
  touchStart(event: TouchEvent, imageId: string) {
    const touch = event.touches[0];
    if (touch) {
      event.preventDefault();
      this.startX = touch.clientX;
      this.startY = touch.clientY;
      this.isDragging = false; 
      const target = event.target as HTMLElement;
      target.setAttribute('data-dragging', imageId);
      target.style.opacity = '0.5';
    }
  }
  
  touchEnd(event: TouchEvent, targetId: string) {
    const draggingElement = document.querySelector('[data-dragging]') as HTMLElement;
    const draggedImageId = draggingElement?.getAttribute('data-dragging');
  
    if (!draggedImageId || !this.isDragging) {
      // If not dragging, reset and exit
      if (draggingElement) {
        draggingElement.style.opacity = '1';
        draggingElement.style.position = '';
        draggingElement.style.left = '';
        draggingElement.style.top = '';
        draggingElement.style.width = ''; // Reset width
        draggingElement.style.height = ''; // Reset height
        draggingElement.removeAttribute('data-dragging');
      }
      return;
    }
  
    const touch = event.changedTouches[0];
    const dropZone = document.getElementById(targetId);
  
    if (dropZone && touch) {
      const dropZoneRect = dropZone.getBoundingClientRect();
  
      // Check if the touch ended within the drop zone
      if (
        touch.clientX >= dropZoneRect.left &&
        touch.clientX <= dropZoneRect.right &&
        touch.clientY >= dropZoneRect.top &&
        touch.clientY <= dropZoneRect.bottom
      ) {
        if (draggedImageId === targetId) {
          this.playSound('correct');
          this.droppedImages[draggedImageId as keyof typeof this.droppedImages] = true;
          this.checkCompletion();
          dropZone.classList.add('dropped');
  
          // Append the dragged element to the drop zone
          dropZone.appendChild(draggingElement);
  
          // Reset the size of the dragged element
          draggingElement.style.width = '100%';
          draggingElement.style.height = 'auto';
        } else {
          this.playSound('wrong');
          this.showError = true;
  
          // Hide the error message after 2 seconds
          setTimeout(() => {
            this.showError = false;
          }, 2000);
        }
      } else {
        this.playSound('wrong');
        this.showError = true;
  
        // Hide the error message after 2 seconds
        setTimeout(() => {
          this.showError = false;
        }, 2000);
      }
    }
  
    // Reset the dragged element's style and remove the custom attribute
    if (draggingElement) {
      draggingElement.style.opacity = '1';
      draggingElement.style.position = '';
      draggingElement.style.left = '';
      draggingElement.style.top = '';
      draggingElement.style.width = '';
      draggingElement.style.height = '';
      draggingElement.removeAttribute('data-dragging');
  
      // Reattach the element to the container if not dropped in a valid zone
      const container = document.getElementById('img-container') as HTMLElement;
      if (container && !this.droppedImages[draggedImageId as keyof typeof this.droppedImages]) {
        container.appendChild(draggingElement);
      }
    }
  }

  touchMove(event: TouchEvent) {
    const touch = event.touches[0];
    if (touch) {
      event.preventDefault();
  
      const deltaX = Math.abs(touch.clientX - this.startX);
      const deltaY = Math.abs(touch.clientY - this.startY);
  
      // Consider it a drag if the user moves more than 10px
      if (deltaX > 10 || deltaY > 10) {
        this.isDragging = true;
  
        const draggingElement = document.querySelector('[data-dragging]') as HTMLElement;
        const container = document.getElementById('img-container') as HTMLElement;
  
        if (draggingElement) {
          // Update the position of the dragged element
          draggingElement.style.position = 'absolute';
          draggingElement.style.left = `${touch.clientX - draggingElement.offsetWidth / 2}px`;
          draggingElement.style.top = `${touch.clientY - draggingElement.offsetHeight / 2}px`;
  
          // Check if the dragged element is outside the container
          if (container) {
            const containerRect = container.getBoundingClientRect();
            if (
              touch.clientX < containerRect.left ||
              touch.clientX > containerRect.right ||
              touch.clientY < containerRect.top ||
              touch.clientY > containerRect.bottom
            ) {
              this.showImage = false; 
              document.body.appendChild(draggingElement);
              draggingElement.style.width = '20vmin';
              draggingElement.style.height = 'auto';
            }
          }
        }
      }
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
    this.router.navigate(['/staniste']);
  }
}

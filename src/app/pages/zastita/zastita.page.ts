import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-zastita',
  templateUrl: './zastita.page.html',
  styleUrls: ['./zastita.page.scss'],
})
export class ZastitaPage implements OnInit, OnDestroy {
  showImage = false;
  showInfo = false; 
  showError = false;
  puzzleComplete = false;
  backgroundMusic!: HTMLAudioElement;
  private isDragging = false;
  private startX = 0;
  private startY = 0;
  private backButtonSub!: Subscription;


  // State to track if images have been dropped correctly
  droppedImages = { 
    mreza1: false,
    mreza2: false, 
    mreza3: false,
    mreza4: false,
    mreza5: false,
    mreza6: false
  };

  constructor(
    private router: Router,
    private platform: Platform,
    private cdr: ChangeDetectorRef
  ) {}

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
    this.resetGame();
  }

  ionViewWillLeave() {
    this.stopBackgroundMusic();
  }

  resetGame() {
    this.showImage = false;
    this.showInfo = false;
    this.showError = false;
    this.puzzleComplete = false;
  
    this.droppedImages = {
      mreza1: false,
      mreza2: false, 
      mreza3: false,
      mreza4: false,
      mreza5: false,
      mreza6: false
    };
  
    document.querySelectorAll('.drop-zone').forEach(zone => {
      zone.classList.remove('dropped');
    });
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
  
  toggleImage() {
  this.showImage = !this.showImage;
}

  toggleInfo() {
    this.showInfo = !this.showInfo;
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

    // Store original parent and position
    target.setAttribute('data-original-left', target.offsetLeft.toString());
    target.setAttribute('data-original-top', target.offsetTop.toString());
    target.setAttribute('data-original-parent-id', target.parentElement?.id || '');
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
    const dropZone = document.getElementById('drop-' + targetId);

  
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
      if (!this.droppedImages[draggedImageId as keyof typeof this.droppedImages]) {
        const originalLeft = draggingElement.getAttribute('data-original-left');
        const originalTop = draggingElement.getAttribute('data-original-top');
        const originalParentId = draggingElement.getAttribute('data-original-parent-id');
        const originalParent = originalParentId ? document.getElementById(originalParentId) : null;

        if (originalParent) {
          originalParent.appendChild(draggingElement);
        }

        draggingElement.style.position = '';
        draggingElement.style.left = '';
        draggingElement.style.top = '';
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
                if (!document.body.contains(draggingElement)) {
                  document.body.appendChild(draggingElement); // ✅ move image first
                }
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
    this.puzzleComplete = true;
    this.showImage = false; 
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
    this.stopBackgroundMusic();
    this.router.navigateByUrl('/end', { replaceUrl: true });
  }
}

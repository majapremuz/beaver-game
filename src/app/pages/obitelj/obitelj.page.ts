import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-obitelj',
  templateUrl: './obitelj.page.html',
  styleUrls: ['./obitelj.page.scss'],
})
export class ObiteljPage implements OnInit {
  showImage = false;
  showInfo = false; // Controls visibility of info container

  constructor(private router: Router) {}

  ngOnInit() {}

  toggleImage() {
    this.showImage = !this.showImage;
  }

  dragStart(event: DragEvent) {
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', 'bow');
    }
  }

  allowDrop(event: DragEvent) {
    event.preventDefault(); // Allow the drop
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const data = event.dataTransfer?.getData('text/plain');

    if (data === 'bow') {
      this.showInfo = true; // Show info container
    } else {
      alert('Try again!');
    }
  }

  nextPage() {
    this.router.navigate(['/next-page']);
  }
}

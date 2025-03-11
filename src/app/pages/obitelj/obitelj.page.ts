import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-obitelj',
  templateUrl: './obitelj.page.html',
  styleUrls: ['./obitelj.page.scss'],
})
export class ObiteljPage implements OnInit {
  showImage = false;

  constructor(private router: Router) { }

  ngOnInit() {}

  toggleImage() {
    this.showImage = !this.showImage;
  }

  dragStart(event: DragEvent) {
    event.dataTransfer?.setData('text', 'bow');
  }

  allowDrop(event: DragEvent) {
    event.preventDefault(); // Necessary to allow dropping
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const data = event.dataTransfer?.getData('text');

    if (data === 'bow') {
      alert('Correct! Moving to the next level.');
      this.router.navigate(['/next-page']);
    } else {
      alert('Try again!');
    }
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PointService {
  private totalPoints = 0;

  constructor() {}

  addPoints(points: number): void {
    this.totalPoints += points;
  }

  getPoints(): number {
    return this.totalPoints;
  }

  resetPoints(): void {
    this.totalPoints = 0;
  }
}

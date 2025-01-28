import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  imports: [CommonModule],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss'
})
export class ProgressBarComponent {
  @Input() statDefault = 255;
  @Input() currentStat = 0;
  @Input() color = '#EEEEEE';

  get progressPercentage(): string {
    const percentage = (this.currentStat / this.statDefault) * 100;
    return `${Math.min(Math.max(percentage, 0), 100)}%`;
  }
}

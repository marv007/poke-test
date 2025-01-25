import { Component } from '@angular/core';
import { images } from '../../utils/images';

@Component({
  selector: 'app-loading-screen',
  imports: [],
  templateUrl: './loading-screen.component.html',
  styleUrl: './loading-screen.component.scss'
})
export class LoadingScreenComponent {
  loading = images.loading;
}

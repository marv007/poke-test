import { Component } from '@angular/core';
import { images } from '../../utils/images';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  logo = images.logo;
}

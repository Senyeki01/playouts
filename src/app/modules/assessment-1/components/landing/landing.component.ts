import { Component } from '@angular/core';

interface Game {
  name:string, 
  id: string,
  img: string
}

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  games: Game[] = [
    {name: 'Football', id: 'football', img: '../../../../../assets/public/soccer.webp'},
    {name: 'Ice-Hockey', id: 'icehockey', img: '../../../../../assets/public/icehockey.png'}
  ]
}

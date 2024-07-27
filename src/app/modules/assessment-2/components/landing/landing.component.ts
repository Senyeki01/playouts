import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  selectedItem: number = 0;

  navItems: any[] = [
    { icon: 'analytics', name: 'Assignment 1', route: '/assignment-1' },
    { icon: 'groups', name: 'Assignment 2', route: '/assignment-2' },
    { icon: 'groups', name: 'Assignment 3', route: '/assignment-3' },
  ];

  constructor(private router: Router) {
    // Listen to router events to capture URL changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      // Handle selected item
      this.navItems.forEach((item: any, index: number) => {
        // Update selected item
        if (event.urlAfterRedirects.includes(item.route)) this.selectedItem = index; // Stay at Assignment 1
      });
    });
  }
}

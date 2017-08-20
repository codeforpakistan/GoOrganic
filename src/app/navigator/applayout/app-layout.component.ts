import { Component, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
})
export class AppLayoutComponent {
  routes: Object[] = [{
    title: 'Home',
    route: '',
    icon: 'home',
}, {
    title: 'End Hunger',
    route: '/charity',
    icon: 'laptop_mac',
}, {
    title: 'End Poverty',
    route: '/buy',
    icon: 'language',
},
{
    title: 'Get to Work',
    route: '/market',
    icon: 'assignment',
}
];
}

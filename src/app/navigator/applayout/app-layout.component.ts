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
},
{
    title: 'Discussion',
    route: '',
    icon: 'home',
},
{
    title: 'Get to Work',
    route: '/market',
    icon: 'assignment',
}, {
    title: 'Giveaway',
    route: '/charity',
    icon: 'laptop_mac',
}, {
    title: 'Quick Buy',
    route: '/buy',
    icon: 'language',
},
{
    title: 'Market Place',
    route: '/marketplace',
    icon: 'assignment',
}
];
}

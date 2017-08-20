import { Component, AfterViewInit, Input, HostListener } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DomSanitizer } from '@angular/platform-browser';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
    selector: 'landing-page',
    templateUrl: './landingPage.component.html',
    styleUrls: ['./landingPage.component.scss'],
})
export class LandingPageComponet implements AfterViewInit {

    private counter: number = 0;
    private svgs: any[] = [
        {
            data: "../../../assets/images/home-growing.png",
            backgroundSvg: ["../../../assets/images/clouds.png"],
            active: true,
            isSvgBased: false
        },
        {
            data: "../../../assets/images/turnips.png",
            backgroundSvg: ["../../../assets/images/land.png"],
            active: false,
            isSvgBased: false
        },
        {
            data: "../../../assets/images/Shop.svg",
            backgroundSvg: ["../../../assets/images/shop-area.svg","../../../assets/images/mountains.png"],
            active: false,
            isSvgBased: true
        }

    ];
    constructor(public sanitizer: DomSanitizer) { }

    ngAfterViewInit(): void {
    }
    @HostListener('window:keyup.ArrowRight', ['$event'])
    onRight(event: any): void {
        console.log(event);
        this.svgs[(this.counter) % this.svgs.length].active = false;
        if(this.counter === this.svgs.length){
            this.counter = 0;
        }
        this.svgs[(this.counter + 1) % this.svgs.length].active = true;
        this.counter++;
    }
    @HostListener('window:keyup.ArrowLeft', ['$event'])
    onLeft(event: any): void {
        console.log(event);
        this.svgs[(this.counter) % this.svgs.length].active = false;
        if(this.counter === 0){
            this.counter = this.svgs.length;
        }
        this.svgs[(this.counter - 1)].active = true;
        this.counter--;
    }
}

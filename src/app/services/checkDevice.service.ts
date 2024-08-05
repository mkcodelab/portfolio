import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CheckDeviceService {
  isMobile() {
    return this.mobileTest;
  }

  isDesktop() {
    return !this.mobileTest;
  }

  get mobileTest() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }
}

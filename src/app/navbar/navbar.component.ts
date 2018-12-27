import { Component } from '@angular/core';
import { AuthServiceInstance, IAuthService } from '../auth/services/AuthService';
import { LocalStorageService } from '../utils/LocalStorageService';
import { Router } from '@angular/router';

@Component({
  selector: 'bpm-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss']
})
export class NavbarComponent {
  private authService: IAuthService;
  isAuthenticated: boolean;
  constructor(
    authServiceInstance: AuthServiceInstance,
    lsService: LocalStorageService,
    public router: Router)
  {
    this.authService = authServiceInstance.getInstance();
    this.isAuthenticated = this.authService.isAuthenticated();
    lsService.itemValue.subscribe((nextVal => {
      this.isAuthenticated = this.authService.isAuthenticated(nextVal);
    }));
  }

  logout() {
    this.authService.logout();
  }

  shouldDisplay(element: string): Boolean {
    let displayLogic: any = {
      "lobby-create": this.isAuthenticated && this.router.url !== '/lobby/create'
    };
    console.log(this.router.url);
    return displayLogic[element];
  }
}

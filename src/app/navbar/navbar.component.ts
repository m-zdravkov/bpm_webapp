import { Component } from '@angular/core';
import { AuthServiceInstance, IAuthService } from '../auth/services/AuthService';
import { LocalStorageService } from '../utils/LocalStorageService';

@Component({
  selector: 'bpm-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss']
})
export class NavbarComponent {
  private authService: IAuthService;
  isAuthenticated: boolean;
  constructor(authServiceInstance: AuthServiceInstance, lsService: LocalStorageService) {
    this.authService = authServiceInstance.getInstance();
    this.isAuthenticated = this.authService.isAuthenticated();
    lsService.itemValue.subscribe((nextVal => {
      this.isAuthenticated = this.authService.isAuthenticated(nextVal);
    }));
  }

  logout() {
    this.authService.logout();
  }
}

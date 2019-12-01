import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

// Services
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isCollapsed = false;
  isLoading = true;
  user: string;
  isAuthenticated = false;
  authSubscription: Subscription;

  constructor(
    public authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.authSubscription = this.authService.isAuthenticated.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
      if (isAuthenticated) {
        this.user = this.authService.userName;
      }

      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}

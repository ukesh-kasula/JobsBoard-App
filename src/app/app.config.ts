import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideAuth0 } from '@auth0/auth0-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAuth0({
      domain: 'dev-uk0jri8owehbumgj.us.auth0.com',
      clientId: 'DRATg7T9jWBRLMI4I9QFHnDW5q0AbQfY',
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideAnimations(),
    provideRouter(routes),
    provideToastr({
      closeButton: true,
      easeTime: 1000,
    }),
  ],
};

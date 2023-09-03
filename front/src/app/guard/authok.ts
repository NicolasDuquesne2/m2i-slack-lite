import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

export const AuthGuardOK = () => {
  const auth = inject(UserService);
  const router = inject(Router);

  let isLogged: boolean = false;

  auth.isLogged.subscribe({
    next: (observer) => {
      isLogged = observer;
    },
  });

  if (isLogged) {
    router.navigateByUrl('');
    return false;
  }
  return true;
};

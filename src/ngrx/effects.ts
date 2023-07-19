import { inject, Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

@Injectable()
export class Effects {
  private _actions$ = inject(Actions);
}

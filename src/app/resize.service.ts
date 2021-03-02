import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResizeService {

  public onResize = new Subject();

  constructor() {
    window.addEventListener('resize', (e) => {
      this.onResize.next();
    });

  }


}

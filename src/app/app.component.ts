import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Keeper';
  public menuClick$: Subject<boolean> = new Subject();

  public notifyChild() {
    this.menuClick$.next(true);
  }
  
}

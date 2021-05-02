import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppComponent } from '../app.component';
import { Label } from '../constants/label';
import { UserLabels } from '../constants/userlabels';
import { EditLabelsComponent } from '../edit-labels/edit-labels.component';
import { LabelService } from '../shared/label.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnDestroy {
  displaySideNavText: boolean = true;
  removeSideNavText: boolean = true;
  public labelList = [
    {name :'Notes', icon: 'fa fa-clipboard', active: 'true'},
    {name :'Reminders', icon: 'fa fa-bell'}
  ];

  userLabels: UserLabels;
  newLabel: Label;

  @ViewChild(EditLabelsComponent) editLabelModal: EditLabelsComponent;

  ngOnInit(): void {
  }

  private destroyed: Subject<any> = new Subject<void>();

  public constructor(parent: AppComponent, labelService: LabelService) {
    parent.menuClick$.pipe(takeUntil(this.destroyed)).subscribe((value) => {
      this.displaySideNavText = value ? !this.displaySideNavText : false;
      setTimeout(() => {
        this.removeSideNavText = this.displaySideNavText;
      }, 350);
    })

    labelService.getLabels().pipe(takeUntil(this.destroyed)).subscribe(resp => {
      if(resp.ok && resp.status === 200){
        this.userLabels = resp.body;
      }
    })
  }
  
  public ngOnDestroy() {
    this.destroyed.next();
  }

  public addLabel(value: string) {
    if(value) {
      this.userLabels.userLabels.push({
        name: value.trim(),
        icon: 'fa fa-sticky-note',
        active: false
      })
      // TODO - label service add Label name required
    }
  }

  public updateLabelName(newLabel) {
    if(newLabel.id && newLabel.value) {
      this.userLabels.userLabels.map(label => {
        if(label.name === newLabel.id){
          label.name = newLabel.value.trim();
        }
      });

      // TODO - label service update label name required
    }
  }

  public removeLabel(labelName) {
    labelName = labelName.trim();
    if(labelName) {
      this.userLabels.userLabels = this.userLabels.userLabels.filter(label => {
        return (label.name != labelName);
      });
    };
     // TODO - label service remove label required
  }
}

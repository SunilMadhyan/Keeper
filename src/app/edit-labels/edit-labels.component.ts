import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-edit-labels',
  templateUrl: './edit-labels.component.html',
  styleUrls: ['./edit-labels.component.scss']
})
export class EditLabelsComponent implements OnInit {
  newLabel = "";
  isModalVisible = false;
  @Output() labelEmitter$ = new EventEmitter<string>();
  @Output() labelUpdateEmitter$ = new EventEmitter<any>();
  @Output() labelRemoveEmitter$ = new EventEmitter<string>();
  @Input() userLabels;
  
  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild("newLabelInputBox") labelInputField: ElementRef;
  ngAfterViewInit() {
    this.labelInputField.nativeElement.focus();
  }

  public addNewLabel() {
    if (this.newLabel.trim() != "" ) {
      this.labelEmitter$.emit(this.newLabel.trim());
      this.newLabel = "";
    }
  }

  public updateLabelName(id,value) {
    if(id && value && id !== value) {
      this.labelUpdateEmitter$.emit({"id":id , "value":value});
    }
  }

  public removeLabel(id) {
    if(id) {
      this.labelRemoveEmitter$.emit(id);
    }
  }

  public toggleModal() {
    this.isModalVisible = !this.isModalVisible;
  }
}

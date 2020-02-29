import { Component,  Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { expenseType, person, Income } from '../../../interfaces';
import { MainService } from '../../../main.service';

@Component({
  selector: 'app-income-add-modal',
  templateUrl: './income-add-modal.component.html',
  styleUrls: ['./income-add-modal.component.less']
})
export class IncomeAddModalComponent {
  persons=[];
  valid = true;
  data: Income = {
    date: null,
    person: '',
    value: null
  };


  constructor(
    public dialogRef: MatDialogRef<IncomeAddModalComponent>,
    private service:MainService
    ) {
    for (let name in person) {
      this.persons.push(person[name])
    }

  }

  save(): void {
    this.data.date = Date.now();
    this.validate();
    if (this.valid) {
      this.service.sendIncome(this.data).subscribe(res=>console.log(res))
      this.dialogRef.close(this.data)
    }

  }


  validate(): void {
    if ( this.data.value == null || this.data.person === "") {
      this.valid = false
    } else this.valid = true
  }


  close(){
    this.dialogRef.close()
  }


}

import { Component,  Inject } from '@angular/core';
import {  MatDialogRef } from '@angular/material/dialog';
import { expenseType, person, Expense } from '../../../interfaces';
import { MainService } from '../../../main.service';

@Component({
  selector: 'app-expense-add-modal',
  templateUrl: './expense-add-modal.component.html',
  styleUrls: ['./expense-add-modal.component.less']
})


export class ExpenseAddModalComponent {
  types = [];
  persons = [];
  valid = true;
  data: Expense = {
    date: null,
    type: '',
    person: '',
    title: '',
    value: null
  };
  constructor(
    public dialogRef: MatDialogRef<ExpenseAddModalComponent>,
    private service:MainService
    ) {
    for (let type in expenseType) {
      this.types.push(expenseType[type])
    }
    for (let name in person) {
      this.persons.push(person[name])
    }

  }

  save(): void {
    this.data.date = Date.now();
    this.validate();
    if (this.valid) {
      this.service.sendExpense(this.data).subscribe(res=>console.log(res))
      this.dialogRef.close(this.data)
    }

  }


  validate(): void {
    if (this.data.title === "" || this.data.value == null || this.data.type === "" || this.data.person === "") {
      this.valid = false
    } else this.valid = true
  }


  close(){
    this.dialogRef.close()
  }




}

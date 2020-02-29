import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExpenseAddModalComponent } from './components/modals/expense-add-modal/expense-add-modal.component';
import { Expense } from './interfaces';
import { MainService } from './main.service';
import { IncomeAddModalComponent } from './components/modals/income-add-modal/income-add-modal.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})


export class AppComponent {



  constructor(public dialog: MatDialog,private service:MainService) { }


  openExpenseDialog(): void {
    const dialogRef = this.dialog.open(ExpenseAddModalComponent, {
      width: '30%'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.service.writeExpense(result);
    });


  }
  openIncomeDialog(): void {
    const dialogRef = this.dialog.open(IncomeAddModalComponent, {
      width: '30%'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.service.writeIncome(result);
    });


  }
}


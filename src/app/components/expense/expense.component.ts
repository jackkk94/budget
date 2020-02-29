import { Component, OnInit, ViewChild } from '@angular/core';
import { Expense } from '../../interfaces';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MainService } from 'src/app/main.service';
import { map } from 'rxjs/operators';
import { dataType } from '../../interfaces';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.less']
})
export class ExpenseComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = ['date', 'title', 'value', 'person', 'type'];
  data = [];
  dataSource = new MatTableDataSource(this.data);
  type=dataType.expense;
  graphData=[];
  constructor(private service: MainService) { }

 

  ngOnInit() {
    this.updateTable();
    this.service.newExpense.subscribe(result => {
      this.updateTable()

    });
  }

  updateTable() {
    this.service.getExpense().subscribe(result => {
      this.data=[];
      JSON.parse(result).data.map(i => {
        this.data.push(i);
      })
      this.data.sort((a,b)=>b.date - a.date)
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.renderRows();
    });
  }


}


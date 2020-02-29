import { Component, OnInit, ViewChild } from '@angular/core';
import { Income, dataType } from '../../interfaces';
import { MatTable } from '@angular/material/table';
import { MainService } from 'src/app/main.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.less']
})
export class IncomeComponent implements OnInit {
  displayedColumns: string[] = ['date', 'value', 'person'];
  data=[];
  type=dataType.income;
  constructor(private service: MainService) { }
  @ViewChild(MatTable) table: MatTable<any>;

  ngOnInit() {
    this.updateTable();
    this.service.newIncome.subscribe(result => {
      this.updateTable()

    });
  }

  updateTable() {
    this.service.getIncome().subscribe(result => {
      this.data=[];
      result.data.map(i => {
        this.data.push(i);
      })
      this.data.sort((a,b)=>b.date - a.date)
      this.table.renderRows();
    });
  }

}

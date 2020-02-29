import { Component, OnInit, ViewChild } from '@angular/core';
import { mainTable } from '../../interfaces';
import { MatTable } from '@angular/material/table';
import { MainService } from 'src/app/main.service';
import { Subscription } from 'rxjs';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  data:any;
  displayedColumns: string[] = ['date', 'title', 'value', 'person', 'type'];
  dataSource: mainTable[] = [];
  subscriptions:Subscription[]=[];

  constructor(private service:MainService) {

  }
  
  @ViewChild(MatTable) table: MatTable<any>;

  ngOnInit() {
  
    this.updateTable();
    this.data = {
      labels: ['Расходы', 'Остаток'],
      datasets: [
        {
          data: [300, 350],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }]
    };
    this.subscriptions.push(
      this.service.newExpense.subscribe(result=>{
        this.updateTable();
      })
    );
    this.subscriptions.push(
      this.service.newIncome.subscribe(result=>{
        this.updateTable();
      })
    )

  }

  updateTable() {
    this.dataSource=[];
    this.subscriptions.push(
      this.service.getExpense().subscribe(result => {
        result.data.map(i => {
          this.dataSource.push(i);
          this.dataSource[this.dataSource.length-1].type="Расход";
         
        })
        this.dataSource.sort((a,b)=>b.date - a.date)
        this.table.renderRows();
        this.data.datasets[0].data[0]=result.total;
        
      })
    )
    this.subscriptions.push(
      this.service.getIncome().subscribe(result => {
        result.data.map(i => {
          this.dataSource.push(i);
          this.dataSource[this.dataSource.length-1].type="Доход";
          this.dataSource[this.dataSource.length-1].title="Доход";
        })
        this.dataSource.sort((a,b)=>b.date - a.date)
        this.table.renderRows();
        this.data.datasets[0].data[1]=result.total-this.data.datasets[0].data[0];
       
      })
    )


  }

  
}

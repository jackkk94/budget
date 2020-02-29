import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MainService } from 'src/app/main.service';
import { UIChart } from 'primeng/chart/chart';
import { dataType } from '../../interfaces';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.less']
})




export class GraphComponent implements OnInit {
  _type: dataType;
  @Input() 
  set type(value:dataType){
    !value? this._type=dataType.expense:this._type=value;  
  }
  get type(){
    return this._type;
  }
  @ViewChild('chart') chart: UIChart; 
  arr={};
  options={};

  constructor(private service: MainService) {
  }

  ngOnInit() {
    this.updateChart();
    if(this.type==dataType.expense){
      this.service.newExpense.subscribe(result => {
        this.updateChart();
      });
    }else if(this.type==dataType.income){
      this.service.newIncome.subscribe(result => {
        this.updateChart();
      });
    }


  }

  selectData(event){
    console.log(event);

  }
  updateChart(){
    this.service.getGraphData(this.type,new Date().getMonth()).subscribe(data=>{
    this.arr = {
      labels: data.map(({date})=>date),
      datasets: [
          {
              data: data.map(({value})=>value),
              fill: false,
              borderColor: '#4bc0c0',
              backgroundColor: 'red',

          }
      ],
  }
    this.options = {
      title: {
          display: true,
          text: (this.type==dataType.expense?'Просрано':'Внесено'),
          fontSize: 20
      },
      legend: {
          display:false,
      }
  };
    this.chart.refresh();
    })
  }
}

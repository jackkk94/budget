import { Injectable, EventEmitter, Output } from '@angular/core';
import { Expense, Income, dataType } from './interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})



export class MainService {



  @Output() newExpense = new EventEmitter<Expense>();
  @Output() newIncome = new EventEmitter<Income>();

  constructor(private http: HttpClient) { }

  getExpense(): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.get('/api/expense',{headers});
  }

  getIncome(): Observable<any> {
    return this.http.get('/api/income');
  }

  sendExpense(data: Expense): Observable<any> {
    return this.http.post<any>('/api/expense', data)
  }

  sendIncome(data: Income): Observable<any> {
    return this.http.post<any>('/api/income', data)
  }

  writeExpense(data: Expense) {
    this.newExpense.emit(data)
  }

  writeIncome(data: Income) {
    this.newIncome.emit(data)
  }

  getGraphData(type: dataType, month: Number) {
    if (type === dataType.expense) {
      return this.getExpense().pipe(map(data => {
        console.log(month)
        let values = this.parseData(data.data, month);
        return values
      }))
    }else if(type === dataType.income){
      return this.getIncome().pipe(map(data => {
        let values = this.parseData(data.data, month);
        return values
      }))
    }

  }


  daysInMonth(date: any) {
    console.log(date)
    return 32 - new Date(date.getFullYear(), date.getMonth(), 32).getDate();
  };

  parseData(data, month) {
    let output = [];
    let daysCount = this.daysInMonth(new Date(new Date().setMonth(month)));
    let accMonth = data.filter(item => {
      return (new Date(item.date).getMonth() == month);
    })
    for (let i = 1; i <= daysCount; i++) {
      let acc = accMonth.filter(item => {
        return (new Date(item.date).getDate() == i)
      })
      let sum = 0;
      if (acc && acc != []) {
        acc.forEach(el => {
          sum += el.value;
        });
      }

      output.push({ 'date': i, 'value': sum })
    }
    console.log(output);
    return output;
  }
}

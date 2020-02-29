import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartModule } from 'primeng/chart';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { ExpenseAddModalComponent } from './components/modals/expense-add-modal/expense-add-modal.component';
import { FormsModule } from '@angular/forms';
import { ExpenseComponent } from './components/expense/expense.component';
import { IncomeComponent } from './components/income/income.component';
import { AppRouterModule } from './router';
import { HomeComponent } from './components/home/home.component';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { HttpClientModule }   from '@angular/common/http';
import { IncomeAddModalComponent } from './components/modals/income-add-modal/income-add-modal.component';
import { GraphComponent } from './components/graph/graph.component';
@NgModule({
  declarations: [
    AppComponent,
    ExpenseAddModalComponent,
    ExpenseComponent,
    IncomeComponent,
    HomeComponent,
    IncomeAddModalComponent,
    GraphComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule,
    MatTableModule,
    ChartModule,
    MatDialogModule,
    FormsModule,
    AppRouterModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatInputModule,
    HttpClientModule,
    MatPaginatorModule,
  ],
  entryComponents: [
    ExpenseAddModalComponent,IncomeAddModalComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

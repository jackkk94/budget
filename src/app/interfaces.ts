export interface table {
    date: number,
    title: string,
    value: number,
    person: string
}
export interface Point{
    date: number,
    value: string
}
export interface Expense {
    date: number,
    type: string,
    person: string,
    title: string,
    value: number
}
export interface Income {
    date: number,
    person: string,
    value: number
}
export interface expenseTable extends table {
    expenseType: string
}

export interface mainTable extends table {
    type: string
}

export enum expenseType {
    home = "Дом",
    food = "Еда",
    myself = "Личное",
    way = "Передвижение",
    vacation = "Отпуск"
}
export enum person {
    jack = "Женя",
    luba = "Люба"
}

export enum dataType {
    expense,
    income
}
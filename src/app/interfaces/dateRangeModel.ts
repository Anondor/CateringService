export interface DateRangeModel{
    startDay:string,
    endDay:string

}

export interface PaymentCalculationModel{

    id:string,
    userName:string,
    email:string,
    meal:MealCalculationModel[],
    totalCost:number,
    totalMeal:number,
    teamName:string,
    totalPaid:number

}
export interface MealCalculationModel
{
    id:string,
    type:string,
    cost:number,
    count:number
}

export interface PaidBalanceModel
{
    id:string,
    userId:string,
    paidDate:string,
    paidAmount:string
}
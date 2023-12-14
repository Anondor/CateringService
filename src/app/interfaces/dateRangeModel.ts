export interface DateRangeModel{
    startDay:string,
    endDay:string

}

export interface PaymentCalculationModel{

    id:string,
    userName:string,
    email:string,
    meal:MealCalculationModel[]

}
export interface MealCalculationModel
{
    id:string,
    type:string,
    cost:number
}
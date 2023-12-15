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
    teamName:string

}
export interface MealCalculationModel
{
    id:string,
    type:string,
    cost:number,
    count:number
}
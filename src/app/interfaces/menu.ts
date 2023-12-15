export interface MenuModel{
    id:string;
    mealName:string;
    defaultMealRate:string;
    programId:string;
    isPublish:string;
}

export interface MealModel{
    id:string;
    mealName:string;
    mealRate:number;
    count:number;
}
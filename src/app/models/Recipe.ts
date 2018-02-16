import {EngredientGroup} from "./EngredientGroup";

export interface Recipe {
    Name?: string;
    Temperature?: string;
    Time?: string;
    Recipe?: string;
    Favourite?: boolean;
    Categories?: string;
    Engredients?: EngredientGroup[];
    Gallery?: any[];
}

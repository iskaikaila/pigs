export type PigCategory = 'Grey' | 'Chestnut' | 'White' | 'Black';

export interface IPig {
    name: string;
    breed: string;
    height: number;
    weight: number;
    category: PigCategory;
    personality: string;
    remarks: string;
    swimmingAbility?: number; // for Grey pigs
    language?: string;         // for Chestnut pigs
    runningAbility?: number;   // for White pigs
    strength?: number;         // for Black pigs
}

export class Pig implements IPig {
    constructor(
        public name: string,
        public breed: string,
        public height: number,
        public weight: number,
        public category: PigCategory,
        public personality: string,
        public remarks: string,
        public swimmingAbility?: number,
        public language?: string,
        public runningAbility?: number,
        public strength?: number
    ) {}
}


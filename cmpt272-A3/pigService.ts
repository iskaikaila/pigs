import { IPig, Pig, PigCategory } from './pig';

export class PigService {
    private pigs: Pig[] = [];

    constructor() {
        this.loadPigs();
    }

    private loadPigs(): void {
        const storedPigs = localStorage.getItem('pigs');
        if (storedPigs) {
            this.pigs = JSON.parse(storedPigs).map((pigData: IPig) => new Pig(
                pigData.name,
                pigData.breed,
                pigData.height,
                pigData.weight,
                pigData.category,
                pigData.personality,
                pigData.remarks,
                pigData.swimmingAbility,
                pigData.language,
                pigData.runningAbility,
                pigData.strength
            ));
        }

        console.log('Loaded pigs:', this.pigs); // 调试输出
    }
    private savePigs(): void {
        localStorage.setItem('pigs', JSON.stringify(this.pigs));
    }

    addPig(pig: Pig): void {
        this.pigs.push(pig);
        this.savePigs(); 
    }

    getPigs(): Pig[] {
        return this.pigs;
    }

    deletePig(pigName: string): void {
        this.pigs = this.pigs.filter(pig => pig.name !== pigName);
        this.savePigs();
    }



    getPigsGroupedByCategory(): Record<PigCategory, Pig[]> {
      const grouped = this.pigs.reduce((acc, pig) => {
          (acc[pig.category] = acc[pig.category] || []).push(pig);
          return acc;
      }, {} as Record<PigCategory, Pig[]>);

      // Correctly typed loop for sorting
      for (const category in grouped) {
          if (grouped.hasOwnProperty(category)) {
              grouped[category as PigCategory].sort((a, b) => a.name.localeCompare(b.name));
          }
      }

      return grouped;
    }
}

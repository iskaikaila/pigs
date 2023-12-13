import { IPig, Pig, PigCategory } from './pig';

export class PigService {
    private pigs: Pig[] = [];

    constructor() {
        this.loadPigs();
    }

    private loadPigs(): void {
        const storedPigs = localStorage.getItem('pigs');
        if (storedPigs) {
            // 从本地存储加载猪的数据，并将其转换为Pig对象数组
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

        console.log('Loaded pigs:', this.pigs); // 调试输出，显示加载的猪
    }

    private savePigs(): void {
        // 将猪的数据保存到本地存储中
        localStorage.setItem('pigs', JSON.stringify(this.pigs));
    }

    addPig(pig: Pig): void {
        // 添加一头猪到猪列表，并保存猪的数据
        this.pigs.push(pig);
        this.savePigs(); 
    }

    getPigs(): Pig[] {
        // 返回猪列表
        return this.pigs;
    }

    
    deletePig(pigName: string): void {
        // 根据猪的名字删除猪
        this.pigs = this.pigs.filter(pig => pig.name !== pigName);
        this.savePigs(); // 保存更新后的猪列表
    }

    //分组
    getPigsGroupedByCategory(): Record<PigCategory, Pig[]> {
        // 将猪按照类别分组，并按照猪的名字排序
        const grouped = this.pigs.reduce((acc, pig) => {
            (acc[pig.category] = acc[pig.category] || []).push(pig);
            return acc;
        }, {} as Record<PigCategory, Pig[]>);

        // 正确类型化的循环，用于对分组后的猪进行排序
        for (const category in grouped) {
            if (grouped.hasOwnProperty(category)) {
                grouped[category as PigCategory].sort((a, b) => a.name.localeCompare(b.name));
            }
        }

        return grouped; // 返回分组后的猪
    }
}

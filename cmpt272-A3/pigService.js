System.register(["./pig"], function (exports_1, context_1) {
    "use strict";
    var pig_1, PigService;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (pig_1_1) {
                pig_1 = pig_1_1;
            }
        ],
        execute: function () {
            PigService = class PigService {
                constructor() {
                    this.pigs = [];
                    this.loadPigs();
                }
                loadPigs() {
                    const storedPigs = localStorage.getItem('pigs');
                    if (storedPigs) {
                        this.pigs = JSON.parse(storedPigs).map((pigData) => new pig_1.Pig(pigData.name, pigData.breed, pigData.height, pigData.weight, pigData.category, pigData.personality, pigData.remarks, pigData.swimmingAbility, pigData.language, pigData.runningAbility, pigData.strength));
                    }
                    console.log('Loaded pigs:', this.pigs); // 调试输出
                }
                savePigs() {
                    localStorage.setItem('pigs', JSON.stringify(this.pigs));
                }
                addPig(pig) {
                    this.pigs.push(pig);
                    this.savePigs();
                }
                getPigs() {
                    return this.pigs;
                }
                deletePig(pigName) {
                    this.pigs = this.pigs.filter(pig => pig.name !== pigName);
                    this.savePigs();
                }
                getPigsGroupedByCategory() {
                    const grouped = this.pigs.reduce((acc, pig) => {
                        (acc[pig.category] = acc[pig.category] || []).push(pig);
                        return acc;
                    }, {});
                    // Correctly typed loop for sorting
                    for (const category in grouped) {
                        if (grouped.hasOwnProperty(category)) {
                            grouped[category].sort((a, b) => a.name.localeCompare(b.name));
                        }
                    }
                    return grouped;
                }
            };
            exports_1("PigService", PigService);
        }
    };
});

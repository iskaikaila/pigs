System.register([], function (exports_1, context_1) {
    "use strict";
    var Pig;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Pig = class Pig {
                constructor(name, breed, height, weight, category, personality, remarks, swimmingAbility, language, runningAbility, strength) {
                    this.name = name;
                    this.breed = breed;
                    this.height = height;
                    this.weight = weight;
                    this.category = category;
                    this.personality = personality;
                    this.remarks = remarks;
                    this.swimmingAbility = swimmingAbility;
                    this.language = language;
                    this.runningAbility = runningAbility;
                    this.strength = strength;
                }
            };
            exports_1("Pig", Pig);
        }
    };
});

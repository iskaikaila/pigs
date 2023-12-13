System.register(["./pig", "./pigService"], function (exports_1, context_1) {
    "use strict";
    var pig_1, pigService_1, pigService, pigForm, pigList, categorySelect;
    var __moduleName = context_1 && context_1.id;
    function initializeApp() {
        console.log("ccc");
        console.log('Initializing app');
        const pigService = new pigService_1.PigService();
        updatePigList();
    }
    function updateFormFields(category) {
        const swimmingAbilityContainer = document.getElementById('swimmingAbilityContainer');
        const languageContainer = document.getElementById('languageContainer');
        const runningAbilityContainer = document.getElementById('runningAbilityContainer');
        const strengthContainer = document.getElementById('strengthContainer');
        [swimmingAbilityContainer, languageContainer, runningAbilityContainer, strengthContainer]
            .forEach(container => container === null || container === void 0 ? void 0 : container.classList.add('hidden'));
        if (category === 'Grey')
            swimmingAbilityContainer === null || swimmingAbilityContainer === void 0 ? void 0 : swimmingAbilityContainer.classList.remove('hidden');
        if (category === 'Chestnut')
            languageContainer === null || languageContainer === void 0 ? void 0 : languageContainer.classList.remove('hidden');
        if (category === 'White')
            runningAbilityContainer === null || runningAbilityContainer === void 0 ? void 0 : runningAbilityContainer.classList.remove('hidden');
        if (category === 'Black')
            strengthContainer === null || strengthContainer === void 0 ? void 0 : strengthContainer.classList.remove('hidden');
    }
    function updatePigList() {
        console.log('Updating pig list...'); // 调试输出
        console.log(pigService); // 查看实例状态
        const pigList = document.getElementById('pig-list');
        if (!pigList)
            return;
        pigList.innerHTML = '';
        const pigsGrouped = pigService.getPigsGroupedByCategory();
        for (const categoryKey in pigsGrouped) {
            if (pigsGrouped.hasOwnProperty(categoryKey)) {
                const category = categoryKey; // Cast the key to PigCategory
                const categoryHeader = document.createElement('h2');
                categoryHeader.textContent = category;
                pigList.appendChild(categoryHeader);
                const pigs = pigsGrouped[category].sort((a, b) => a.name.localeCompare(b.name));
                pigs.forEach((pig) => {
                    const pigElement = document.createElement('div');
                    pigElement.textContent = `${pig.name} (${pig.category})`;
                    pigElement.appendChild(createMoreInfoButton(pig));
                    pigElement.appendChild(createDeleteButton(pig.name));
                    pigList.appendChild(pigElement);
                });
            }
        }
    }
    function createMoreInfoButton(pig) {
        const button = document.createElement('button');
        button.textContent = 'More Info';
        button.addEventListener('click', () => {
            alert(`Name: ${pig.name}\nCategory: ${pig.category}\nBreed: ${pig.breed}\nHeight: ${pig.height} cm\nWeight: ${pig.weight} kg\nPersonality: ${pig.personality}\n${pig.category === 'Grey' ? 'Swimming Ability: ' + pig.swimmingAbility : ''}\n${pig.category === 'Chestnut' ? 'Language: ' + pig.language : ''}\n${pig.category === 'White' ? 'Running Ability: ' + pig.runningAbility : ''}\n${pig.category === 'Black' ? 'Strength: ' + pig.strength : ''}\nRemarks: ${pig.remarks}`);
        });
        return button;
    }
    function createDeleteButton(pigName) {
        const button = document.createElement('button');
        button.textContent = 'Delete';
        button.addEventListener('click', () => {
            if (confirm(`Are you sure you want to delete ${pigName}?`)) {
                pigService.deletePig(pigName);
                updatePigList();
            }
        });
        return button;
    }
    return {
        setters: [
            function (pig_1_1) {
                pig_1 = pig_1_1;
            },
            function (pigService_1_1) {
                pigService_1 = pigService_1_1;
            }
        ],
        execute: function () {
            pigService = new pigService_1.PigService();
            pigForm = document.getElementById('pigForm');
            pigList = document.getElementById('pig-list');
            categorySelect = document.getElementById('categorySelect');
            document.addEventListener('DOMContentLoaded', () => {
                console.log('DOM fully loaded and parsed');
                const pigService = new pigService_1.PigService(); // 确保 PigService 已初始化
                updatePigList(); // 在页面加载时调用此函数来更新 UI
                updateFormFields(categorySelect.value); // 初始化表单字段
            });
            if (document.readyState === 'loading') {
                console.log("aaa");
                // 文档还未完成加载
                document.addEventListener('DOMContentLoaded', () => {
                    initializeApp();
                });
            }
            else {
                console.log("bbb");
                // `DOMContentLoaded` 已经被触发
                initializeApp();
            }
            categorySelect.addEventListener('change', (event) => {
                updateFormFields(event.target.value);
            });
            pigForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const formData = new FormData(pigForm);
                const category = formData.get('category');
                const newPig = new pig_1.Pig(formData.get('name'), formData.get('breed'), parseFloat(formData.get('height')), parseFloat(formData.get('weight')), category, formData.get('personality'), formData.get('remarks'), category === 'Grey' ? parseFloat(formData.get('swimmingAbility')) : undefined, category === 'Chestnut' ? formData.get('language') : undefined, category === 'White' ? parseFloat(formData.get('runningAbility')) : undefined, category === 'Black' ? parseFloat(formData.get('strength')) : undefined);
                pigService.addPig(newPig);
                updatePigList();
                pigForm.reset();
                pigForm.classList.add('hidden');
            });
            // Initialize form fields on page load
            updateFormFields(categorySelect.value);
        }
    };
});

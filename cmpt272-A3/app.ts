// app.ts
import { Pig, PigCategory } from './pig';
import { PigService } from './pigService';


// 实例化PigService类
const pigService = new PigService();
// 获取页面上的元素
const pigForm = document.getElementById('pigForm') as HTMLFormElement;
const pigList = document.getElementById('pig-list');
const categorySelect = document.getElementById('categorySelect') as HTMLSelectElement;

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    const pigService = new PigService(); 
    updatePigList(); 
    updateFormFields(categorySelect.value as PigCategory); 
});

     // 在文档状态为加载中时添加事件监听
if (document.readyState === 'loading') {  
    console.log("loading")
    document.addEventListener('DOMContentLoaded', () => {
        initializeApp();
    });
} else {
    console.log(" `DOMContentLoaded` loaded")
    initializeApp();
}

// 初始化应用
function initializeApp() {
    console.log('Initializing app');
    const pigService = new PigService();
    updatePigList();
}





// 更新表单字段
function updateFormFields(category: PigCategory) {
    // 获取页面上的元素
    const swimmingAbilityContainer = document.getElementById('swimmingAbilityContainer');
    const languageContainer = document.getElementById('languageContainer');
    const runningAbilityContainer = document.getElementById('runningAbilityContainer');
    const strengthContainer = document.getElementById('strengthContainer');

    // 根据猪的类别显示或隐藏不同的字段
    [swimmingAbilityContainer, languageContainer, runningAbilityContainer, strengthContainer]
        .forEach(container => container?.classList.add('hidden'));

    if (category === 'Grey') swimmingAbilityContainer?.classList.remove('hidden');
    if (category === 'Chestnut') languageContainer?.classList.remove('hidden');
    if (category === 'White') runningAbilityContainer?.classList.remove('hidden');
    if (category === 'Black') strengthContainer?.classList.remove('hidden');
}

// 类别选择变化时更新表单字段
categorySelect.addEventListener('change', (event) => {
    updateFormFields((event.target as HTMLSelectElement).value as PigCategory);
});


// document.getElementById("submit")!.addEventListener('click', function () {

//     var ca: PigCategory = "Black";
//     var NewPig = new Pig("na", "ca", 20, ca, "pe")

//     pc.add(NewPig)
//     display()

    
// })

//// 表单提交事件处理
// const pigForm = document.getElementById('pigForm') as HTMLFormElement;
pigForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const formData = new FormData(pigForm);
    const category = formData.get('category') as PigCategory;
    
    // 创建新的Pig对象
    const newPig = new Pig(
        formData.get('name') as string,
        formData.get('breed') as string,
        parseFloat(formData.get('height') as string),
        parseFloat(formData.get('weight') as string),
        category,
        formData.get('personality') as string,
        formData.get('remarks') as string,
        category === 'Grey' ? parseFloat(formData.get('swimmingAbility') as string) : undefined,
        category === 'Chestnut' ? formData.get('language') as string : undefined,
        category === 'White' ? parseFloat(formData.get('runningAbility') as string) : undefined,
        category === 'Black' ? parseFloat(formData.get('strength') as string) : undefined,
    );

    pigService.addPig(newPig);
    updatePigList();
    // 添加新猪并更新列表

    pigForm.reset();
    pigForm.classList.add('hidden');
    // 重置表单并隐藏

    alert("Pig added successfully!");
    
});


// function display() {
//     const piglist = pc.getAll(); // 假设这个方法返回所有的 Pig 对象数组

//     const list = document.getElementById("pig-list") as HTMLUListElement;
//     list.innerHTML = ''; // 清空现有的列表项

//     piglist.forEach((p: Pig) => {
//         const listItem = document.createElement("div");
//         listItem.textContent = `Name: ${p.name}, Breed: ${p.breed}, Age: ${p.age}, Category: ${p.category}, Petname: ${p.petname}`;
//         list.appendChild(listItem);
//     });
// }

// 更新猪列表显示
function updatePigList() {
    console.log('Updating pig list...'); // 调试输出
    console.log(pigService); // 查看实例状态
    const pigList = document.getElementById('pig-list');
    if (!pigList) return;

    pigList.innerHTML = '';
    const pigsGrouped = pigService.getPigsGroupedByCategory();

    // 遍历不同类别的猪并显示
    for (const categoryKey in pigsGrouped) {
        if (pigsGrouped.hasOwnProperty(categoryKey)) {
            const category = categoryKey as PigCategory; // Cast the key to PigCategory
    
            const categoryHeader = document.createElement('h2');
            categoryHeader.textContent = category;
            pigList.appendChild(categoryHeader);
    
            const pigs = pigsGrouped[category].sort((a, b) => a.name.localeCompare(b.name));
            pigs.forEach((pig: Pig) => {
                const pigElement = document.createElement('div');
                pigElement.textContent = `${pig.name} (${pig.category})`;
                pigElement.appendChild(createMoreInfoButton(pig));
                pigElement.appendChild(createDeleteButton(pig.name));
                pigList.appendChild(pigElement);
            });
        }
    }
    
}

// var pc = new PeopleController()
// document.getElementById("getAll")!.addEventListener('click', function(){
//     console.log(pc.getAll())
// })

// 创建更多信息按钮
function createMoreInfoButton(pig: Pig): HTMLButtonElement {
    const button = document.createElement('button');
    button.textContent = 'More Info';
    button.addEventListener('click', () => {
        alert(`Name: ${pig.name}\nCategory: ${pig.category}\nBreed: ${pig.breed}\nHeight: ${pig.height} cm\nWeight: ${pig.weight} kg\nPersonality: ${pig.personality}\n${pig.category === 'Grey' ? 'Swimming Ability: ' + pig.swimmingAbility : ''}\n${pig.category === 'Chestnut' ? 'Language: ' + pig.language : ''}\n${pig.category === 'White' ? 'Running Ability: ' + pig.runningAbility : ''}\n${pig.category === 'Black' ? 'Strength: ' + pig.strength : ''}\nRemarks: ${pig.remarks}`);
    });
    return button;
}

// 创建删除按钮
function createDeleteButton(pigName: string): HTMLButtonElement {
    const button = document.createElement('button');
    button.textContent = 'Delete';
    button.addEventListener('click', () => {
        if (confirm(`Are you sure you want to delete ${pigName}?`)) {
            pigService.deletePig(pigName);
            updatePigList();
            alert("Pig deleted successfully!");
        }
    });
    return button;
}
// 页面加载时初始化表单字段
updateFormFields(categorySelect.value as PigCategory);
// Initialize form fields on page load
updateFormFields(categorySelect.value as PigCategory);

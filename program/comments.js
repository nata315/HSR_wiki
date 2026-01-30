
//не проверяла и не подключала!

pageName=[main,planet,menu];
let date = new Date();
//функция для создания интерфейса комментариев
function comWindow(){
    let corUs=<div><div id="corUs">
        <div><p>Напишите никнейм : </p><input type="text" id="Name"></input><button id="Send">Отправить</button></div>
        <div><p>Комментарий : </p><input type="text" id="Com"></input></div>
        </div>
        <div id="oldCom"></div></div>;
    document.innerHtml = corUs; 

}
//функция для сохранения комментария 
let send = document.querySelector("#Send");
send.onClick = ()=>{
    let user = document.querySelector("#Name");
    let com = document.querySelector("#Com");
    if(user.textContent.trim() != " " && com.textContent.trim() !=" "){
        saveCom(user,com);
        com.textContent = " ";//очищаем поле комментария 
        alert("комментарий опубликован!");
    }
    else{alert("не все данные заполнены!")};
}
function saveCom(user,com){
    localStorage.setItem("UserName",user);
    //дата формата дань-месяц-год
    let currentUsData = date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear();
    //итоговый вид строки для публикации и сохранения
    let fullCom = {data:currentUsData+" "+user,value:com};//покрасить части в разные цвета при отображении в блоке!!!
    //определиться с форматом хранения и поместить коллекцию (мб json);
    //путь сохранения в зависимости от страницы и туда отправить 
    console.log("Сохранен комментарий: "+fullCom);
}
//функция для добавления комментариев в блок
function publication(){
    //определить страницу для которой нужны комментарии 
    //через inner добавить в div oldCom
    // добавлять комментарии с начала - сначала старые и добавить ползунок для удобного скроллинга
    // нужна функция для адоптивной загрузки комментария без обновления блока полностью каждый раз
}

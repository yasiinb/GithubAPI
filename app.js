//Elementleri seçme

const githubForm=document.getElementById("github-form");
const nameInput=document.getElementById("githubname");
const clearLastUsers=document.getElementById("clear-last-users");

const lastusers=document.getElementById("last-users");

const github=new Github();
const ui=new UI();

eventListeners();

function eventListeners(){
    githubForm.addEventListener('submit',getData);
    clearLastUsers.addEventListener('click',clearAllSearched);
    document.addEventListener("DOMContentLoaded",getAllSearched);


}
function getData(e){
    let username=nameInput.value.trim();

    if(username==""){
        aler("Lütfen geçerli bir kullanıcı adı girin")
    }else{
        github.getGithubData(username)
        .then(response=>{
            if(response.user.message=="Not Found"){
                //hata mesajı
              ui.showError("Kullanıcı Bulunamadı")
            }else{
                ui.addSearchedUserToUI(username);
                Storage.addSearchedUserToStorage(username);
                ui.showRepoInfo(response.repos);
               ui.showUserInfo(response.user);
        
            }

        })
        .catch(err=>ui.showError(err));
    }
    ui.clearInput();//input temizle
    e.preventDefault();
}
function clearAllSearched(){
    //Tüm Aramaları sil
    if(confirm("Eminmisiniz ?")){
        Storage.clearAllSearch();//storage den temizlenir
        ui.clearAllSearchUI();
    }

}
function getAllSearched(){
    // aramaları temizle 
    let users=Storage.getSearchedUsersFromStorage();
    let result="";
    users.forEach(user=>{
        result+= `<li class="list-group-item">${user}</li>`

    });
    lastusers.innerHTML=result;
}







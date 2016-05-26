$(document).ready(function () {

    var button = document.getElementById("logoutBtn");
    button.addEventListener("click", logoutBtnClicked);
    var displayedUsername = document.getElementById("username");

    var usernameCookie = getCookie("username");
    if(usernameCookie == undefined || usernameCookie == "") {
        redirect();
        return;
    }

    displayedUsername.innerHTML = usernameCookie;
    setbacklogTitle();

    function logoutBtnClicked() {
        //document.cookie = "username" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        //document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        document.cookie = "username=''; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        window.location="../index.html";
    }

    function redirect() {
        window.location="../index.html";
    }

    function getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) {
            return parts.pop().split(";").shift();
        }
    }

    var backlogTitle = document.getElementById("backlogTitle");
    backlogTitle.addEventListener("click", backlogTitleClicked)

    function backlogTitleClicked() {
        if (backlogTitle.value == "Enter title") {
            $(":text").val("");
        }
    }

    var addButton = document.getElementById("addBtn");
    addButton.addEventListener("click", setbacklogTitle);

    function setbacklogTitle() {
        $(":text").val("Enter title");
        var select = document.getElementById("select");
        select.value = "ToDo";
        var textArea = document.getElementById("backlog-info");
        textArea.value = "";
    }

    var addBacklogButton = document.getElementById("backlogAddBtn");
    addBacklogButton.addEventListener("click", addBacklogItemToTable);
    
    function addBacklogItemToTable() {
        var select = document.getElementById("select");
        var selectedText = select.options[select.selectedIndex].text;

        var titleText = document.getElementById("backlogTitle").value;
        var commentText = document.getElementById("backlog-info").value;
        var rowNumber = document.getElementById("backlogsTable").rows.length;

        var table = document.getElementById("backlogsTable");
        var row = table.insertRow(rowNumber);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(2);
        cell1.innerHTML = rowNumber - 1;
        cell2.innerHTML = titleText;
        cell3.innerHTML = selectedText;
        cell4.innerHTML = commentText;

        if ((rowNumber % 2) != 0) {
            row.classList.add('even');
        }
    }
});
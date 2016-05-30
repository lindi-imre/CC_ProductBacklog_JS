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
    backlogTitle.addEventListener("click", backlogTitleClicked);
    backlogTitle.addEventListener("keyup", textChanged);
    var backlogPriority = document.getElementById("backlogPriority");
    backlogPriority.addEventListener("click", backlogTitleClicked);
    backlogPriority.addEventListener("keyup", textChanged);
    
    function textChanged() {
        if (backlogTitle.value == "" || backlogPriority.value == "") {
            addBacklogButton.disabled = true;
            if (backlogTitle.value == "") {
                backlogTitle.style.borderColor = "red";
            }
            if (backlogPriority.value == "") {
                backlogPriority.style.borderColor = "red";
            }
        }
        else {
            addBacklogButton.disabled = false;
            if (backlogTitle.value != "") {
                backlogTitle.style.borderColor = "initial";
            }
            if (backlogPriority.value != "") {
                backlogPriority.style.borderColor = "initial";
            }

        }
    }

    function backlogTitleClicked() {
        addBacklogButton.disabled = true;
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


});

function editBacklogItem(element) {
    $('#myModal').modal('toggle');
    var selectedRowIndex = (element.rowIndex);
    var cells = document.getElementById("backlogsTable").rows[selectedRowIndex].cells.length;

    var cellsContent = [];

    for(var i = 0; i < cells; i++)
    {
        cellsContent[i] = document.getElementById("backlogsTable").rows[selectedRowIndex].cells[i].innerHTML;
    }
    document.getElementById("backlogTitle").value = cellsContent[1];
    document.getElementById("select").value = cellsContent[2];
    document.getElementById("backlogPriority").value = cellsContent[3];
    document.getElementById("backlog-info").value = cellsContent[4];
}

function addBacklogItemToTable() {
    var select = document.getElementById("select");
    var selectedText = select.options[select.selectedIndex].text;

    var titleText = document.getElementById("backlogTitle").value;
    var commentText = document.getElementById("backlog-info").value;
    var rowNumber = document.getElementById("backlogsTable").rows.length;
    var priority = document.getElementById("backlogPriority").value;

    var table = document.getElementById("backlogsTable");
    var row = table.insertRow(rowNumber);

    var cell0 = row.insertCell(0);
    var cell1 = row.insertCell(1);
    var cell2 = row.insertCell(2);
    var cell3 = row.insertCell(3);
    var cell4 = row.insertCell(4);


    cell0.innerHTML = rowNumber - 1;
    cell1.innerHTML = titleText;
    cell2.innerHTML = selectedText;
    cell3.innerHTML = commentText;
    cell4.innerHTML = priority;

    if ((rowNumber % 2) != 0) {
        row.classList.add('even');
    }

    row.setAttribute("ondblclick","editBacklogItem(this)");

}
$(document).ready(function () {
    "use strict";
    var usernameCookie = getCookie("username");
    if(usernameCookie != undefined && usernameCookie != "") {
        redirect();
        return;
    }

    var username = document.getElementById("username");
    var password = document.getElementById("password");
    var button = document.getElementById("loginBtn");


    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
    if (!window.indexedDB) {
        window.alert("Your browser doesn't support a stable version of IndexedDB.")
    }
    const userData = [
        {id: "1", username: "admin", password: "pass"}
    ];
    var db;
    var request = window.indexedDB.open("backLogDataBase", 1);
    request.onsuccess = function(event) {
        db = request.result;
        console.log("success: "+ db);
    };
    request.onupgradeneeded = function (event) {
        var db = event.target.result;
        var objectStore = db.createObjectStore("users", {keyPath: "id"});
        for (var i in userData) {
            objectStore.add(userData[i]);
        }
    };
    function read() {
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        var transaction = db.transaction(["users"]);
        var objectStore = transaction.objectStore("users");
        var request = objectStore.get("1");
        request.onerror = function(event) {
            alert("Unable to retrieve daa from database!");
        };
        request.onsuccess = function(event) {
            // Do something with the request.result!
            if(request.result && request.result.username == username && request.result.password == password) {
                login(request.result.username);
                redirect();
            } else {
                alert("bad username or password");
            }
        };
    }

    function redirect() {
        window.location="backlog_site/backlog.html";
    }

    function setCookie(username) {
        document.cookie = "username=" + username + "; Path=/;";
    }

    function login(username) {
        setCookie(username);
    }

    var loginBtnClicked = function (event) {
        read();
    };

    function getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    }

    button.addEventListener("click", loginBtnClicked);
});
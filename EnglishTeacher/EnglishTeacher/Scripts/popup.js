//document.addEventListener('DOMContentLoaded', function () {
//    var checkPageButton = document.getElementById('checkPage');
//    checkPageButton.addEventListener('click', function () {
//        chrome.tabs.getSelected(null, function (tab) {
//            d = document;

//            var f = d.createElement('form');
//            f.action = 'http://gtmetrix.com/analyze.html?bm';
//            f.method = 'post';
//            var i = d.createElement('input');
//            i.type = 'hidden';
//            i.name = 'url';
//            i.value = tab.url;
//            f.appendChild(i);
//            d.body.appendChild(f);
//            f.submit();
//        });
//    }, false);
//}, false);

$(function () {
    $('#but-Sign-Up').click(function (e) {
        e.preventDefault();
        var data = {
            Email: $('#inputEmail').val(),
            Password: $('#inputPassword').val(),
            ConfirmPassword: $('#inputPasswordConfirmation').val()
        };

        $.ajax({
            type: 'POST',
            url: 'http://localhost:54049/api/Account/Register/',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data)
        }).success(function (data) {
            alert("Всё норм");

        }).fail(function (data) {
            alert("В процесе регистрации возникла ошибка");
        });
    });
    var tokenKey = "tokenInfo";

    $('#but-Sign-In').click(function (e) {
        e.preventDefault();
        var loginData = {
            grant_type: 'password',
            username: $('#emailLogin').val(),
            password: $('#passwordLogin').val()
        };

        $.ajax({
            type: 'POST',
            url: 'http://localhost:54049/Token',
            data: loginData
        }).success(function (data) {
            sessionStorage.setItem(tokenKey, data.access_token);
            alert('Всё ок');
            document.location.href = "main.html"

        }).fail(function (data) {
            alert('При логине возникла ошибка');
        });
    });
    /////////////////////////////////////дальше код, который пока не подключён
    $('#logOut').click(function (e) {
        e.preventDefault();
        sessionStorage.removeItem(tokenKey);
    });

    $('#getItemsButton').click(function (e) {
        e.preventDefault();
        $.ajax({
            type: 'GET',
            url: 'http://localhost:54049/api/values/',
            //     datatype: 'jsonp',
            beforeSend: function (xhr) {
                var token = sessionStorage.getItem(tokenKey);
                console.log(token);
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: function (data) {
                alert(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText || textStatus);
            }
        });
    });
})
//document.addEventListener('DOMContentLoaded', function () {
//    document.querySelector('#submitLogin').addEventListener('click', clickHandler);
//    main();
//});
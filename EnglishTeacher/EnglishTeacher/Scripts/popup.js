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
    $('#submit').click(function (e) {
        e.preventDefault();
        var data = {
            Email: $('#email').val(),
            Password: $('#password').val(),
            ConfirmPassword: $('#confirmpassword').val()
        };

        $.ajax({
            type: 'POST',
            url: '/api/Account/Register',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data)
        }).success(function (data) {
            alert("Регистрация пройдена");
        }).fail(function (data) {
            alert("В процесе регистрации возникла ошибка");
        });
    });
    var tokenKey = "tokenInfo";
    $('#submitLogin').click(function (e) {
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
            $('.userName').text(data.userName);
            $('.userInfo').css('display', 'block');
            $('.loginForm').css('display', 'none');
            // сохраняем в хранилище sessionStorage токен доступа
            sessionStorage.setItem(tokenKey, data.access_token);
            console.log(data.access_token);
        }).fail(function (data) {
            alert('При логине возникла ошибка');
        });
    });

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
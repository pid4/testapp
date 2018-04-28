var base_url = 'https://doshiharsh.000webhostapp.com/CI/index.php/';

var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

var myApp = new Framework7({
    pushState: false,
    swipeBackPage: true,
    preloadPreviousPage: false,
    uniqueHistory: true,
    uniqueHistoryIgnoreGetParameters: true,
    modalTitle: 'TestApp',
    imagesLazyLoadPlaceholder: 'img/lazyload.jpg',
    imagesLazyLoadThreshold: 50,

});

var $$ = Dom7;

function goto_page(page) {
    mainView.router.load({
        url: page,
        ignoreCache: false,
    });
}

$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;
    $$(page.container).find("script").each(function (el) {
        if ($$(this).attr('src')) {
            jQuery.getScript($(this).attr('src'));
        } else {
            eval($$(this).text());
        }
    });

})

var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    // dynamicNavbar: true
});

$$(document).on('deviceready', function () {
    mainView.hideNavbar();
    goto_page('login.html');
    // if(token_data == undefined){ 
    //     goto_page('login.html');
    // } else {
    //     goto_page('home.html');
    // }
});

myApp.onPageInit('login', function (page) {
    var input = document.getElementById("password");
    input.addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("signin_btn").click();
        }
    });
    $("#signin_btn").click(function () {
        var email = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        $.emailid = $('#email').val();
        if ($.emailid.match(email)) { } else {
            alert("Please enter the correct email");
            return false;
        }
        var password = $('#password').val();
        if (true) {
            $.ajax({
                url: base_url + 'welcome/login',
                type: 'POST',
                crossDomain: true,
                data: {
                    email: $("#email").val(),
                    password: $("#password").val(),
                },
                success: function (res) {
                    if (res.status == 'success') {
                        var username = document.getElementById('username');
                        var nam = 'Hello, ' + res.user_details["name"];
                        username.innerHTML = nam;
                        var disp_name = document.getElementById('disp_name');
                        goto_page('home.html');
                        mainView.showNavbar();
                        alert('Login Sucessful');
                    } else {
                        alert('Please check your email or password');
                    }
                },
            });
        }
    })
    $("#signup_page").click(function () {
        goto_page("signup.html");
    })
})

myApp.onPageInit('signup', function (page) {
    $("#signup_btn").click(function () {
        $.n = $('#name').val();
        if ($.n == "null" || $.n == "") {
            alert("Please enter the name");
            return false;
        }
        var email = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        $.emailid = $('#semail').val();
        if ($.emailid.match(email)) { } else {
            alert("Please enter the correct email");
            return false;
        }
        $.x = $('#phoneno').val();
        if ($.x.length != 10) {
            alert("Enter 10 digit mobileno");
            return false;
        }
        $.p1 = $('#spassword').val();
        if ($.p1.length <= 8) {
            alert("Password length short enter minimum 8 digit password");
            return false;
        }
        $.p2 = $('#cpassword').val();
        if ($.p1 != $.p2) {
            alert("Password doesn't match");
            return false;
        }
        if (true) {
            $.ajax({
                url: base_url + 'welcome/signup',
                type: 'POST',
                data: {
                    name: $("#name").val(),
                    email: $("#semail").val(),
                    phoneno: $("#phoneno").val(),
                    password: $("#spassword").val(),
                    gender: $("#gender").val(),
                    dob: $("#dob").val(),
                    city: $("#city").val(),
                },
                success: function (res) {
                    if (res.status == 'success') {
                        goto_page('login.html');
                        alert('Signup Sucessful');
                    } else {
                        alert(res.api_msg);
                    }
                },
            });
        }
    })
})

myApp.onPageInit('home', function (page) {
    $.ajax({
        url: base_url + 'welcome/home',
        type: 'POST',
        crossDomain: true,
        data: {},
        success: function (res) {
            if (res.status == 'success') {
                var html = '';
                $("#product_listing").empty();
                $.each(res.adpost, function (index, value) {
                    var MyDate = value.postdate;
                    var MyDateYear;
                    var MyDateMonth;
                    var MyDateDate;
                    var MyDateString;
                    MyDateYear = value.postdate.slice(0, 4)
                    MyDateMonth = value.postdate.slice(5, 7)
                    MyDateDate = value.postdate.slice(8, 10)
                    MyDateString = MyDateDate + '-' + MyDateMonth + '-' + MyDateYear;
                    html += '<div onclick="moredetails(' + value.adid + ')" class="card facebook-card">' +
                        '<div class="card-header">' +
                        '<div class="facebook-avatar">' +
                        value.category +
                        '</div>' +
                        '<div class="facebook-name">' +
                        '' +
                        '</div>' +
                        '<div class="facebook-date" style="text-align: right;">' +
                        MyDateString +
                        '</div>' +
                        '</div>' +
                        '<div class="card-header">' +
                        '<div class="facebook-avatar">' +
                        '' +
                        '</div>' +
                        '<div class="facebook-name">' +
                        value.adtitle +
                        '</div>' +
                        '<div class="facebook-date">' +
                        '' +
                        '</div>' +
                        '</div>' +
                        '<div class="card-content">' +
                        '<div class="card-content-inner">' +
                        '<div class="swiper-container swiper-init">' +
                        '<div class="swiper-wrapper">' +
                        '<div class="swiper-slide">' +
                        '<img src="' + value.photo1 + '" class="resize">' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="card-footer">' +
                        '<a href="#" class="link">₹' + value.rentperday + '/Day</a>' +
                        '<a href="#" class="link"  onclick="moredetails(' + value.adid + ')">More details</a>' +
                        '</div>' +
                        '</div>';
                })
                $("#product_listing").html(html);
            } else {
                alert('Error in ajax');
            }
        }
    });
    $("#searchb").keyup(function (event) {
        if (event.keyCode === 13) {
            var query = document.getElementById('searchb').value;
            $.ajax({
                url: base_url + 'welcome/search',
                type: 'POST',
                crossDomain: true,
                data: {
                    query: query,
                },
                success: function (res) {
                    if (res.status == 'success') {
                        var html = '';
                        $("#product_listing").empty();
                        $.each(res.adpost, function (index, value) {
                            var MyDate = value.postdate;
                            var MyDateYear;
                            var MyDateMonth;
                            var MyDateDate;
                            var MyDateString;
                            MyDateYear = value.postdate.slice(0, 4)
                            MyDateMonth = value.postdate.slice(5, 7)
                            MyDateDate = value.postdate.slice(8, 10)
                            MyDateString = MyDateDate + '-' + MyDateMonth + '-' + MyDateYear;
                            html += '<div onclick="moredetails(' + value.adid + ')" class="card facebook-card">' +
                                '<div class="card-header">' +
                                '<div class="facebook-avatar">' +
                                value.category +
                                '</div>' +
                                '<div class="facebook-name">' +
                                '' +
                                '</div>' +
                                '<div class="facebook-date" style="text-align: right;">' +
                                MyDateString +
                                '</div>' +
                                '</div>' +
                                '<div class="card-header">' +
                                '<div class="facebook-avatar">' +
                                '' +
                                '</div>' +
                                '<div class="facebook-name">' +
                                value.adtitle +
                                '</div>' +
                                '<div class="facebook-date">' +
                                '' +
                                '</div>' +
                                '</div>' +
                                '<div class="card-content">' +
                                '<div class="card-content-inner">' +
                                '<div class="swiper-container swiper-init">' +
                                '<div class="swiper-wrapper">' +
                                '<div class="swiper-slide">' +
                                '<img src="' + value.photo1 + '" class="resize">' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '<div class="card-footer">' +
                                '<a href="#" class="link">₹' + value.rentperday + '/Day</a>' +
                                '<a href="#" class="link"  onclick="moredetails(' + value.adid + ')">More details</a>' +
                                '</div>' +
                                '</div>';
                        })
                        $("#product_listing").html(html);
                    } else {
                        alert('Error in ajax');
                    }
                }
            });
        }
    });
})

myApp.onPageInit('adpost', function (page) {
    $("#adpost_btn").click(function () {
        $.ad = $('#adtitle').val();
        if ($.ad == "null" || $.ad == "") {
            alert("Please enter the Ad Title");
            return false;
        }
        $.x = $('#phoneno').val();
        if ($.x.length != 10) {
            alert("Enter 10 digit mobile No.");
            return false;
        }
        $.d = $('#description').val();
        if ($.d.length <= 10) {
            alert("Please enter proper description");
            return false;
        }
        $.r = $('#rentperday').val();
        if ($.r == "null" || $.r == "") {
            alert("Enter rent per day");
            return false;
        }
        $.m = $('#maxdays').val();
        if ($.m == "null" || $.m == "") {
            alert("Enter max no. of days");
            return false;
        }
        if ($.m > 30) {
            alert("Max. no of days item can be rented is 30");
            return false;
        }
        $.a = $('#depositamt').val();
        if ($.a == "null" || $.a == "") {
            alert("Enter deposit amount");
            return false;
        }
        if (true) {
            $.ajax({
                url: base_url + 'welcome/adpost',
                type: 'POST',
                data: {
                    adtitle: $("#adtitle").val(),
                    phoneno: $("#phoneno").val(),
                    photo1: $("#imgurl").val(),
                    category: $("#category").val(),
                    description: $("#description").val(),
                    rentperday: $("#rentperday").val(),
                    maxdays: $("#maxdays").val(),
                    depositamt: $("#depositamt").val(),
                    city: $("#city").val(),
                },
                success: function (res) {
                    if (res.status == 'success') {
                        goto_page('home.html');
                    } else { }
                },
            });
        }
    })
})

myApp.onPageInit('account_details', function (page) {
    $.ajax({
        url: base_url + 'welcome/account_details',
        type: 'POST',
        data: {},
        success: function (res) {
            if (res.status == 'success') {
                var disp_name = document.getElementById('disp_name');
                disp_name.value = res.user_details["name"];
                var emailid = document.getElementById('disp_email');
                emailid.value = res.user_details["email"];
                var p = document.getElementById('disp_phoneno');
                p.value = res.user_details["phoneno"];
                var g = document.getElementById('disp_gender');
                g.value = res.user_details["gender"];
                var dob = document.getElementById('disp_dob');
                dob.value = res.user_details["dob"];
                var c = document.getElementById('disp_city');
                c.value = res.user_details["city"];
                var ph = document.getElementById('photo_edit');
                ph.src = res.user_details['profileph']
            } else { }
        },
    });
    $("#updatedetails_btn").click(function () {
        $.ajax({
            url: base_url + 'welcome/account_details',
            type: 'POST',
            data: {},
            success: function (res) {
                if (res.status == 'success') {
                    storelocal(res.user_details);
                } else { }
            },
        });

        function storelocal(dbinput) {
            var userid = dbinput['userid']
            var newphno = $$("#disp_phoneno").val()
            var newcity = $$("#disp_city").val()
            if (newphno == dbinput['phoneno']) {
                if (newcity == dbinput['city']) {
                    alert('No details changed. Details up to date')
                } else {
                    $.ajax({
                        url: base_url + 'welcome/updatedetails',
                        type: 'POST',
                        data: {
                            userid: userid,
                            phoneno: newphno,
                            city: newcity,
                        },
                        success: function (res) {
                            if (res.status == 'success') {
                                alert('Details Updated. Please login again to see the changes.');
                            } else {
                                Alert(res.api_msg);
                            }
                        },
                    });
                }
            } else {
                $.ajax({
                    url: base_url + 'welcome/updatedetails',
                    type: 'POST',
                    data: {
                        userid: userid,
                        phoneno: newphno,
                        city: newcity,
                    },
                    success: function (res) {
                        if (res.status == 'success') {
                            alert('Details Updated');
                        } else {
                            alert(res.api_msg);
                        }
                    },
                });
            }
        }
    })
    $("#postedads_btn").click(function () {
        goto_page('postedads.html')
    })

})

myApp.onPageInit('product_details', function (page) {
    $.ajax({
        url: base_url + 'welcome/product_details',
        type: 'POST',
        crossDomain: true,
        data: {},
        success: function (res) {
            if (res.status == 'success') {
                var category = document.getElementById('adtitle');
                category.innerHTML = res.ad_details["adtitle"];
                var date = document.getElementById('postdate');
                var MyDate = res.ad_details["postdate"];
                var MyDateYear;
                var MyDateMonth;
                var MyDateDate;
                var MyDateString;
                var adid = res.ad_details['adid'];
                document.getElementById('adid').value = adid;
                MyDateYear = MyDate.slice(0, 4)
                MyDateMonth = MyDate.slice(5, 7)
                MyDateDate = MyDate.slice(8, 10)
                MyDateString = MyDateDate + '-' + MyDateMonth + '-' + MyDateYear;
                date.value = MyDateString;
                postdate.innerHTML = "<span style='color: black;'>Ad Posted on: </span>" + MyDateString;
                var category = document.getElementById('category');
                category.innerHTML = "<span style='color: black;'>Category: </span>" + res.ad_details["category"];
                var category = document.getElementById('posted by');
                category.innerHTML = "<span style='color: black;'>Posted By: </span>" + res.user_name["name"];
                var category = document.getElementById('city');
                category.innerHTML = "<span style='color: black;'>City: </span>" + res.ad_details["city"];
                var category = document.getElementById('description');
                category.innerHTML = res.ad_details["description"];
                var maxidays = document.getElementById('maxdays');
                maxidays.innerHTML = "<span style='color: black;'>Max days: </span><span id='newmax'>" + res.ad_details['maxdays'] + "</span>";
                var category = document.getElementById('userid');
                category.innerHTML = res.ad_details["userid"];
                var category = document.getElementById('depositamt');
                category.innerHTML = "<span style='color: black;'>Deposit amount: ₹</span>" + res.ad_details["depositamt"];
                var category = document.getElementById('rentperday');
                category.innerHTML = "<span style='color: black;'>Rent per day: ₹</span>" + res.ad_details["rentperday"] + "/Day";
                var category = document.getElementById('photo1');
                category.src = res.ad_details["photo1"];
            } else {
                alert(res.api_msg);
            }
        },
    });

})

myApp.onPageInit('postedads', function (page) {
    $.ajax({
        url: base_url + 'welcome/user_posts',
        type: 'POST',
        crossDomain: true,
        data: {},
        success: function (res) {
            if (res.status == 'success') {
                var html = '';
                $("#product_listing").empty();
                $.each(res.adpost, function (index, value) {
                    var MyDate = value.postdate;
                    var MyDateYear;
                    var MyDateMonth;
                    var MyDateDate;
                    var MyDateString;
                    MyDateYear = value.postdate.slice(0, 4)
                    MyDateMonth = value.postdate.slice(5, 7)
                    MyDateDate = value.postdate.slice(8, 10)
                    MyDateString = MyDateDate + '-' + MyDateMonth + '-' + MyDateYear;
                    html += '<div onclick="moredetails(' + value.adid + ')" class="card facebook-card">' +
                        '<div class="card-header">' +
                        '<div class="facebook-avatar">' +
                        value.category +
                        '</div>' +
                        '<div class="facebook-name">' +
                        '' +
                        '</div>' +
                        '<div class="facebook-date" style="text-align: right;">' +
                        MyDateString +
                        '</div>' +
                        '</div>' +
                        '<div class="card-header">' +
                        '<div class="facebook-avatar">' +
                        '' +
                        '</div>' +
                        '<div class="facebook-name">' +
                        value.adtitle +
                        '</div>' +
                        '<div class="facebook-date">' +
                        '' +
                        '</div>' +
                        '</div>' +
                        '<div class="card-content">' +
                        '<div class="card-content-inner">' +
                        '<div class="swiper-container swiper-init">' +
                        '<div class="swiper-wrapper">' +
                        '<div class="swiper-slide">' +
                        '<img src="' + value.photo1 + '" class="resize">' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="card-footer">' +
                        '<a href="#" class="link">₹' + value.rentperday + '/Day</a>' +
                        '<a href="#" class="link"  onclick="moredetails(' + value.adid + ')">More details</a>' +
                        '</div>' +
                        '</div>';
                })
                $("#product_listing").html(html);
            } else if (res.status == 'failed') {
                alert('You have posted no Ads yet!');
                goto_page('account_details.html')
            }
        }
    });
})

myApp.onPageInit('sbcpage', function (page) {
    $.ajax({
        url: base_url + 'welcome/sbcpage',
        type: 'POST',
        crossDomain: true,
        data: {},
        success: function (res) {
            if (res.status == 'success') {
                var html = '';
                $("#product_listing").empty();
                $.each(res.adpost, function (index, value) {
                    var MyDate = value.postdate;
                    var MyDateYear;
                    var MyDateMonth;
                    var MyDateDate;
                    var MyDateString;
                    MyDateYear = value.postdate.slice(0, 4)
                    MyDateMonth = value.postdate.slice(5, 7)
                    MyDateDate = value.postdate.slice(8, 10)
                    MyDateString = MyDateDate + '-' + MyDateMonth + '-' + MyDateYear;
                    html += '<div onclick="moredetails(' + value.adid + ')" class="card facebook-card">' +
                        '<div class="card-header">' +
                        '<div class="facebook-avatar">' +
                        value.category +
                        '</div>' +
                        '<div class="facebook-name">' +
                        '' +
                        '</div>' +
                        '<div class="facebook-date" style="text-align: right;">' +
                        MyDateString +
                        '</div>' +
                        '</div>' +
                        '<div class="card-header">' +
                        '<div class="facebook-avatar">' +
                        '' +
                        '</div>' +
                        '<div class="facebook-name">' +
                        value.adtitle +
                        '</div>' +
                        '<div class="facebook-date">' +
                        '' +
                        '</div>' +
                        '</div>' +
                        '<div class="card-content">' +
                        '<div class="card-content-inner">' +
                        '<div class="swiper-container swiper-init">' +
                        '<div class="swiper-wrapper">' +
                        '<div class="swiper-slide">' +
                        '<img src="' + value.photo1 + '" class="resize">' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="card-footer">' +
                        '<a href="#" class="link">₹' + value.rentperday + '/Day</a>' +
                        '<a href="#" class="link"  onclick="moredetails(' + value.adid + ')">More details</a>' +
                        '</div>' +
                        '</div>';
                })
                $("#product_listing").html(html);
            } else if (res.status == 'failed') {
                alert('No Ads for this category. Please check back later!');

            }
        }

    });
})

myApp.onPageInit('logout', function (page) {
    $.ajax({
        url: base_url + 'welcome/logout',
        type: 'POST',
        crossDomain: true,
        data: {},
    });
    goto_page('login.html');
    mainView.hideNavbar();

})

function open_dialog_for_image() {
    var buttons1 = [{
        text: 'choose source',
        label: true
    }, {
        text: 'Camera',
        bold: true,
        onClick: image_camera,
    }, {
        text: 'Gallery',
        bold: true,
        onClick: image_gallery,
    }];
    var buttons2 = [{
        text: 'Cancel',
        color: 'red'
    }];
    var groups = [buttons1, buttons2];
    myApp.actions(groups);
}

function image_gallery() {
    navigator.camera.getPicture(uploadPhoto, function (message) {
        alert('get picture failed');
    }, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
            targetWidth: 1280,
            targetHeight: 720,
            correctOrientation: true,
        });
}

function image_camera() {
    navigator.camera.getPicture(uploadPhoto, function (message) {
        alert('get picture failed');
    }, {
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            targetWidth: 1280,
            targetHeight: 720,
            correctOrientation: true,
        });
}

function uploadPhoto(imageURI) {
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    var params = new Object();
    params.value1 = "test";
    params.value2 = "param";
    options.params = params;
    options.chunkedMode = false;
    var ft = new FileTransfer();
    ft.upload(imageURI, "http://doshiharsh.000webhostapp.com/CI/application/controllers/upload_image.php", function (result) {
        alert("Image uploaded");
        document.getElementById('imgurl').value = options.fileName;
    }, function (error) {
        alert("Image not uploaded");
    }, options);
}

function j2s(json) {
    return JSON.stringify(json);
}

function moredetails(id) {
    $.ajax({
        url: base_url + 'welcome/moredetails',
        type: 'POST',
        data: {
            id: id,
        },
    });
    goto_page('product_details.html');
}

function logout() {
    alert("Logout is clicked");
    $.ajax({
        url: base_url + 'welcome/logout',
        type: 'POST',
        data: {},
    });
    document.getElementById("noti").innerHTML = "";
    mainView.hideNavbar();
}

function rentit() {
    var no_days = document.getElementById('no_days').value;
    var adid = document.getElementById('adid').value;
    var userid = document.getElementById('userid').value;
    var m = document.getElementById('newmax').innerHTML;
    document.getElementById("noti").innerHTML = "You have successfully bought this product for rent  " + adid + " for " + no_days;
    if (no_days > m) {
        alert('Max Days the item is available for rent is ' + m);
    } else {
        alert("Rented " + adid + " for " + no_days);
        $.ajax({
            url: base_url + 'welcome/rentit',
            type: 'POST',
            data: {
                no_days: no_days,
                adid: adid,
                userid: userid,
            },
            success: function (res) {
                if (res.status == 'success') {
                    alert("Rented Successfully");
                } else { }
            },
        });
    }
}

function sbc(elementId) {
    $.ajax({
        url: base_url + 'welcome/sbc',
        type: 'POST',
        crossDomain: true,
        data: {
            category: elementId,
        },
    });
    goto_page('sbcpage.html');
}
var base_url = 'http://192.168.0.113/CI/index.php/';

// Initialize app
var myApp = new Framework7({
    pushState: false,
    swipeBackPage: false,
    preloadPreviousPage: false,
    uniqueHistory: true,
    uniqueHistoryIgnoreGetParameters: true,
    modalTitle: 'TestApp',
    imagesLazyLoadPlaceholder: 'img/lazyload.jpg',
    imagesLazyLoadThreshold: 50,

});

// If we need to use custom DOM library, let's save it to $$ variable:
// var app= new Framework7();
var $$ = Dom7;


// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    // dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    //  mainView.hideNavbar();
    goto_page('product_details.html');
    // if(token_data == undefined){ 
    //     goto_page('login.html');
    // } else {
    //     goto_page('home.html');
    // }
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('home', function(page) {
    $("#searchb").blur(function() {
        var query = document.getElementById('searchb').value;
        console.log("Searched for:" + query);
        $.ajax({
            url: base_url + 'welcome/search',
            type: 'POST',
            crossDomain: true,
            data: {
                query: query,
            },
            success: function(res) {
                if (res.status == 'success') {

                    console.log(res.user_details);
                    console.log("Successful in Searching in ajax for " + query);
                } else {
                    console.log(res.api_msg);
                    alert('Error inn ajax');

                }
                console.log(res.status);
            },
        });
    })
    var html = '';
    // $.each(res.user_details, function(index, value){
    // })
    for (var i = 0; i < 4; i++) {
        html += '<div class="card facebook-card">' +
            '<div class="card-header">' +
            // '<div class="facebook-avatar"><img src="css/hi/images/'+hatch1.jpg+'" width="34" height="34"></div>'+
            '<div class="facebook-avatar"><img src="css/hi/images/hatch1.jpg width="34" height="34"></div>' +
            '<div class="facebook-name">John Doe</div>' +
            '<div class="facebook-date">Monday at 2:15 PM</div>' +
            '</div>' +
            '<div class="card-content">' +
            '<div class="card-content-inner">' +
            '<p>What a nice car!!</p>' +
            '<div class="swiper-container swiper-init">' +
            '<div class="swiper-wrapper">' +
            '<div class="swiper-slide">' +
            '<img src="css/hi/images/hatch1.jpg" max-height="100%" max-width="100%">' +
            '</div>' +
            '<div class="swiper-slide">' +
            '<img src="css/hi/images/hatch2.jpg" max-height="100%" max-width="100%">' +
            '</div>' +
            '<div class="swiper-slide">' +
            '<img src="css/hi/images/hatch3.jpg" max-height="100%" max-width="100%">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="card-footer"><a href="#" class="link">Add to Wishlist</a><a href="product_details.html" class="link">More details</a></div>' +
            '</div>';

    }

    $("#product_listing").html(html);
    // Do something here for "about" page
})

myApp.onPageInit('login', function(page) {

    $("#signin_btn").click(function() {
        var email = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        $.emailid = $('#email').val();
        if ($.emailid.match(email)) {} else {
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
                success: function(res) {
                    if (res.status == 'success') {
                        console.log(res.user_details);
                        var username = document.getElementById('username');
                        var nam = res.user_details["name"];
                        username.innerHTML = nam;
                        console.log(nam);
                        var disp_name = document.getElementById('disp_name');
                        //var nam1=res.user_details["name"];
                        //disp_name.innerHTML=nam;
                        goto_page('home.html');
                        mainView.showNavbar();

                        // myApp.addNotification({
                        //     title: 'Default notification',
                        //     message: 'This is default notification with title and message'
                        //  });

                    } else {
                        console.log(res.api_msg);
                        alert('Hello');

                    }
                    console.log(res.status);
                },
            });
        }
    })
    $("#signup_page").click(function() {
        // app.dialog.alert('Hello');
        goto_page("signup.html");
    })
    // $$('.open-alert').on('click', function () {
    //     app.dialog.alert('Hello');
    //   });

})

myApp.onPageInit('signup', function(page) {
    $("#signup_btn").click(function() {
        $.n = $('#name').val();
        if ($.n == "null" || $.n == "") {
            alert("Please enter the name");
            return false;
        }
        var email = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        $.emailid = $('#email').val();
        if ($.emailid.match(email)) {} else {
            alert("Please enter the correct email");
            return false;
        }
        $.x = $('#phoneno').val();
        if ($.x.length != 10) {
            alert("Enter 10 digit mobileno");
            return false;
        }
        $.p1 = $('#password').val();
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
                    email: $("#email").val(),
                    phoneno: $("#phoneno").val(),
                    password: $("#password").val(),
                    gender: $("#gender").val(),
                    dob: $("#dob").val(),
                    city: $("#city").val(),
                },
                success: function(res) {
                    if (res.status == 'success') {
                        goto_page('home.html');
                    } else {
                        console.log(res.api_msg);
                    }
                    console.log(res.status);
                },
            });
        }
    })
})

myApp.onPageInit('adpost', function(page) {
    $("#adpost_btn").click(function() {
    //var fileInput = document.getElementById('image_input_field');
    //var file = fileInput.files[0];
    //var formData = new FormData();
    //formData.append('file', file);
        console.log("ad");

        $.ad = $('#adtitle').val();
        if ($.ad == "null" || $.ad == "") {
            alert("Please enter the Adtitle");
            return false;
        }
        $.x = $('#phoneno').val();
        if ($.x.length != 10) {
            alert("Enter 10 digit mobileno");
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
            alert("Enter max no of days");
            return false;
        }
        if ($.m > 30) {
            alert("Entered limit is not correct");
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
                    //'file': file,
                    //'module' : 'ajax_data_form',
                    category: $("#category").val(),
                    description: $("#description").val(),
                    rentperday: $("#rentperday").val(),
                    maxdays: $("#maxdays").val(),
                    depositamt: $("#depositamt").val(),
                    city: $("#city").val(),
                },
                success: function(res) {
                    if (res.status == 'success') {
                        goto_page('home.html');
                    } else {
                        console.log(res.api_msg);
                    }
                    console.log(res.status);
                },
            });
        }
    })
})

myApp.onPageInit('index', function(page) {
    $("#homenvabar").click(function() {
        goto_page('home.html');
    })
})




// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function(e) {
    // Get page data from event data
    var page = e.detail.page;
    $$(page.container).find("script").each(function(el) {
        if ($$(this).attr('src')) {
            jQuery.getScript($(this).attr('src'));
        } else {
            eval($$(this).text());
        }
    });

})



function goto_page(page) {
    mainView.router.load({
        url: page,
        ignoreCache: false,
    });
}
myApp.onPageInit('account_details', function(page) {
    $.ajax({
        url: base_url + 'welcome/account_details',
        type: 'POST',
        data: {},
        success: function(res) {
            if (res.status == 'success') {
                console.log(res.user_details);
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
            } else {
                console.log(res.api_msg);
            }
        },
    });

})
var mySwiper = myApp.swiper('.swiper-container', {
    pagination: '.swiper-pagination'
})

//myApp.onPageInit('home', function (page) {


/*
        if(true){
            $.ajax({
                url: base_url+'welcome/login',
                type: 'POST',
                crossDomain: true,
                data: {
                    email : $("#email").val(),password : $("#password").val(),
                },
                success: function(res){
                    if (res.status == 'success') {
                        console.log(res.user_details);
                        var username=document.getElementById('username');
                        var nam=res.user_details["name"];
                        username.innerHTML=nam;
                        console.log(nam);
                        var disp_name=document.getElementById('disp_name');
                        //var nam1=res.user_details["name"];
                        //disp_name.innerHTML=nam;
                        goto_page('home.html');
                            mainView.showNavbar();

                            // myApp.addNotification({
                            //     title: 'Default notification',
                            //     message: 'This is default notification with title and message'
                            //  });
                 
                    } else {
                        console.log(res.api_msg);
                       alert('Hello');

                    }
                    console.log(res.status);
                },
            });
        })
    })*/


function open_dialog_for_image() {
    console.log("click event triggered");
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
    console.log("gallery selection");
    navigator.camera.getPicture(imagead_onSuccess, imagead_onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
        targetWidth: 720,
        targetHeight: 640,
        correctOrientation: true,
        allowEdit: true,
    });
}

function image_camera() {
    console.log("camera triggered");
    navigator.camera.getPicture(imagead_onSuccess, imagead_onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        targetWidth: 720,
        targetHeight: 640,
        correctOrientation: true,
        allowEdit: true,
    });
}

function imagead_onSuccess(fileURL) {
    console.log("on selection success");
    myApp.showPreloader('uploading image');
    var uri = encodeURI("http://192.168.0.113/CI/upload/");
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    var headers = {
        'headerParam': 'headerValue'
    };
    options.headers = headers;
    new FileTransfer().upload(fileURL, uri, imagead_onSuccess_file, imagead_onError_file, options);
}

function imagead_onSuccess_file(res) {
    console.log('res: ' + j2s(res));
    myApp.hidePreloader();
    if (res.responseCode == 200) {
        uploaded_image = res.response.replace(/\"/g, "");
        image_from_device = uploaded_image;
        console.log('uploaded_image: ' + uploaded_image);
        // $('#shopper_register-profile_image').val(uploaded_image);
        myApp.alert("Image Uploaded Successfully");
    } else {
        myApp.hidePreloader();
        myApp.alert('Some error occurred on uploading');
    }
}

function imagead_onFail(message) {
    console.log('Failed because: ' + message);
}

function imagead_onError_file(error) {
    myApp.hidePreloader();
    console.log("An error has occurred: Code = " + error.code);
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
    myApp.alert("Some Error Occured While image upload please try again");
}
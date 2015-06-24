$("#check_in").on("click", function(){
    console.log("click")
    getLocation()
});

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    }else{
        alert('ブラウザが位置情報取得に対応しておりません');
    }
}
function addPoint(){
    $.get('/add_point', function(data){
        $("#user_point").text(data);
        alert("ポイント加算");
    });
}
function successCallback(position){
    var placeX = $("#longitude").attr("value");
    var placeY = $("#latitude").attr("value");
    var userX = position.coords.longitude;
    var userY = position.coords.latitude;
    console.log("placeX" + placeX);
    console.log("placeY" + placeY);
    console.log("userX" + userX);
    console.log("userY" + userY);
    if(collision(placeX, placeY, userX, userY, 1)){
        addPoint();
    }else{
        alert("お店にいません");
    }
}


function errorCallback(error){
    alert("位置情報が取得できませんでした");
}

function collision(placeX, placeY, userX, userY, range){
    var margin = range / 2;
    var userX = userX - margin;
    var userY = userY - margin;
    placeX = placeX - margin;
    placeY = placeY - margin;
    return placeX < userX && placeX + range > userX && placeY < userY && placeY + range > userY;
}

$("#place_id").attr("value")
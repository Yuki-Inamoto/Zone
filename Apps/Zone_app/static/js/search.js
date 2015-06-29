

//action when click tags for search
// ======================

var checkedStyle = "cursor: default; background-color: rgb(128, 138, 178); color: rgb(255, 255, 255);"

$(':checkbox').click(function(){
    if($(this).is(':checked')){
        $(this).parent("label").attr('style', checkedStyle);
    }
    else{
        $(this).parent("label").attr('style', "");
    }

    var length = $('[name=category]:checked').length;
    var categories =[];
    for(var i=0; i<length; i++){
        categories.push($($('[name=category]:checked')[i]).val());
    }

    var length = $('[name=tool]:checked').length;
    var tools =[];
    for(var i=0; i<length; i++){
        tools.push($($('[name=tool]:checked')[i]).val());
    }

    $.post("/list/", {categories:categories, tools:tools}, loadPlaces);

})


/*
function loadPlaces(data){
    var places = $.parseJSON(data);
    $('div.search-result').html("");
    for(i in places){
        var str = ''
        str += '<div class="entry" style="float:left;width:306px;height:300px;margin-bottom:28px; "><div id="entries"><div style="width:270px;height:180px;">';
        str += '<a href="/detail/'+ places[i].id + '"> <img src="' + places[i].picture + '" alt='+ places[i].name + ' width="270" height="180"></a></div>';
        str += '<div id="entrytitle"><a href="/detail/' + places[i].id + '">' + places[i].name + '</a></div>';
        str += '<div style="width:230px;height:43px;margin:9px 16px 10px 20px;line-height:22px;"><span style="font-size:12px;">wi-fi:';
        if(places[i].wifi_softbank)str += " softbank";
        if(places[i].wifi_free)str += " free";
        str += '</span></div><div style="float:right;font-size:11px;margin:0px 13px 9px 0px;">東京・西新宿</div></div></div>';
        $('div.search-result').append(str);
    }

}*/

//action when search places with search-form of top-var
// ======================
function searchPlaces(){
    $.post("/maps/", {address:$('[name=address]').attr('value'), place_name:$('[name=place_name]').attr('value')}, loadPlaces);
}

function loadPlaces(data){
    cosole.log('jsontest')
    if(location.href=="http://127.0.0.1:8000/maps/"){
        cosole.log('jsontest')
        var places = $.parseJSON(data);
        $('div.select').html("");
    }
}
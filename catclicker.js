$(document).ready(function(){
    var cats;
    var cats_img = ["cat.jpg", "cat2.jpg", "cat3.jpg", "cat4.png", "cat5.png"];
    var cats_name = ["Kim","Oh","Park","Ahn","Sung"];
    var cat_count = [0, 0, 0, 0, 0];
    var num_cat = 5;
    var container = $(".container");
    var display_box = $(".display_box");
    var list = $("<ol></ol>");
    container.append(list);

    for( var i = 0; i < num_cat ; i += 1 ){
        var li = $("<li>"+ cats_name[i] + "</li>");
        list.append(li);

        var img = cats_img[i];
        var catname = cats_name[i];
        var count_cat = cat_count[i];

        li.click( (function(imgCopy, catnameCopy, countCopy){
        
            return function(){
                countCopy += 1;
                display_box.html("");
                display_box.append("<h1>" + catnameCopy + "</h1>"+
                                "<h2>" + countCopy + "</h2>" +
                    "<img src = " + imgCopy + ">");
            }
        
        })(img, catname, count_cat));

    }

    list.css("float", "left");


})
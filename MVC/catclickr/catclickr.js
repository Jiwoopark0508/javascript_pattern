$(document).ready(function(){

    var model = {
        admin_mode : false,
        currentCat : null,
        cat_list : [],
        num_cats : 5,
        init : function(){
            var cats_img = ["cat.jpg", "cat2.jpg", "cat3.jpg", "cat4.png", "cat5.png"];
            var cats_name = ["Vonn","Oh","Park","Ahn","Sung"];
            
            
            for ( var i = 0; i < this.num_cats; i += 1 ){
                model.cat_list[i] = {
                    name : cats_name[i],
                    img : 'img/' + cats_img[i],
                    count : 0
                }
            }
        }

    }

    var octopus = {
        init : function(){
            model.init();

            model.currentCat = model.cat_list[0];
            view.init_view();
        },
        //current Cat
        getCurrentCat : function(){
            return model.currentCat;
        },
        setCurrentCat : function(cat){
            model.currentCat = cat;
        },
        // get All cats
        getCats : function(){
            return model.cat_list;
        },

        // for event handling
        incrementCounter : function(){
            this.getCurrentCat().count += 1;
            view.display_render();
            view.admin_render();
        },
        //Admin Toggle
        offAdmin : function(){
            if( model.admin_mode == true){
                model.admin_mode = false;
                view.admin_render();
            }
        },
        onAdmin: function(){
            if( model.admin_mode == false){
                model.admin_mode = true;
                view.admin_render();
            }
        },
        saveChange : function(str){
            model.currentCat.name = str;
            view.list_render();
        }
    }

    var view = {

        init_view : function(){
            this.List = $("#list");
            this.Display_box = $(".display");
            
            this.cat_count = $(".cat-count");
            this.cat_name = $(".cat-name");
            this.admin_button = $("a.admin");
            this.admin = $("div.admin");

            this.Display_box.click(function(){
                octopus.incrementCounter();
            })

            this.admin_button.click(function(){
                octopus.onAdmin();
            })

            this.list_render();
            this.display_render();
            this.admin_render();
        },

        list_render : function(){
            var cats = octopus.getCats();
            var cat;
            this.List.html('');
            for (var i = 0; i < model.num_cats ; i += 1 ){
                var li = $("<li></li>");
                cat = cats[i];
                li.append(cat.name)
                li.click((function(catCopy){
                    return function(){
                        octopus.setCurrentCat(catCopy);
                        view.display_render();
                        view.admin_render();
                    }
                })(cat))

                this.List.append(li);
            }

        },

        display_render : function(){
            var curCat = octopus.getCurrentCat();
            this.Display_box.html( '<img src = ' + curCat.img +">");

            this.cat_count.text( curCat.count );
            this.cat_name.html( curCat.name );
        },

        admin_render : function(){

            var htmlStr = '';
            var curCat;
            if( model.admin_mode){
                curCat = octopus.getCurrentCat();
                htmlStr += '<input id = "name" type = "text" value ='+ curCat.name + '>'+ 
                    '<label for = "name">Name</label>'+
                    '<input id = "url" type = "text" value  =' + curCat.img + '>'+ 
                    '<label for = "url">Img URl</label>'+ '<br>' +
                    '<a class = "blue yellow-text">'+ curCat.count +
                    '</a>'+ '<br>'+
                    '<a href="#" class = "blue waves-effect waves-light btn close">Close</a>'+
                    '<a href="#" class = "blue waves-effect waves-light btn save">Save</a>';
                this.admin.html(htmlStr);
                
                this.close = $(".close");
                this.save = $(".save");

                this.close.click(function(){
                    octopus.offAdmin();
                })
                //Save event Handling
                this.save.click(function(){
                    var str = $('#name').val();
                    octopus.saveChange(str);
                })
            }
            else{
                this.admin.html('');
            }

        }

    }

    octopus.init();

})
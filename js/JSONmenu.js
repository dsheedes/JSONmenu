(function( $ ){
    let menu = {
        header:"",
        body:[{}],
        footer:""
    }
    function draw(main){
        main.hide(200);
        main.html("");
        let data = "<ul class='list-group json-menu-header'>";
        if(menu.header){
            data = `
                <li class='list-group-item json-menu-header'>
                    ${menu.header}
                </li>`;
        }


        // Header is set, we can proceed adding other data.

        for(let i = 0; i < menu.body.length; i++){

            data += `
                <li class='json-list-item${i} list-group-item json-item-header' data-toggle='${(menu.body[i].collapse)?"collapse":""}' href='#jsonItem${i}' role='button'>
                    ${menu.body[i].header}
                <div id='jsonItem${i}' class="json-item-body collapse ${(menu.body[i].collapse)?"":"show"}">
                    ${menu.body[i].body}
            `;
            if(menu.body[i].footer){
                data+= `
                <div class='json-item-footer'>
                    ${menu.body[i].footer}
                </div>`;
            }
            data += `</div></li>`;

            if(i == menu.body.length - 1){
                if(menu.footer){
                    data += `
                        <div class='json-menu-footer'>
                            ${menu.footer}
                        </div>
                    `;
                }
                data += `</ul>`;
                main.html(data);
                main.show(200);
            }

        }
    }
    function show(speed){
        if(!speed)
            speed = 500;
        main.show(speed);
    }
    function hide(speed){
        if(!speed)
            speed = 200;
        main.hide(speed);
    }
    function expand(item){

    }
    function collapse(item){

    }
    function has(item){
        for(let i = 0; i < menu.body.length; i++){
            console.log(menu.body[i]);
            if(item.header && menu.body[i].header && item.header == menu.body[i].header){
                console.log("sup")
                if(item.body && menu.body[i].body && item.body == menu.body[i].body){
                    return i;
                }
            } else return -1;
        }
    }
    function remove(item){
        if(has(item) != -1){
            menu.body.splice(i, 1);
            draw();
        }
    }
    function alert(item, options){
        let i = has(item);
        if(i != -1){
            item = $(".json-list-item"+i);
            item.addClass("json-item-flash");
            let previous = $(options.messageElement).html();
            $(options.messageElement).html(options.message).addClass("json-text-alert");
            setTimeout(() => {
                item.removeClass("json-item-flash");
                $(options.messageElement).html(previous).removeClass("json-text-alert");
            }, options.timeout);
        } else console.error("Alert unsuccessfull, cannot find item: ", item);
    }
    $.fn.jsonMenu = function(action, items, options){
        $(this).addClass("json-menu")
        if(action == "add"){
            if(!items.header)
                console.error("This item hasn't got a header, collapsing will not work. "+items);
            if(!items.body)
                console.error("This item doesn't have a body, collapsing will not work. "+items);
            menu.body.push(items);
            draw($(this));
        } else if(action == "set"){
            if(!items.body){
                console.error("This menu doesn't have a body.") 
            } else if(items.body.length == 0){
                console.error("This body doesn't have any items. Use .clear()");
            } else {
                menu = items;
                draw($(this));
            }

        } else if(action == "remove"){
            remove(items);
        } else if(action == "clear"){
            menu = null;
            draw();
        } else if(action == "show"){
            show(options.speed);
        } else if(action == "hide"){
            hide(options.speed);
        } else if(action == "alert"){
            if(!items){
                console.error("You need to send the alert item!");
            } else{
                if(!options){
                    console.error("You need to send alert message options first!");
                } else {
                    alert(items, options);
                }
            }

        }
        return this;
    }
 })( jQuery );
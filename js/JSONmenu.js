(function( $ ){
    let menu = {
        "header":"",
        "body":[{}]
    }
    function draw(main){
        main.hide(200);
        main.html("");
        let data = "";
        if(menu.header){
            data = `
            <ul class='list-group json-menu-header'>
                <li class='list-group-item json-menu-header'>
                    ${menu.header}
                </li>`;
        }


        // Header is set, we can proceed adding other data.

        for(let i = 0; i < menu.body.length; i++){

            data += `
                <li class='list-group-item json-item-header' data-toggle='${(menu.body[i].collapse)?"collapse":""}' href='#jsonItem${i}' role='button'>
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
                data += `</ul>`;
                main.html(data);
                main.show(200);
            }

        }
    }
    function show(speed){
        if(!speed)
            speed = 300;
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
    function equals(item){
        for(let i = 0; i < menu.body.length; i++){
            if(item.header && menu.body[i].header && item.header == menu.body[i].header){
                if(item.body && menu.body[i].body && item.body == menu.body[i].body){
                    if(item.footer && menu.body[i].footer && item.footer == menu.body[i].footer){
                        return true;
                    }
                }
            } else return false;
        }
    }
    $.fn.jsonMenu = function(action, items){
        $(this).addClass("json-menu")
        if(action == "add"){
            if(!items.header)
                console.error("This item hasn't got a header, collapsing will not work. "+items);
            if(!items.body)
                console.error("This item doesn't have a body, collapsing will not work. "+items);
            menu.body.push(items);
            draw($(this));
            return this;
        } else if(action == "set"){
            if(!items.body){
                console.error("This menu doesn't have a body.") 
            } else if(items.body.length == 0){
                console.error("This body doesn't have any items. Use .clear()");
            } else {
                menu = items;
                draw($(this));
            }
            return this;
        } else if(action == "remove"){

        } else if(action == "clear"){

        } else {
            return this;
        }
    }
 })( jQuery );
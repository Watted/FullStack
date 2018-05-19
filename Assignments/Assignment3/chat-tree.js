function ChatTree(element) {
    document.body.addEventListener('keyup', actionKey);

    function load(items) {

        clear();
        loadItems(items,0,null);
    }

    function loadItems(items,numberOfSpaces,parent) {
        let childrens = [];
        for (let item of items){
            let li = $('<li>');
            li.addClass(item.type);
            li.append('&nbsp;'.repeat(numberOfSpaces) + item.name);
            li.appendTo(element);
            li.data('parent',parent);
            li.click(() => {
                clearMarks();
                $(li).addClass('mark');
            });

            li.dblclick(() => {
                dblclick();
            });
            if (numberOfSpaces !==0) {
                li.addClass('hidden');
                childrens.push(li);
                parent.data("children",childrens);
            }

            if (item.items){
                loadItems(item.items,numberOfSpaces+3,li);
            }

        }

    }

    function clearMarks() {
        let item = $('.mark');
        $(item).removeClass('mark');

    }

    function dblclick() {
        let node = $(element).find('.mark');
        if(node.length !==0){
            let children = $(node).data('children');
            if(children){
                for(item of children){
                    item.toggleClass('hidden');
                    hiddenChildren($(item).data('children'));
                }
            }
        }
    }

    function hiddenChildren(items) {
        if (items) {
            for (item of items) {
                item.addClass('hidden');
                hiddenChildren($(item).data('children'));
            }
        }
    }

    function actionKey(e){
        switch(e.key){
            case 'ArrowRight':
                arrowRight();
                break;
            case 'ArrowLeft':
                arrowLeft();
                break;
            case 'ArrowUp':
                arrowUp();
                break;
            case 'ArrowDown':
                arrowDown();
                break;
            case 'Enter':
                enter();
                break;
        }
    }

    function enter(){
        let parent = $(element).find('.mark');
        let children = $(parent).data('children');
        if ($(parent).hasClass('user') === false ){
            if ($(children[0]).hasClass('hidden')===false){
                for (let child of children){
                    child.addClass('hidden');
                    hiddenChildren($(child).data('children'));
                }
            }else {
                for (let child of children){
                    child.removeClass('hidden');
                }
            }
        }
    }

    function arrowRight(){
        let parent = $(element).find('.mark');
        let children = $(parent).data('children');
        if(parent.length > 0 && children){
            for(item of children){
                item.removeClass('hidden');
            }
        }
    }

    function arrowLeft(){
        let parent = $(element).find('.mark');
        let children = $(parent).data('children');

        if(parent.length !== 0) {
            if (!children || children[0].hasClass('hidden')) {
                if ($(parent).data('parent')) {
                    clearMarks();
                    $(parent).data('parent').addClass('mark');
                }
            }
            else {
                for (item of children) {
                    item.addClass('hidden');
                    hiddenChildren($(item).data('children'));
                }
            }
        }
    }

    function arrowUp(){
        let node = $(element).find('.mark');
        if(node.length !== 0){
            let arrayOfLis = $(element).find('li');
            let i = arrayOfLis.length-1;

            for( ; i >= 0 ; i--){
                if($(arrayOfLis[i]).text() === node.text())
                    break;
            }
            for( --i ; i>=0 ; i--){
                if($(arrayOfLis[i]).hasClass('hidden') === false){
                    clearMarks();
                    $(arrayOfLis[i]).addClass('mark');
                    break;
                }
            }
        }
    }

    function arrowDown(){
        let node = $(element).find('.mark');
        if(node.length === 0)
            $($(element).find('li')[0]).addClass('mark');
        else {
            let arrayOfLis =  $(element).find('li');
            let i = 0;

            for( ; i <arrayOfLis.length ; i++){
                if($(arrayOfLis[i]).text() === node.text())
                    break;
            }
            for(++i ; i<arrayOfLis.length ; i++){
                if($(arrayOfLis[i]).hasClass('hidden') === false){
                    clearMarks();
                    $(arrayOfLis[i]).addClass('mark');
                    break;
                }
            }
        }
    }

    function clear() {
        element.innerText = "";

    }

    return {
        load,
        clear,
        element,
    };
}

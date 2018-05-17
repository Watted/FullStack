function ChatTree(element) {

    function load(items) {

        clear();
        loadItems(items,0);
    }

    function loadItems(items,numberOfSpaces) {
        for (let item of items){

            let li = $('<li>');
            li.addClass(item.type);
            li.append('&nbsp;'.repeat(numberOfSpaces) + item.name);
            li.appendTo(element);
            li.click(() => {
                $(this).classList.toggle('active');
            });

            li.dblclick(() => {
                console.log("asdad");
            });
            if (item.items){
                loadItems(item.items,numberOfSpaces+3);
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

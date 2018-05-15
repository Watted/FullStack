function ChatTree(element) {
    function load(items) {
        for (let item of items){
            let x = document.createElement("li").value = item["name"];
            element.append(x);
        }
    }

    function clear() {
        element = ''
    }

    return {
        load,
        clear,
        element,
    };
}

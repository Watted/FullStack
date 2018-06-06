const getHashCode = require('./HashCode');
class ObjectPool {
    constructor() {
        this.items = [];
    }


    add(obj) {
        let hashCode = 0;
        if (hashCode = getHashCode(obj) !== 0) {
            this.items[obj];
        }
    }

    contains(checkIfThereObj) {
        const hashCode = getHashCode(checkIfThereObj);
        return !!hashCode;

    }
}
module.exports = ObjectPool;

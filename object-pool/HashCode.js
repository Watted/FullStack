const MAGIC_FEILD = '###_ori_hash_code';

let count = 1;

function getHashCode(obj) {
    let hashCode = obj[MAGIC_FEILD];

    if (!!hashCode){
        hashCode = obj[MAGIC_FEILD] = count++;

    }
    return hashCode;

}

module.exports = getHashCode;
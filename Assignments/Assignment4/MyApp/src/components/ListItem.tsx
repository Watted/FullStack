import * as React from 'react';

interface IListItem {
    label: string
}

const ListItem = (props: IListItem) => {

    return (
        <ul className='left tree' tabIndex={0}>{props.label}</ul>
    );
};

export default ListItem;
import * as React from 'react';

interface IListItem {
    label: string
}

const ListItem = (props: IListItem) => {

    return (
        <li >{props.label}</li>
    );
};

export default ListItem;
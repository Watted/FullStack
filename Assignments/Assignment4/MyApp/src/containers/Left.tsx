import * as React from "react";
import ListItem from '../components/ListItem';

interface IToDoListState {
    items: string[]
}

class Left extends React.Component<{}, IToDoListState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            items: ['ori', 'Itay']
        }
    }
    public render() {
        const listItems = this.state.items.map((item, idx) => {
            return (<ListItem key={idx} label={item}/>);
        });
        return (
            <ul className='left tree' tabIndex={0}>{listItems}</ul>
        );
    }
}

export default Left;
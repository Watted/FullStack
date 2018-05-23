import * as React from "react";

import TextArea from '../components/TextArea';
import TextButton from '../components/TextButton';
import TextInput from '../components/TextInput';



class ToDoList extends Component {
    render() {
        return (
            <div>
                <TextArea/>
                <TextInput/>
                <TextButton/>
            </div>
        );
    }
}

export default ToDoList;













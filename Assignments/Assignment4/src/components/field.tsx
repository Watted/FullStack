import * as React from 'react';
import './field.css';

interface IFieldProps {
    name: string,
    type?: string,
    onChange(field:string, value:string):void,
    className?:string
}

const Field:React.StatelessComponent<IFieldProps> = (props) => {
    const extractValue = (event : React.ChangeEvent<HTMLInputElement>) =>{
        props.onChange(event.target.name, event.target.value);
    };

    return(
        <p>
            <label className="TextLabel" htmlFor={props.name}>{props.name}:</label>
            <input className="TextInput" type={props.type || 'text'} name={props.name} onChange={extractValue}/>
        </p>
    )
};

export default Field;
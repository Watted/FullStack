import * as React from "react";


class Right extends React.Component {
    public render() {
        return (
            <div className="right">
                <textarea className='content'/>
                <div className="footer">
                    <input type='text' className='text'/>
                    <button type='Button' className='button'>Send</button>
                </div>
            </div>
        );
    }
}

export default Right;
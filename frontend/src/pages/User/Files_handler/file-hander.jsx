import React from "react";

class FileHandler extends React.Component {
    // const [name, setName] = useState("");
    // const [selectedFile, setSelectedFile] = useState('');
    constructor(props){
        super(props)
        this.fileInput = React.createRef();
    }
    state={
        value: ''
    }
    // console.log(selectedFile)
    handleFIleSubmit = (event) =>{
        this.setState({value: this.fileInput.current.files[0]})
        console.log(this.state);
    }
    render(){
        console.log(this.state);
        return(
            <div>
                <h1>submit files</h1>
                <input type="file" ref={this.fileInput} onChange={this.handleFIleSubmit} />
            </div>
        )
    }
}
export default FileHandler;
import React, {Component} from 'react' 
import Axios from 'axios'

class S3Bucket extends Component {
    constructor(props) {
        super(props)

        this.state = {
            file: '',
            fileName: '',
            fileType: '',
            img: ''
        }

        this.handlePhoto = this.handlePhoto.bind(this)
        this.sendPhoto = this.sendPhoto.bind(this)
    }

    handlePhoto(event) {
        const reader = new FileReader()

        const file = event.target.files[0]

        reader.onload = photo => {
            this.setState({
                file: photo.target.result,
                fileName: file.name,
                fileType: file.type,
                img: ''
            })
        }
        reader.readAsDataURL(file)
    }

    sendPhoto() {
        return Axios.post('/api/s3', this.state).then(res => {
            if(this.props.userInfo)
            //take this res.data.Location and set it to the database as the image
            console.log(4444, res.data)
            this.setState({
                img: res.data.Location
            })
        })
    }

    

    render() {
        return (
            <div>
                Bucket
                <input type='file' id='real' onChange={this.handlePhoto} />
                <button onClick={this.sendPhoto}>Upload</button>
                <div>
                    <img src={this.state.img} alt='none' />
                </div>
            </div>
        )
    }
}

export default S3Bucket
import React, {Component} from 'react' 
import Axios from 'axios'
import {connect} from 'react-redux'

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
            //take this res.data.Location and set it to the database as the image
            console.log(909090, this.props)
            if(this.props.updateUserPic){
                console.log("UPDATE USER PICTURE")
                this.props.updateUserPic(res.data.Location)
            }else if(this.props.setUserPic){
                console.log("SET USER PICTURE")
                this.props.setUserPic(res.data.Location)
            }else if(this.props.updateCarPic){
                console.log("UPDATE CAR PICTURE")
                this.props.updateCarPic(res.data.Location)
            }else if(this.props.setCarPic){
                console.log("SET CAR PICTURE")
                this.props.setCarPic(res.data.Location)
            }else if(this.props.updateDriverPic){
                console.log("UPDATE DRIVER PICTURE")
                this.props.updateDriverPic(res.data.Location)
            }else if(this.props.setDriverPic){
                console.log("SET DRIVER PICTURE")
                this.props.setDriverPic(res.data.Location)
            }else{
                console.log('No Pic')
            }
            console.log(4444, res.data)
            this.setState({
                img: res.data.Location
            })
        })
    }

    

    render() {
        return (
            <div style={{width: 400, height: 400, border: '1px solid black'}}>
                Bucket
                <input type='file' id='real' onChange={this.handlePhoto} />
                <button onClick={this.sendPhoto}>Upload</button>
                <div>
                    <img width={300} src={this.state.img} alt='none' />
                </div>
            </div>
        )
    }
}

export default S3Bucket
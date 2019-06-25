import React, {Component} from 'react'

import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class Maintenance extends Component {
    constructor(props) {
        super(props)
        console.log(22222222222, this.props)
    }

    render() {
        console.log(3333333333333, this.props.user)
        return(
            <div>
                {(this.props.user) ?
                    <div>
                        MAINTENANCE COMPONENT
                    </div>
                :
                    <Redirect to='/' />
                }
            </div>
        )
    }
}

let mapStateToProps = state => {
    return {
        user: state.users.data
    }
}

export default connect(mapStateToProps)(Maintenance)
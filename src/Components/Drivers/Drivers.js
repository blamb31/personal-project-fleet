import React, {Component} from 'react'

import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class Drivers extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div>
                {(this.props.user) ?
                    <div>
                        DRIVERS COMPONENT
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

export default connect(mapStateToProps)(Drivers)
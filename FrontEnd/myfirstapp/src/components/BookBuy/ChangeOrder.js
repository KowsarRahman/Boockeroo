import React, { Component, useEffect, useRef } from 'react'
import { markAsShipped } from '../../actions/orderActions';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';

class ChangeOrder extends Component {

    componentDidMount() {

        //Access Restricted
        if(localStorage.urole == "Customer") {
            window.location.href = "/";
        }

        //Grab the id of the ordered
        const order_id = this.props.match.params.id;

        //The Object to be updated in the database
        const shipped = {
            id: order_id,
            status: "Delivered"
        }

        //It is updated
        this.props.markAsShipped(shipped, this.props.history);

    }

    render() {
        return(
            <>
            <p>Loading....</p>
            </>
        );
    }
}

ChangeOrder.propTypes = {
    markAsShipped: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
  };
  
const mapStateToProps = state => ({
errors: state.errors
});
  
export default connect(
    mapStateToProps,
    { markAsShipped }
)(ChangeOrder);
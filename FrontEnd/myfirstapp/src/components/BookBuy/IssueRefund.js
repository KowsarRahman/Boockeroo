import React, { Component, useEffect, useRef } from 'react'
import { issuedRefund } from '../../actions/orderActions';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';

class IssueRefund extends Component {

    componentDidMount() {

        //Access Restricted
        if(localStorage.urole == "Customer") {
            window.location.href = "/";
        }

        //Grab the id of the ordered
        const order_id = this.props.match.params.id;

        //The Object to be updated in the database
        const refunded = {
            id: order_id,
            status: "Refund Issued"
        }

        //It is updated
        this.props.issuedRefund(refunded, this.props.history);

    }

    render() {
        return(
            <>
            <p>Loading....</p>
            </>
        );
    }
}

IssueRefund.propTypes = {
    issuedRefund: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
  };
  
const mapStateToProps = state => ({
errors: state.errors
});
  
export default connect(
    mapStateToProps,
    { issuedRefund }
)(IssueRefund);
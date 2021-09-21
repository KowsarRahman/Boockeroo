import React from 'react';
import ReactDOM from 'react-dom';
import TermsAndConditions from '../components/Layout/TermsAndConditions';
import {render} from '@testing-library/react';
import renderer from 'react-test-renderer';




it("renders Terms and Conditions component crashing",() => {
    const dev = document.createElement("dev");
    ReactDOM.render(<TermsAndConditions/>, dev);
})


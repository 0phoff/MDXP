import * as React from 'react'
import { Helmet } from 'react-helmet-async'
import favicon from './favicon.png'

// The doc prop contains some metadata about the page being rendered that you can use.
const Wrapper = ({ children, doc }) => <React.Fragment>
    <Helmet>
        <link rel="icon" type="image/png" href={favicon}/>
    </Helmet>
    {children}
</React.Fragment>
export default Wrapper

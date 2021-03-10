import React from 'react'
import {Helmet} from 'react-helmet'
 


const MetaData = ({title}) => {
    return (
        <Helmet>
            <title>{`${title} - Full Ecommerce`}</title>
        </Helmet>
    )
}

export default MetaData

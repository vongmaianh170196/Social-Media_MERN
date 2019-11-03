import React from 'react'
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEducation = ({ education: {
    school, 
    fieldOfStudy,
    current,
    to,
    from,
    description
}}) => <div>
    <h3 className='text-dark'>{school}</h3>
    <p>
        <Moment format='YYYY/MM/DD'>{from}</Moment>
        - {!to ? 'Prsent' : <Moment format='YYYY/MM/DD'>{from}</Moment>}
    </p>
    <p><strong>Field of Study: </strong>{fieldOfStudy}</p>
    <p><strong>Description: </strong>{description}</p>
</div>


ProfileEducation.propTypes = {
    education: PropTypes.object.isRequired,
}

export default ProfileEducation

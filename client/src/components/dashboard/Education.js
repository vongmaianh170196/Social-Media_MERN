import React, {Fragment} from 'react'
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {connect} from 'react-redux';
import {deleteEducation} from '../../actions/profile'


const Education = ({education, deleteEducation}) => {
    const educations = education.map(edu => (
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td className='hide-sm'>{edu.fieldOfStudy}</td>
            <td>
                <Moment format='YYYY/MM/DD'>{edu.from}</Moment> - {
                    edu.to === null ? (' Present') : <Moment format='YYYY/MM/DD'>{edu.to}</Moment>
                }
            </td>
            <td>
                <button className='btn btn-danger' onClick={() => deleteEducation(edu._id)}>Delete</button>
            </td>
        </tr>

    ))
    return (
        <Fragment>
           <h2 className="my-2">Education credentials</h2> 
           <table className='table'>
               <thead>
                   <tr>
                       <th>School</th>
                       <th className='hide-sm'>Field of Study</th>
                       <th className='hide-sm'>Years</th>
                       <th/>
                   </tr>
               </thead>
               <tbody>{educations}</tbody>
           </table>
        </Fragment>
    )
}

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func
}

export default connect(null, {deleteEducation})(Education)

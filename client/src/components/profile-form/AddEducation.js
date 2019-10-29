import React, {Fragment, useState} from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addEducation} from '../../actions/profile';

const AddEducation = ({addEducation, history}) => {
    const [formData, setFormData] = useState({
        school: '',
        fieldOfStudy: '',
        from: '',
        to: '',
        current: false,
        description: ''
    })

    const [toDateDisable, toggleDateDisable] = useState(false);

    const {school, fieldOfStudy, from, to, current, description} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    return (
        <Fragment>
            <h1 className="large text-primary">
       Add Education
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add education that you have been attended
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => {
          e.preventDefault();
          addEducation(formData, history)
      }}>
        <div className="form-group">
          <input type="text" placeholder="* School/Bootcamp" name="school" value={school} onChange={e => onChange(e)} required />
        </div>
        {/* <div className="form-group">
          <input type="text" placeholder="* Degree" name="degree" required value={degree} onChange={e => onChange(e)}/>
        </div> */}
        <div className="form-group">
          <input required type="text" placeholder="* Field of Study" name="fieldOfStudy" value={fieldOfStudy} onChange={e => onChange(e)}/>
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={e => onChange(e)} required/>
        </div>
         <div className="form-group">
          <p><input type="checkbox" name="current" value={current} checked={current} onChange={ e => {
              setFormData({...formData, current: !current});
              toggleDateDisable(!toDateDisable);
          }}/>{' '} Current</p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" value={to} disabled={toDateDisable ? 'disabled' : ''} onChange={e => onChange(e)}/>
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Description"
            value={description}
            onChange={e => onChange(e)}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
      </form>
        </Fragment>
    )
}

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired,
}

export default connect(null, {addEducation})(withRouter(AddEducation));

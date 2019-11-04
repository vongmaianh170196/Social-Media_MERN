import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../layouts/Spinner';
import {getPost} from '../../actions/post';
import PostSingleItem from './PostSingleItem';
import {Link} from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = ({getPost, post: {post, loading}, match}) => {
    useEffect(() => {
        getPost(match.params.id)
    }, [getPost])
    return loading  || post === null ? <Spinner/> : <Fragment>
        <Link to='/posts' className='btn'>
        Back to Posts
        </Link>
        <PostSingleItem post={post}/>
        <CommentForm postId={post._id}/>
        <div className='comments'>
            {post.comments.map(cmt => <CommentItem key={cmt._id} comment={cmt} postId={post._id}/>)}
        </div>
    </Fragment>
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    post: state.post
})
export default connect(mapStateToProps, {getPost})(Post);

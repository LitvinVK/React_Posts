import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PostService from '../API/PostService'
import Loader from '../components/UI/Loader/Loader'
import { useFetching } from '../hooks/useFetching'

const PostIdPage = () => {
    const params = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [fetchPostById, isLoading, error] = useFetching(async () => {
        const response = await PostService.getById(params.id)
        setPost(response.data)
    })
    const [fetchComments, isComLoading, comError] = useFetching(async () => {
        const response = await PostService.getCommentsByPostId(params.id)
        setComments(response.data)
    })

    useEffect(() => {
        fetchPostById()
        fetchComments()
    }, [])

    return (
    <div>
        <h1 style={{textAlign: 'center', color: '#c96b12'}}>Вы открыли страницу поста c id = {params.id}</h1>
        {isLoading
            ? <Loader/>
            : <div style={{textAlign: 'center'}}>{post.id}. {post.title}</div>
        }
        <h1 style={{textAlign: 'center', color: '#c96b12'}}>
            Комментарии
        </h1>
        {isComLoading
            ? <Loader/>
            : <div style={{textAlign: 'center'}}>
                {comments.map(comm =>
                    <div style={{marginTop: 15}} key={comm.id}>
                        <h5>{comm.email}</h5>
                        <div>{comm.body}</div>
                    </div>    
                )}
            </div>
        }
    </div>
    )
}

export default PostIdPage
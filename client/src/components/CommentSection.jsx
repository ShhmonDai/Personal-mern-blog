import { Alert, Button, Modal, TextInput, Textarea } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Comment from './Comment';
import { HiOutlineExclamationCircle } from 'react-icons/hi';


const customModalTheme = {
        "root": {
            "base": "fixed top-0 right-0 left-0 z-50 h-modal h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
            "show": {
                "on": "flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80 backdrop-blur",
                "off": "hidden"
            },
            "sizes": {
                "sm": "max-w-sm",
                "md": "max-w-md",
                "lg": "max-w-lg",
                "xl": "max-w-xl",
                "2xl": "max-w-2xl",
                "3xl": "max-w-3xl",
                "4xl": "max-w-4xl",
                "5xl": "max-w-5xl",
                "6xl": "max-w-6xl",
                "7xl": "max-w-7xl"
            },
            "positions": {
                "top-left": "items-start justify-start",
                "top-center": "items-start justify-center",
                "top-right": "items-start justify-end",
                "center-left": "items-center justify-start",
                "center": "items-center justify-center",
                "center-right": "items-center justify-end",
                "bottom-right": "items-end justify-end",
                "bottom-center": "items-end justify-center",
                "bottom-left": "items-end justify-start"
            }
        },
        "content": {
            "base": "relative h-full w-full p-4 md:h-auto",
            "inner": "relative rounded-lg backdrop-blur bg-[rgba(0,0,0,0.0.1)] shadow dark:bg-[rgba(0,0,0,0.1)] flex flex-col max-h-[90vh]"
        },
        "body": {
            "base": "p-6 flex-1 overflow-auto",
            "popup": "pt-0"
        },
        "header": {
            "base": "flex items-start justify-between rounded-t dark:border-gray-600 border-b p-5",
            "popup": "p-2 border-b-0",
            "title": "text-xl font-medium text-gray-900 dark:text-white",
            "close": {
                "base": "ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
                "icon": "h-5 w-5"
            }
        },
        "footer": {
            "base": "flex items-center space-x-2 rounded-b border-gray-200 p-6 dark:border-gray-600",
            "popup": "border-t"
        }
};



export default function CommentSection({ postId }) {
    const { currentUser } = useSelector((state) => state.user);
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState(null);
    const [comments, setComments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (comment.length > 200) {
            return;
        }
        try {
            const res = await fetch('/api/comment/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: comment,
                    postId,
                    userId: currentUser._id,
                }),
            });
            const data = await res.json();
            if (res.ok) {
                setComment('');
                setCommentError(null);
                setComments([data, ...comments]);
            }
        } catch (error) {
            setCommentError(error.message);
        }
    };

    useEffect(() => {
        const getComments = async () => {
            try {
                const res = await fetch(`/api/comment/getPostComments/${postId}`);
                if (res.ok) {
                    const data = await res.json();
                    setComments(data);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        getComments();
    }, [postId]);

    const handleLike = async (commentId) => {
        try {
            if (!currentUser) {
                navigate('/sign-in');
                return;
            }
            const res = await fetch(`/api/comment/likeComment/${commentId}`, {
                method: 'PUT',
            });
            if (res.ok) {
                const data = await res.json();
                setComments(
                    comments.map((comment) =>
                        comment._id === commentId
                            ? {
                                ...comment,
                                likes: data.likes,
                                numberOfLikes: data.likes.length,
                            }
                            : comment
                    )
                );
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleEdit = async (comment, editedContent) => {
        setComments(
            comments.map((c) =>
                c._id === comment._id ? { ...c, content: editedContent } : c
            )
        );
    };

    const handleDelete = async (commentId) => {
        setShowModal(false);
        try {
            if (!currentUser) {
                navigate('/sign-in');
                return;
            }
            const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                const data = await res.json();
                setComments(comments.filter((comment) => comment._id !== commentId));
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <div className='max-w-2xl mx-auto w-full p-3'>
            {currentUser ? (
                <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
                    <p>Signed in as:</p>
                    <img
                        className='h-5 w-5 object-cover rounded-full'
                        src={currentUser.profilePicture}
                        alt=''
                    />
                    <Link
                        to={'/dashboard?tab=profile'}
                        className='text-xs text-cyan-600 hover:underline'
                    >
                        @{currentUser.username}
                    </Link>
                </div>
            ) : (
                <div className='text-sm text-teal-500 my-5 flex gap-1'>
                    You must be signed in to comment.
                    <Link className='text-blue-500 hover:underline' to={'/sign-in'}>
                        Sign In
                    </Link>
                </div>
            )}
            {currentUser && (
                <form
                    onSubmit={handleSubmit}
                    className='border border-teal-500 rounded-md p-3'
                >
                    <Textarea
                        placeholder='Add a comment...'
                        rows='3'
                        maxLength='200'
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                    />
                    <div className='flex justify-between items-center mt-5'>
                        <p className='text-gray-500 text-xs'>
                            {200 - comment.length} characters remaining
                        </p>
                        <Button outline gradientDuoTone='purpleToBlue' type='submit'>
                            Submit
                        </Button>
                    </div>
                    {commentError && (
                        <Alert color='failure' className='mt-5'>
                            {commentError}
                        </Alert>
                    )}
                </form>
            )}
            {comments.length === 0 ? (
                <p className='text-sm my-5'>No comments yet!</p>
            ) : (
                <>
                    <div className='text-sm my-5 flex items-center gap-1'>
                        <p>Comments</p>
                        <div className='border border-gray-400 py-1 px-2 rounded-sm'>
                            <p>{comments.length}</p>
                        </div>
                    </div>
                    {comments.map((comment) => (
                        <Comment
                            key={comment._id}
                            comment={comment}
                            onLike={handleLike}
                            onEdit={handleEdit}
                            onDelete={(commentId) => {
                                setShowModal(true);
                                setCommentToDelete(commentId);
                            }}
                        />
                    ))}
                </>
            )}
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                popup
                size='md'
                theme={customModalTheme}
            >
                <Modal.Header />
                <Modal.Body>
                    <div className='text-center'>
                        <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                            Are you sure you want to delete this comment?
                        </h3>
                        <div className='flex justify-center gap-4'>
                            <Button
                                color='failure'
                                onClick={() => handleDelete(commentToDelete)}
                            >
                                Yes, I'm sure
                            </Button>
                            <Button color='gray' onClick={() => setShowModal(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}
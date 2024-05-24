import React, { useEffect, useState } from 'react';

const Comments = ({ data }) => {
  const profile = localStorage.getItem('profile');
  const profileImage = localStorage.getItem('profileImage');
  const [commentData, setCommentData] = useState(data);
  const [newCommentMessage, setNewCommentMessage] = useState('');

  // Function to delete a comment
  const deleteComment = (id) => {
    const newData = commentData.filter((comment) => comment.id !== id);
    setCommentData(newData);
  };

  const editComment = (id, newValue) => {
    const updatedData = commentData.map((comment) =>
      comment.id === id ? { ...comment, message: newValue } : comment
    );
    setCommentData(updatedData);
  };

  const addComment = (message) => {
    const newComment = {
      id: commentData.length + 1,
      name: profile,
      message: message,
      avatar: profileImage,
    };
    const newCommentData = [...commentData, newComment];
    setCommentData(newCommentData);
    setNewCommentMessage(''); // Clear the input after adding the comment
  };

  return (
    <div>
      <div className="flex-1 space-y-6 overflow-y-auto rounded-xl p-4 text-sm leading-6 text-black sm:text-base sm:leading-7">
        {commentData.map((comment) => (
          comment.name === profile ? (
            <FromMessage key={comment.id} comment={comment} deleteComment={deleteComment} editComment={editComment} />
          ) : (
            <ToMessage key={comment.id} comment={comment} />
          )
        ))}
      </div>
      <div className="flex">
        <label htmlFor="prompt" className="sr-only">Write Comment</label>
        {/* <div>
          <button className="sm:p-2" type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              aria-hidden="true"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M12 5l0 14"></path>
              <path d="M5 12l14 0"></path>
            </svg>
            <span className="sr-only">Attach file</span>
          </button>
        </div> */}
        <textarea
          id="prompt"
          rows="1"
          className="mt-2 py-3 px-4 rounded-full border-gray-400 shadow-sm sm:text-sm outline-none border overflow-hidden "
          placeholder="Write Comment...."
          value={newCommentMessage}
          onChange={(e) => setNewCommentMessage(e.target.value)}
          style={{ resize: 'none', width: '300px', height: '50px' }}
        />
        <div>
          <button
            className="inline-flex text-red-400 sm:p-4"
            onClick={() => addComment(newCommentMessage)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              aria-hidden="true"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M10 14l11 -11"></path>
              <path
                d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5"
              ></path>
            </svg>
            <span className="sr-only">Send message</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const ToMessage = ({ comment }) => {
  return (
    <div className="flex items-start">
      <img
        className="mr-2 h-8 w-8 rounded-full"
        src={comment.avatar}
        alt={comment.name}
      />
      <div className="flex rounded-full p-4 sm:max-w-md md:max-w-2xl">
        <p>{comment.message}</p>
      </div>
    </div>
  );
};

const FromMessage = ({ comment, deleteComment, editComment }) => {
  return (
    <div className="flex items-start ">
      <img
        className="mr-2 h-8 w-8 rounded-full"
        src={comment.avatar}
        alt={comment.name}
      />
<div className="flex min-h-[85px] rounded-full px-3 sm:min-h-0 sm:max-w-md md:max-w-2xl">
  <textarea
    type="text"
    value={comment.message}
    onChange={(e) => editComment(comment.id, e.target.value)}
    className="bg-transparent outline-none w-full rounded resize-none overflow-hidden"
    style={{ lineHeight: '1.2', height: '2.4em' }} // Adjust the height to fit the number of lines you want
    rows="1"
  />
</div>


      <div className="ml-2 mt-1 flex flex-col gap-2 text-slate-500 sm:flex-row">
        <button className="hover:text-blue-600" type="button" onClick={() => deleteComment(comment.id)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Comments;

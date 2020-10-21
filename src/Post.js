import React, { useEffect, useState } from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from "./firebase";
import firebase from "firebase";

function Post({ postId, loggedUsername, imageUrl, postUsername, caption }) {
  const [retrivecomments, setRetrivecomments] = useState([]);
  const [postcomment, setPostcomment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setRetrivecomments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (event) => {
    event.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      text: postcomment,
      username: loggedUsername.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setPostcomment("");
  };

  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt="vinod"
          src="/static/images/avatar/1.png"
        />
        <h3>{postUsername}</h3>
      </div>

      <img className="post__image" src={imageUrl} alt="" />

      <h4 className="post__text">
        <strong>
          @{postUsername} : {caption}
        </strong>
      </h4>
      <div className="post__comments">
        {retrivecomments.map((comment) => (
          <p>
            <b>{comment.username} </b>
            {comment.text}
          </p>
        ))}
      </div>
      {loggedUsername && (
        <form className="post__commentBox">
          <input
            className="post__input"
            type="text"
            placeholder="Add Comment..."
            value={postcomment}
            onChange={(e) => setPostcomment(e.target.value)}
          />
          <button
            className="post__button"
            disabled={!postcomment}
            type="submit"
            onClick={postComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;

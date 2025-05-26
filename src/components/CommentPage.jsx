import React, { useState, useRef } from 'react';
import { useComment } from '../context/CommentContext';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import Swal from 'sweetalert2';

const CommentPage = () => {
  const { addComment, comments, removeComment } = useComment();
  const { user } = useUser();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    product: '',
    rating: 5,
    text: '',
    photo: null,
    photoFile: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'photo' && files && files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setForm({
          ...form,
          photo: event.target.result,
          photoFile: files[0]
        });
        
        Swal.fire({
          icon: 'success',
          title: '📤 Photo Uploaded',
          text: 'Your image has been attached successfully!',
          timer: 1500,
          showConfirmButton: false,
        });
      };
      reader.readAsDataURL(files[0]);
      return;
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!user) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'Please login to leave a comment.',
        confirmButtonText: 'Go to Login',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/login';
        }
      });
      return;
    }

    if (!form.product || !form.text) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Information',
        text: 'Please fill in all required fields.',
      });
      return;
    }

    const newComment = {
      ...form,
      user: user.name,
      userId: user.id,
      date: new Date().toLocaleString(),
    };

    addComment(newComment);
    setForm({ product: '', rating: 5, text: '', photo: null, photoFile: null });
    if (fileInputRef.current) fileInputRef.current.value = '';

    Swal.fire({
      icon: 'success',
      title: '✅ Comment Submitted',
      text: 'Your feedback is valuable to us!',
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const handleRemove = (index) => {
    Swal.fire({
      title: 'Delete Comment?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        removeComment(index);
        Swal.fire('Deleted!', 'Comment has been removed.', 'success');
      }
    });
  };

  return (
    <div className="comment-page">
      <style>{`
        .comment-page {
          max-width: 700px;
          margin: 2rem auto;
          padding: 1rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
        }
        
        .comment-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        
        .comment-page h2 {
          color:rgb(255, 255, 255);
          font-size: 1.8rem;
          margin: 0;
        }
        
        .back-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.2rem;
          background-color: #2c3e50;
          color: white;
          border-radius: 6px;
          transition: all 0.3s ease;
          text-decoration: none;
          font-weight: 500;
        }
        
        .back-button:hover {
          background-color: #1a252f;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .comment-form {
          margin: 2rem 0;
          padding: 1.5rem;
          border-radius: 10px;
          background: white;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        .form-group label {
          display: block;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #2c3e50;
        }
        
        .form-control {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 1rem;
          transition: border 0.3s ease;
        }
        
        .form-control:focus {
          border-color: #3498db;
          outline: none;
          box-shadow: 0 0 0 3px rgba(52,152,219,0.2);
        }
        
        textarea.form-control {
          min-height: 120px;
          resize: vertical;
        }
        
        .submit-btn {
          background: #27ae60;
          color: white;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .submit-btn:hover {
          background: #219653;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(39,174,96,0.2);
        }
        
        .preview-image {
          margin-top: 1rem;
          max-width: 200px;
          border-radius: 6px;
          border: 1px solid #eee;
        }
        
        .comment-list {
          margin-top: 3rem;
        }
        
        .comment-list h3 {
          color: #2c3e50;
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #eee;
        }
        
        .comment-card {
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          background: white;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          position: relative;
        }
        
        .comment-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }
        
        .comment-user {
          font-weight: 700;
          color: #2c3e50;
        }
        
        .comment-product {
          color: #7f8c8d;
          font-style: italic;
        }
        
        .comment-date {
          font-size: 0.8rem;
          color: #95a5a6;
        }
        
        .comment-rating {
          color: #f39c12;
          font-weight: 600;
        }
        
        .comment-text {
          margin: 1rem 0;
          line-height: 1.6;
        }
        
        .comment-image {
          max-width: 100%;
          max-height: 300px;
          border-radius: 6px;
          margin-top: 1rem;
        }
        
        .delete-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: #e74c3c;
          color: white;
          border: none;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .delete-btn:hover {
          background: #c0392b;
          transform: scale(1.1);
        }
        
        @media (max-width: 768px) {
          .comment-page {
            padding: 1rem;
          }
          
          .comment-header {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>

      <div className="comment-header">
        <h2>Product Reviews</h2>
        <Link to="/" className="back-button" aria-label="Go Back">
          ← Back to Products
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="comment-form">
        <div className="form-group">
          <label htmlFor="product">Product Name</label>
          <input
            id="product"
            name="product"
            type="text"
            className="form-control"
            value={form.product}
            onChange={handleChange}
            placeholder="Which product are you reviewing?"
            required
          />
        </div>

        <div className="form-group">
          <label>Your Rating</label>
          <StarRating
            rating={form.rating}
            setRating={(rating) => setForm({ ...form, rating })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="text">Your Review</label>
          <textarea
            id="text"
            name="text"
            className="form-control"
            value={form.text}
            onChange={handleChange}
            placeholder="Share your experience with this product..."
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="photo">Add Photo (Optional)</label>
          <input
            id="photo"
            type="file"
            name="photo"
            className="form-control"
            accept="image/*"
            onChange={handleChange}
            ref={fileInputRef}
          />
          {form.photo && (
            <img src={form.photo} alt="Preview" className="preview-image" />
          )}
        </div>

        <button type="submit" className="submit-btn">
          Submit Review
        </button>
      </form>

      <div className="comment-list">
        <h3>Customer Reviews ({comments.length})</h3>
        
        {comments.length === 0 ? (
          <p>No reviews yet. Be the first to share your thoughts!</p>
        ) : (
          comments.map((comment, index) => (
            <div key={index} className="comment-card">
              {user?.id === comment.userId && (
                <button 
                  className="delete-btn"
                  onClick={() => handleRemove(index)}
                  aria-label="Delete review"
                >
                  ×
                </button>
              )}
              
              <div className="comment-header">
                <span className="comment-user">{comment.user}</span>
                <span className="comment-rating">{comment.rating}/5 ★</span>
              </div>
              
              <div className="comment-product">
                Reviewed: {comment.product}
              </div>
              
              <div className="comment-date">
                {comment.date || new Date().toLocaleString()}
              </div>
              
              <p className="comment-text">{comment.text}</p>
              
              {comment.photo && (
                <img 
                  src={comment.photo} 
                  alt="Review attachment" 
                  className="comment-image"
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentPage;
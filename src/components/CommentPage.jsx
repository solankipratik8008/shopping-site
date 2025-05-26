import React, { useState } from 'react';
import { useComment } from '../context/CommentContext';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import Swal from 'sweetalert2';

const CommentPage = () => {
  const { addComment, comments, removeComment } = useComment();
  const { user } = useUser();

  const [form, setForm] = useState({
    product: '',
    rating: 5,
    text: '',
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const fileUrl = URL.createObjectURL(files[0]);
      setForm({ ...form, photo: fileUrl });

      Swal.fire({
        icon: 'success',
        title: '📤 Photo Uploaded',
        text: 'Your image has been attached successfully!',
        timer: 1500,
        showConfirmButton: false,
      });
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
      });
      return;
    }

    addComment({ ...form, user: user.name });
    setForm({ product: '', rating: 5, text: '', photo: null });

    Swal.fire({
      icon: 'success',
      title: '✅ Comment Submitted',
      text: 'Your comment was added successfully!',
      timer: 1500,
      showConfirmButton: false,
    });
  };

  return (
    <div className="comment-page">
      <style>{`
        .comment-page {
          max-width: 700px;
          margin: 2rem auto;
          padding: 1rem;
          font-family: Arial, sans-serif;
          color: #333;
        }
        .comment-page h2,
        .comment-page h3 {
          color: white;
        }
        .comment-page a {
          text-decoration: none;
          color: #007bff;
          font-size: 0.9rem;
        }
        .comment-page a:hover {
          text-decoration: underline;
        }
        .comment-form {
          margin: 1.5rem 0;
          padding: 1rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          background: #f9f9f9;
        }
        .comment-form div {
          margin-bottom: 1rem;
        }
        .comment-form label {
          display: block;
          font-weight: bold;
          margin-bottom: 0.3rem;
        }
        .comment-form input[type="text"],
        .comment-form input[type="file"],
        .comment-form textarea {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .comment-form button {
          background: #28a745;
          color: #fff;
          padding: 0.6rem 1.2rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .comment-form button:hover {
          background: #218838;
        }
        .comment-list {
          margin-top: 2rem;
        }
        .comment-card {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 1rem;
          background: #fff;
        }
        .comment-card strong {
          color: #333;
        }
        .comment-card em {
          color: #555;
        }
        .comment-card p {
          margin: 0.5rem 0;
        }
        .comment-card img {
          margin-top: 0.5rem;
          border-radius: 4px;
        }
        .comment-card button {
          margin-top: 0.5rem;
          background: #dc3545;
          color: #fff;
          padding: 0.4rem 0.8rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .comment-card button:hover {
          background: #c82333;
        }
        @media (max-width: 600px) {
          .comment-page {
            padding: 0.5rem;
          }
        }
         .link-button {
  display: inline-block;
  padding: 8px 16px;
  background-color:rgb(2, 2, 2); /* blue */
  color: white;
  text-decoration: none; /* remove underline */
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s ease, box-shadow 0.2s ease;
  border: none;
  text-align: center;
}

.link-button:hover,
.link-button:focus {
  background-color:rgb(227, 28, 28); /* darker blue */
  box-shadow: 0 0 8px rgba(2, 2, 2, 0.6);
  outline: none;
}



      `}</style>

      <h2>Product Comments</h2>
      <Link to="/" className="link-button" aria-label="Go Back">← Back to Products</Link>

      <form onSubmit={handleSubmit} className="comment-form">
        <div>
          <label>Product Name:</label>
          <input
            name="product"
            value={form.product}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Rating:</label>
          <StarRating
            rating={form.rating}
            setRating={(star) => setForm({ ...form, rating: star })}
          />
        </div>
        <div>
          <label>Comment:</label>
          <textarea
            name="text"
            value={form.text}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Photo (optional):</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit Comment</button>
      </form>

      <hr />
      <h3>All Comments</h3>
      <div className="comment-list">
        {comments.map((c, index) => (
          <div key={index} className="comment-card">
            <strong>{c.user}</strong> on <em>{c.product}</em> rated {c.rating}/5
            <p>{c.text}</p>
            {c.photo && <img src={c.photo} alt="comment" width="100" />}
            <br />
            <button
              onClick={() => {
                Swal.fire({
                  title: 'Are you sure?',
                  text: 'This comment will be permanently deleted.',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#d33',
                  cancelButtonColor: '#aaa',
                  confirmButtonText: 'Yes, delete it!',
                }).then((result) => {
                  if (result.isConfirmed) {
                    removeComment(index);
                    Swal.fire('Deleted!', 'Your comment has been removed.', 'success');
                  }
                });
              }}
            >
              🗑 Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentPage;

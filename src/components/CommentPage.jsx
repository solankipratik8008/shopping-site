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
    <div>
      <h2>Product Comments</h2>
      <Link to="/">← Back to Products</Link>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name:</label><br />
          <input name="product" value={form.product} onChange={handleChange} required />
        </div>
        <div>
          <label>Rating:</label>
          <StarRating rating={form.rating} setRating={(star) => setForm({ ...form, rating: star })} />
        </div>
        <div>
          <label>Comment:</label><br />
          <textarea name="text" value={form.text} onChange={handleChange} required />
        </div>
        <div>
          <label>Photo (optional):</label><br />
          <input type="file" name="photo" accept="image/*" onChange={handleChange} />
        </div>
        <button type="submit">Submit Comment</button>
      </form>

      <hr />
      <h3>All Comments</h3>
      {comments.map((c, index) => (
        <div key={index} style={{ border: '1px solid #aaa', margin: '10px', padding: '10px' }}>
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
            style={{ marginTop: '5px', backgroundColor: '#f44336', color: '#fff' }}
          >
            🗑 Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default CommentPage;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import classes from './Review.module.css';
import { FaStar, FaUserCircle } from "react-icons/fa";

const Review = () => {
    const { id } = useParams(); // Get product ID from URL
    // console.log(id);

    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`http://localhost:8001/api/get-review/${id}`);
            // console.log(response);

            setReviews(response.data.data);
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = sessionStorage.getItem("token"); // Get auth token
            const user = sessionStorage.getItem("user");
            console.log(user);

            await axios.post(
                "http://localhost:8001/api/add-review",
                { productId: id, userId: user, ...newReview },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert("Review added successfully!");
            setNewReview({ rating: 5, comment: "" });
            fetchReviews(); // Refresh reviews
        } catch (error) {
            console.error("Error submitting review:", error);
            alert("Failed to submit review.");
        }
        setLoading(false);
    };

    return (
        <div>

            <div>
                    {reviews.length === 0 ? <p>No reviews yet.</p> : (
                        <ul>
                            {reviews.map((review) => (
                                <li key={review._id}   className={classes.review}>
                                    <FaUserCircle />
                                    <div>
                                    {review.userId.userName} &nbsp;({review.rating}<FaStar style={{ color: '#ffcd00', fontSize: '16px' }} />)
                                    <p>{review.comment}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
            </div>

            <div>
            <h3>Write a Review</h3>
            <form onSubmit={handleSubmitReview} className={classes.form}>
                <label className="mb-1">Rating:</label>
                <select value={newReview.rating} onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}>
                    {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>{num} <FaStar style={{ color: '#ffcd00', fontSize: '16px' }}/></option>
                    ))}
                </select>

                    <textarea
                        placeholder="Write Your Review..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Submitting..." : "Submit Review"}
                </button>
            </form>
         </div>
        </div>
    );
};

export default Review;

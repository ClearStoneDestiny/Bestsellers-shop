import { useState, useEffect } from 'react';
import './Review.css';

function Review({productId}){

    const [reviews, setReviews] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [textAreaValue, setTextAreaValue] = useState('');
    const [message, setMessage] = useState(null);
    const [filledReview, setFilledReview] = useState('');

    function inputValueHandler(e){
        setInputValue(e.target.value);
    }

    function textAreaHandler(e){
        setTextAreaValue(e.target.value);
    }

    useEffect(() => {
        const storedReviews = JSON.parse(localStorage.getItem('reviews')) || {};
        const productReviews = storedReviews[productId] || [];
        setReviews(productReviews);
    }, [productId]);

    function submitReview() {
        if(inputValue.length < 1 || textAreaValue.length < 1){
            setMessage('Please fill out both forms');
            setFilledReview('Review-not-filled');
            return;
        }
        else{
            setMessage(null);
            setFilledReview('');
        }

        const newReview = {
            id: reviews.length + 1,
            author: inputValue,
            comment: textAreaValue,
            date: (new Date().toLocaleString())
        };

        const updatedReviews = [...reviews, newReview];
        setReviews(updatedReviews);

        const storedReviews = JSON.parse(localStorage.getItem('reviews')) || {};
        storedReviews[productId] = updatedReviews;
        localStorage.setItem('reviews', JSON.stringify(storedReviews));

        setInputValue('');
        setTextAreaValue('');
    }

    return(
            <div className="Review">
                <div>
                    <h3>Would you like to leave feedback?</h3>
                    <div className='Feedback'>
                        <input id={filledReview} type="text" placeholder='Enter name' onChange={(e) => inputValueHandler(e)} value={inputValue}/>
                        <textarea id={filledReview} name="Review" placeholder='Comment' onChange={(e) => textAreaHandler(e)} value={textAreaValue}></textarea>
                        <button onClick={submitReview}>Submit</button>
                    </div> 
                    {message && (
                        <p className='Review-message'>{message}</p>
                    )}
                </div>
                <h2>Reviews on this product:</h2>
                {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <div key={index} className='Review-info'>
                            <h3 className='Author'>{review.author}</h3>
                            <p className='Comment'>{review.comment}</p>
                            <p className='Date'>{review.date}</p>
                        </div>
                    ))
                ) : (
                    <p className='Base-review'>No reviews yet</p>
                )}
            </div>
    )
}

export default Review;
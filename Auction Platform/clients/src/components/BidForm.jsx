import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { placeBid } from '../redux/actions/auctionActions';

const BidForm = ({ auctionId, currentBid }) => {
  const [bidAmount, setBidAmount] = useState('');
  const { isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const minBid = Number(currentBid) + 1;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) return alert('Please login to bid');
    const bidValue = parseFloat(bidAmount);
    if (isNaN(bidValue) || bidValue < minBid) {
      return alert(`Bid must be at least $${minBid}`);
    }
    dispatch(placeBid(auctionId, bidValue));
    setBidAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="bid-form">
      <input
        type="number"
        value={bidAmount}
        onChange={(e) => setBidAmount(e.target.value)}
        min={minBid}
        step="0.01"
        placeholder={`Enter bid (min $${minBid})`}
        required
      />
      <button type="submit" disabled={!isAuthenticated}>
        {isAuthenticated ? 'Place Bid' : 'Login to Bid'}
      </button>
    </form>
  );
};

export default BidForm;
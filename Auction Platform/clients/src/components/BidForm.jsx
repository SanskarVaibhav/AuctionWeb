import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { placeBid } from '../redux/actions/auctionActions';

const BidForm = ({ auctionId, currentBid }) => {
  const [bidAmount, setBidAmount] = useState('');
  const { isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) return alert('Please login to bid');
    if (parseFloat(bidAmount) <= currentBid) {
      return alert('Bid must be higher than current bid');
    }
    dispatch(placeBid(auctionId, parseFloat(bidAmount)));
    setBidAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="bid-form">
      <input
        type="number"
        value={bidAmount}
        onChange={(e) => setBidAmount(e.target.value)}
        min={currentBid + 1}
        step="0.01"
        placeholder={`Enter bid (min $${currentBid + 1})`}
        required
      />
      <button type="submit">Place Bid</button>
    </form>
  );
};

export default BidForm;
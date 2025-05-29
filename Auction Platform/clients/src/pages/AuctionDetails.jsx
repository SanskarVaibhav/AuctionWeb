import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAuctionDetails } from '../redux/actions/auctionActions';
import BidForm from '../components/BidForm';
import BidHistory from '../components/BidHistory';
import Loader from '../components/Loader';

const AuctionDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { auction, loading, error } = useSelector(state => state.auction);

  useEffect(() => {
    if (id) {
      dispatch(getAuctionDetails(id));
    }
  }, [id, dispatch]);

  if (loading) return <Loader />;
  if (error) return <div className="error-message">{error}</div>;
  if (!auction) return <div>No auction found.</div>;

  return (
    <div className="auction-details">
      <div className="auction-images">
        {auction.images && auction.images.length > 0 ? (
          auction.images.map((img, i) => (
            <img key={i} src={img} alt={`${auction.title} ${i + 1}`} />
          ))
        ) : (
          <div className="no-images">No images available.</div>
        )}
      </div>
      <div className="auction-info">
        <h1>{auction.title}</h1>
        <p className="description">{auction.description}</p>
        <div className="bid-section">
          <h2>
            Current Bid: $
            {auction.currentBid !== undefined ? auction.currentBid : 'No bids yet'}
          </h2>
          <BidForm auctionId={id} currentBid={auction.currentBid} />
        </div>
        <BidHistory bids={auction.bids || []} />
      </div>
    </div>
  );
};

export default AuctionDetails;
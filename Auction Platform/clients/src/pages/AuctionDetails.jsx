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
  const { auction, loading } = useSelector(state => state.auction);

  useEffect(() => {
    dispatch(getAuctionDetails(id));
  }, [id, dispatch]);

  if (loading || !auction) return <Loader />;

  return (
    <div className="auction-details">
      <div className="auction-images">
        {auction.images.map((img, i) => (
          <img key={i} src={img} alt={`${auction.title} ${i + 1}`} />
        ))}
      </div>
      <div className="auction-info">
        <h1>{auction.title}</h1>
        <p className="description">{auction.description}</p>
        <div className="bid-section">
          <h2>Current Bid: ${auction.currentBid}</h2>
          <BidForm auctionId={id} currentBid={auction.currentBid} />
        </div>
        <BidHistory bids={auction.bids} />
      </div>
    </div>
  );
};

export default AuctionDetails;
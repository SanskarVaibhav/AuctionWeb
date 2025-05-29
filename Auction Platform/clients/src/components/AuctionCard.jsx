import { Link } from 'react-router-dom';
import CountdownTimer from './CountdownTimer';

const AuctionCard = ({ auction }) => {
  return (
    <div className="auction-card">
      <Link to={`/auctions/${auction._id}`}>
        <img
          src={auction.images && auction.images.length > 0 ? auction.images[0] : '/placeholder.jpg'}
          alt={auction.title}
          className="auction-card-image"
        />
        <div className="auction-card-content">
          <h3>{auction.title}</h3>
          <p>Current Bid: ${auction.currentBid ?? 0}</p>
          <CountdownTimer endTime={auction.endTime} />
        </div>
      </Link>
    </div>
  );
};

export default AuctionCard;
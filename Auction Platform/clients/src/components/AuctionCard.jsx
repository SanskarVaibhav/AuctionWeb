import { Link } from 'react-router-dom';
import CountdownTimer from './CountdownTimer';

const AuctionCard = ({ auction }) => {
  return (
    <div className="auction-card">
      <Link to={`/auctions/${auction._id}`}>
        <img src={auction.images[0]} alt={auction.title} />
        <h3>{auction.title}</h3>
        <p>Current Bid: ${auction.currentBid}</p>
        <CountdownTimer endTime={auction.endTime} />
      </Link>
    </div>
  );
};

export default AuctionCard;
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getActiveAuctions } from '../redux/actions/auctionActions';
import AuctionCard from '../components/AuctionCard';
import Loader from '../components/Loader';

const Home = () => {
  const dispatch = useDispatch();
  const { auctions, loading, error } = useSelector(state => state.auction);

  useEffect(() => {
    dispatch(getActiveAuctions());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="home-page">
      <h1>Active Auctions</h1>
      <div className="auctions-grid">
        {auctions && auctions.length > 0 ? (
          auctions.map(auction => (
            <AuctionCard key={auction._id} auction={auction} />
          ))
        ) : (
          <div>No active auctions found.</div>
        )}
      </div>
    </div>
  );
};

export default Home;
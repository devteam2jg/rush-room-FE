import BidItem from '../../components/bidItem';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function Bidding() {
  return (
    <QueryClientProvider client={queryClient}>
      <BidItem />
    </QueryClientProvider>
  );
}

export default Bidding;

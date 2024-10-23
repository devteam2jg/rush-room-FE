import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useUserAuthentication';

interface ProtectedProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedProps) {
  const { user, isPending, isError, isUserEmpty } = useAuth();

  // 로딩 중일 때 로딩 메시지 표시
  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <Navigate to="/login" replace />;
  }

  if (!user && !isUserEmpty) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;

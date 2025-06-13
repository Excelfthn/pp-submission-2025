'use client';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNetworkStatus } from '@/redux/features/network/networkSlice';

export default function NetworkStatusBar() {
  const dispatch = useDispatch();
  const isOnline = useSelector(state => state.network?.isOnline ?? true);
  const [showOfflineBar, setShowOfflineBar] = useState(false);

  useEffect(() => {
    const updateNetworkStatus = () => {
      const online = navigator.onLine;
      dispatch(setNetworkStatus(online));
      setShowOfflineBar(!online);
    };

    // Initial check
    updateNetworkStatus();

    // Add event listeners
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);

    // Cleanup
    return () => {
      window.removeEventListener('online', updateNetworkStatus);
      window.removeEventListener('offline', updateNetworkStatus);
    };
  }, [dispatch]);

  // Don't render if online
  if (!showOfflineBar) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-red-500 text-white text-center py-2 z-50 shadow-lg">
      <div className="flex items-center justify-center gap-2">
        <svg 
          className="w-4 h-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M18.364 5.636l-12.728 12.728m0-12.728l12.728 12.728" 
          />
        </svg>
        <span className="text-sm font-medium">
          You're offline. Some features may be limited.
        </span>
      </div>
    </div>
  );
}
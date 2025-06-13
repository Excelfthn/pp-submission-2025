'use client';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeDownloadedVideo, clearAllOfflineData } from '@/redux/features/network/networkSlice';
import VideoDownloadService from '@/services/VideoDownloadService';
import OfflineSyncService from '@/services/OfflineSyncService';
import useNetworkSync from '@/hooks/useNetworkSync';
import BasicLayout from '@/app/components/BasicLayout';
import TopBar from '@/app/components/bar/TopBar';
import ContentWrapper from '@/app/components/ContentWrapper';
import Button from '@/app/components/Button';

export default function OfflinePage() {
  const dispatch = useDispatch();
  const { isOnline, manualSync, getSyncInfo } = useNetworkSync();
  const downloadedVideos = useSelector(state => state.network?.downloadedVideos ?? {});
  const syncStatus = useSelector(state => state.network?.syncStatus ?? 'idle');
  
  const [storageInfo, setStorageInfo] = useState(null);
  const [offlineDataStatus, setOfflineDataStatus] = useState(null);
  const [activeTab, setActiveTab] = useState('videos');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadStorageInfo();
    loadOfflineDataStatus();
  }, []);

  const loadStorageInfo = async () => {
    try {
      const info = await VideoDownloadService.getStorageUsage();
      setStorageInfo(info);
    } catch (error) {
      console.error('Error loading storage info:', error);
    }
  };

  const loadOfflineDataStatus = () => {
    const status = OfflineSyncService.getSyncStatus();
    setOfflineDataStatus(status);
  };

  const handleDeleteVideo = async (videoId) => {
    try {
      await VideoDownloadService.deleteVideo(videoId);
      dispatch(removeDownloadedVideo(videoId));
      await loadStorageInfo();
    } catch (error) {
      console.error('Error deleting video:', error);
      alert('Failed to delete video');
    }
  };

  const handleClearAllVideos = async () => {
    if (!confirm('Are you sure you want to delete all downloaded videos?')) {
      return;
    }
    
    try {
      setLoading(true);
      await VideoDownloadService.clearAllVideos();
      dispatch(clearAllOfflineData());
      await loadStorageInfo();
    } catch (error) {
      console.error('Error clearing videos:', error);
      alert('Failed to clear videos');
    } finally {
      setLoading(false);
    }
  };

  const handleClearOfflineData = () => {
    if (!confirm('Are you sure you want to clear all offline data? This will remove unsaved tests and progress.')) {
      return;
    }
    
    OfflineSyncService.clearAllOfflineData();
    loadOfflineDataStatus();
  };

  const handleManualSync = async () => {
    if (!isOnline) {
      alert('You need to be online to sync data');
      return;
    }
    
    try {
      setLoading(true);
      await manualSync();
      loadOfflineDataStatus();
    } catch (error) {
      console.error('Error during manual sync:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 MB';
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTotalPendingItems = () => {
    if (!offlineDataStatus) return 0;
    return Object.values(offlineDataStatus).reduce((total, status) => total + status.pending, 0);
  };

  return (
    <BasicLayout className="bg-gray-50 dark:bg-gray-900">
      <TopBar bgColor="bg-white dark:bg-gray-800">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            Offline Management
          </h1>
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
            isOnline 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              isOnline ? 'bg-green-500' : 'bg-red-500'
            }`}></div>
            {isOnline ? 'Online' : 'Offline'}
          </div>
        </div>
      </TopBar>

      <ContentWrapper className="pt-[80px] pb-6">
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
          <button
            onClick={() => setActiveTab('videos')}
            className={`px-4 py-2 font-medium text-sm border-b-2 ${
              activeTab === 'videos'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Downloaded Videos
          </button>
          <button
            onClick={() => setActiveTab('data')}
            className={`px-4 py-2 font-medium text-sm border-b-2 ${
              activeTab === 'data'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Offline Data
            {getTotalPendingItems() > 0 && (
              <span className="ml-2 px-2 py-1 text-xs bg-red-500 text-white rounded-full">
                {getTotalPendingItems()}
              </span>
            )}
          </button>
        </div>

        {/* Videos Tab */}
        {activeTab === 'videos' && (
          <div className="space-y-6">
            {/* Storage Summary */}
            {storageInfo && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Storage Usage
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {storageInfo.count}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Videos Downloaded
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {storageInfo.totalSizeMB} MB
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Total Size
                    </div>
                  </div>
                  <div className="text-center col-span-2 md:col-span-1">
                    <Button
                      onClick={handleClearAllVideos}
                      disabled={loading || storageInfo.count === 0}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 text-sm"
                    >
                      {loading ? 'Clearing...' : 'Clear All'}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Video List */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Downloaded Videos
                </h2>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {storageInfo && storageInfo.videos.length > 0 ? (
                  storageInfo.videos.map((video) => (
                    <div key={video.id} className="p-6 flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {video.title}
                        </h3>
                        <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          {formatFileSize(video.size)} • Downloaded {formatDate(video.downloadedAt)}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteVideo(video.id)}
                        className="ml-4 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                    No videos downloaded yet
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Data Tab */}
        {activeTab === 'data' && (
          <div className="space-y-6">
            {/* Sync Status */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Sync Status
                </h2>
                <div className={`px-3 py-1 rounded-full text-sm ${
                  syncStatus === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                  syncStatus === 'error' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                  syncStatus === 'syncing' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                  'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                }`}>
                  {syncStatus === 'syncing' ? 'Syncing...' : 
                   syncStatus === 'success' ? 'Synced' :
                   syncStatus === 'error' ? 'Sync Failed' : 'Idle'}
                </div>
              </div>
              
              <Button
                onClick={handleManualSync}
                disabled={!isOnline || loading || syncStatus === 'syncing'}
                className="w-full mb-4"
              >
                {loading ? 'Syncing...' : 'Sync Now'}
              </Button>
            </div>

            {/* Offline Data Status */}
            {offlineDataStatus && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Offline Data
                    </h2>
                    <Button
                      onClick={handleClearOfflineData}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 text-sm"
                    >
                      Clear All
                    </Button>
                  </div>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {Object.entries(offlineDataStatus).map(([type, status]) => (
                    <div key={type} className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white capitalize">
                            {type}
                          </h3>
                          <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {status.total} total • {status.pending} pending • {status.synced} synced
                          </div>
                        </div>
                        {status.pending > 0 && (
                          <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full">
                            {status.pending} pending
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </ContentWrapper>
    </BasicLayout>
  );
}
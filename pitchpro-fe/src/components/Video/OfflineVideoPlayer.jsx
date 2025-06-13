'use client';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDownloadedVideo, removeDownloadedVideo, setDownloadProgress, clearDownloadProgress } from '@/redux/features/network/networkSlice';
import VideoDownloadService from '@/services/VideoDownloadService';
import useNetworkSync from '@/hooks/useNetworkSync';

export default function OfflineVideoPlayer({ 
  video, 
  videoSrc, 
  videoId, 
  onEnded, 
  onProgress, 
  progressFinal = 100,
  showDownloadButton = false,
  className = '' 
}) {
  const dispatch = useDispatch();
  const { isOnline } = useNetworkSync();
  const downloadedVideos = useSelector(state => state.network?.downloadedVideos ?? {});
  const downloadProgress = useSelector(state => state.network?.downloadProgress ?? {});
  
  const [currentVideoSrc, setCurrentVideoSrc] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const objectUrlRef = useRef(null);

  // Support both video object and individual props
  const videoData = video || {
    id: videoId,
    url: videoSrc,
    title: `Video ${videoId}`,
    thumbnail: null
  };

  const isDownloaded = downloadedVideos[videoData.id];
  const currentProgress = downloadProgress[videoData.id] || 0;

  useEffect(() => {
    loadVideo();
    
    return () => {
      // Cleanup object URL to prevent memory leaks
      if (objectUrlRef.current) {
        VideoDownloadService.revokeVideoURL(objectUrlRef.current);
      }
    };
  }, [videoData.id, isDownloaded, videoSrc]);

  const loadVideo = async () => {
    try {
      setError(null);
      
      // If videoSrc is provided directly, use it (for compatibility)
      if (videoSrc) {
        setCurrentVideoSrc(videoSrc);
        return;
      }
      
      // Check if video is downloaded offline
      const offlineVideo = await VideoDownloadService.getVideo(videoData.id);
      
      if (offlineVideo && offlineVideo.blob) {
        // Use offline video
        const url = VideoDownloadService.createVideoURL(offlineVideo.blob);
        objectUrlRef.current = url;
        setCurrentVideoSrc(url);
      } else if (isOnline && videoData.url) {
        // Use online video
        setCurrentVideoSrc(videoData.url);
      } else {
        // No video available
        setError('Video not available offline');
      }
    } catch (error) {
      console.error('Error loading video:', error);
      setError('Failed to load video');
    }
  };

  const downloadVideo = async () => {
    if (isDownloading || !isOnline || !videoData.url) return;

    try {
      setIsDownloading(true);
      setError(null);

      const onProgress = (progress) => {
        dispatch(setDownloadProgress({ videoId: videoData.id, progress }));
      };

      const downloadedVideo = await VideoDownloadService.downloadVideo(
        {
          id: videoData.id,
          url: videoData.url,
          title: videoData.title || 'Untitled Video',
          thumbnail: videoData.thumbnail
        },
        onProgress
      );

      // Update Redux store
      dispatch(addDownloadedVideo({
        id: videoData.id,
        title: downloadedVideo.title,
        size: downloadedVideo.size,
        downloadedAt: downloadedVideo.downloadedAt
      }));

      // Clear progress
      dispatch(clearDownloadProgress(videoData.id));
      
      // Reload video to use offline version
      await loadVideo();
      
    } catch (error) {
      console.error('Error downloading video:', error);
      setError('Failed to download video');
      dispatch(clearDownloadProgress(videoData.id));
    } finally {
      setIsDownloading(false);
    }
  };

  const deleteOfflineVideo = async () => {
    try {
      await VideoDownloadService.deleteVideo(videoData.id);
      
      // Update Redux store
      dispatch(removeDownloadedVideo(videoData.id));
      
      // Reload video
      await loadVideo();
    } catch (error) {
      console.error('Error deleting offline video:', error);
      setError('Failed to delete offline video');
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 MB';
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  return (
    <div className={`relative ${className}`}>
      {/* Video Player */}
      <div className="relative bg-black rounded-lg overflow-hidden">
        {currentVideoSrc ? (
          <video
            ref={videoRef}
            src={currentVideoSrc}
            controls
            className="w-full h-auto"
            poster={videoData.thumbnail}
            onError={() => setError('Failed to play video')}
            onEnded={onEnded}
            onTimeUpdate={(e) => {
              if (onProgress && progressFinal) {
                const progress = (e.target.currentTime / e.target.duration) * progressFinal;
                onProgress(progress);
              }
            }}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="w-full h-48 bg-gray-800 flex items-center justify-center">
            <div className="text-center text-white">
              {error ? (
                <div>
                  <svg className="w-12 h-12 mx-auto mb-2 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm">{error}</p>
                </div>
              ) : (
                <div>
                  <svg className="w-12 h-12 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm">Video not available</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Download Progress Overlay */}
        {isDownloading && (
          <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-16 h-16 mx-auto mb-4">
                <svg className="animate-spin w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <p className="text-sm mb-2">Downloading...</p>
              <div className="w-48 bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${currentProgress}%` }}
                ></div>
              </div>
              <p className="text-xs mt-1">{currentProgress}%</p>
            </div>
          </div>
        )}
      </div>

      {/* Video Controls */}
      {showDownloadButton && (
        <div className="mt-3 flex items-center justify-between">
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 dark:text-white">
              {videoData.title || 'Untitled Video'}
            </h3>
            {isDownloaded && (
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                ✓ Downloaded ({formatFileSize(isDownloaded.size)})
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 ml-4">
            {/* Network Status Indicator */}
            <div className={`w-2 h-2 rounded-full ${
              isOnline ? 'bg-green-500' : 'bg-red-500'
            }`} title={isOnline ? 'Online' : 'Offline'}></div>

            {/* Download/Delete Button */}
            {isOnline && !isDownloaded && videoData.url && (
              <button
                onClick={downloadVideo}
                disabled={isDownloading}
                className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Download for offline viewing"
              >
                {isDownloading ? 'Downloading...' : 'Download'}
              </button>
            )}

            {isDownloaded && (
              <button
                onClick={deleteOfflineVideo}
                className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                title="Delete offline video"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
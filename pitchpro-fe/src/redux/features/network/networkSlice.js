import { createSlice } from "@reduxjs/toolkit";

const networkSlice = createSlice({
  name: "network",
  initialState: {
    isOnline: true,
    pendingSync: [],
    downloadedVideos: {},
    offlineData: {
      tests: [],
      progress: [],
      feedback: [],
      audio: [],
    },
    syncStatus: "idle", // 'idle', 'syncing', 'success', 'error'
    lastSyncTime: null,
    downloadProgress: {},
  },
  reducers: {
    setNetworkStatus: (state, action) => {
      state.isOnline = action.payload;
      if (action.payload && state.pendingSync.length > 0) {
        // Trigger sync when coming back online
        state.syncStatus = "pending";
      }
    },
    addPendingSync: (state, action) => {
      const item = {
        id: Date.now() + Math.random(),
        ...action.payload,
        timestamp: new Date().toISOString(),
        synced: false,
      };
      state.pendingSync.push(item);
    },
    removePendingSync: (state, action) => {
      state.pendingSync = state.pendingSync.filter(
        (item) => item.id !== action.payload
      );
    },
    markAsSynced: (state, action) => {
      const item = state.pendingSync.find((item) => item.id === action.payload);
      if (item) {
        item.synced = true;
      }
    },
    addDownloadedVideo: (state, action) => {
      state.downloadedVideos[action.payload.id] = {
        ...action.payload,
        downloadedAt: new Date().toISOString(),
      };
    },
    removeDownloadedVideo: (state, action) => {
      delete state.downloadedVideos[action.payload];
    },
    addOfflineData: (state, action) => {
      const { type, data } = action.payload;
      if (state.offlineData[type]) {
        state.offlineData[type].push({
          id: Date.now() + Math.random(),
          ...data,
          timestamp: new Date().toISOString(),
        });
      }
    },
    removeOfflineData: (state, action) => {
      const { type, id } = action.payload;
      if (state.offlineData[type]) {
        state.offlineData[type] = state.offlineData[type].filter(
          (item) => item.id !== id
        );
      }
    },
    setSyncStatus: (state, action) => {
      state.syncStatus = action.payload;
      if (action.payload === "success") {
        state.lastSyncTime = new Date().toISOString();
      }
    },
    setDownloadProgress: (state, action) => {
      const { videoId, progress } = action.payload;
      state.downloadProgress[videoId] = progress;
    },
    clearDownloadProgress: (state, action) => {
      delete state.downloadProgress[action.payload];
    },
    clearAllOfflineData: (state) => {
      state.offlineData = {
        tests: [],
        progress: [],
        feedback: [],
        audio: [],
      };
      state.pendingSync = [];
      state.downloadedVideos = {};
    },
  },
});

export const {
  setNetworkStatus,
  addPendingSync,
  removePendingSync,
  markAsSynced,
  addDownloadedVideo,
  removeDownloadedVideo,
  addOfflineData,
  removeOfflineData,
  setSyncStatus,
  setDownloadProgress,
  clearDownloadProgress,
  clearAllOfflineData,
} = networkSlice.actions;

export default networkSlice.reducer;

// Selectors
export const selectIsOnline = (state) => state.network.isOnline;
export const selectPendingSync = (state) => state.network.pendingSync;
export const selectDownloadedVideos = (state) => state.network.downloadedVideos;
export const selectOfflineData = (state) => state.network.offlineData;
export const selectSyncStatus = (state) => state.network.syncStatus;
export const selectDownloadProgress = (state) => state.network.downloadProgress;

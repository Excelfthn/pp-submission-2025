"use client";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSyncStatus,
  addPendingSync,
} from "@/redux/features/network/networkSlice";
import OfflineSyncService from "@/services/OfflineSyncService";

export default function useNetworkSync() {
  const dispatch = useDispatch();
  const isOnline = useSelector((state) => state.network?.isOnline ?? true);
  const syncStatus = useSelector(
    (state) => state.network?.syncStatus ?? "idle"
  );
  const pendingSync = useSelector((state) => state.network?.pendingSync ?? []);

  // Auto-sync when coming back online
  const performSync = useCallback(async () => {
    if (!isOnline || syncStatus === "syncing") {
      return;
    }

    try {
      dispatch(setSyncStatus("syncing"));

      const result = await OfflineSyncService.syncAll();

      if (result.success) {
        dispatch(setSyncStatus("success"));

        // Clear synced data from localStorage
        OfflineSyncService.clearSyncedData();

        console.log("Sync completed successfully:", result.results.summary);
      } else {
        dispatch(setSyncStatus("error"));
        console.error("Sync failed:", result.error);
      }
    } catch (error) {
      dispatch(setSyncStatus("error"));
      console.error("Sync error:", error);
    }
  }, [isOnline, syncStatus, dispatch]);

  // Trigger sync when network status changes to online
  useEffect(() => {
    if (isOnline && syncStatus === "pending") {
      // Add a small delay to ensure network is stable
      const timer = setTimeout(() => {
        performSync();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isOnline, syncStatus, performSync]);

  // Store data offline when network is unavailable
  const storeOffline = useCallback(
    (type, data) => {
      if (!isOnline) {
        const offlineItem = OfflineSyncService.storeOfflineData(type, data);
        if (offlineItem) {
          dispatch(
            addPendingSync({
              type,
              data: offlineItem,
              action: "create",
            })
          );
          return offlineItem;
        }
      }
      return null;
    },
    [isOnline, dispatch]
  );

  // Manual sync trigger
  const manualSync = useCallback(async () => {
    if (isOnline) {
      await performSync();
    }
  }, [isOnline, performSync]);

  // Get sync status information
  const getSyncInfo = useCallback(() => {
    return {
      isOnline,
      syncStatus,
      pendingCount: pendingSync.length,
      offlineStatus: OfflineSyncService.getSyncStatus(),
    };
  }, [isOnline, syncStatus, pendingSync]);

  return {
    isOnline,
    syncStatus,
    pendingSync,
    storeOffline,
    manualSync,
    getSyncInfo,
  };
}

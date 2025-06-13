import axios from "axios";

class OfflineSyncService {
  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    this.syncQueue = [];
    this.isSyncing = false;
  }

  // Store data offline in localStorage
  storeOfflineData(type, data) {
    try {
      const key = `offline_${type}`;
      const existing = this.getOfflineData(type);
      const newItem = {
        id: Date.now() + Math.random(),
        ...data,
        timestamp: new Date().toISOString(),
        synced: false,
      };

      existing.push(newItem);
      localStorage.setItem(key, JSON.stringify(existing));

      return newItem;
    } catch (error) {
      console.error("Error storing offline data:", error);
      return null;
    }
  }

  // Get offline data from localStorage
  getOfflineData(type) {
    try {
      const key = `offline_${type}`;
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error getting offline data:", error);
      return [];
    }
  }

  // Remove synced data from localStorage
  removeOfflineData(type, id) {
    try {
      const key = `offline_${type}`;
      const existing = this.getOfflineData(type);
      const filtered = existing.filter((item) => item.id !== id);
      localStorage.setItem(key, JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error("Error removing offline data:", error);
      return false;
    }
  }

  // Mark data as synced
  markAsSynced(type, id) {
    try {
      const key = `offline_${type}`;
      const existing = this.getOfflineData(type);
      const updated = existing.map((item) =>
        item.id === id
          ? { ...item, synced: true, syncedAt: new Date().toISOString() }
          : item
      );
      localStorage.setItem(key, JSON.stringify(updated));
      return true;
    } catch (error) {
      console.error("Error marking as synced:", error);
      return false;
    }
  }

  // Get auth token from localStorage
  getAuthToken() {
    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        return user.token;
      }
      return null;
    } catch (error) {
      console.error("Error getting auth token:", error);
      return null;
    }
  }

  // Sync test submissions
  async syncTestSubmissions() {
    const tests = this.getOfflineData("tests").filter((item) => !item.synced);
    const results = [];

    for (const test of tests) {
      try {
        const token = this.getAuthToken();
        if (!token) {
          throw new Error("No auth token available");
        }

        const response = await axios.post(
          `${this.baseURL}/api/tests/submit`,
          {
            testType: test.testType,
            answers: test.answers,
            score: test.score,
            completedAt: test.timestamp,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200 || response.status === 201) {
          this.markAsSynced("tests", test.id);
          results.push({ success: true, id: test.id, data: response.data });
        } else {
          results.push({
            success: false,
            id: test.id,
            error: "Unexpected response status",
          });
        }
      } catch (error) {
        console.error("Error syncing test:", error);
        results.push({ success: false, id: test.id, error: error.message });
      }
    }

    return results;
  }

  // Sync progress data
  async syncProgress() {
    const progress = this.getOfflineData("progress").filter(
      (item) => !item.synced
    );
    const results = [];

    for (const item of progress) {
      try {
        const token = this.getAuthToken();
        if (!token) {
          throw new Error("No auth token available");
        }

        const response = await axios.post(
          `${this.baseURL}/api/progress/update`,
          {
            videoId: item.videoId,
            progress: item.progress,
            completed: item.completed,
            timestamp: item.timestamp,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200 || response.status === 201) {
          this.markAsSynced("progress", item.id);
          results.push({ success: true, id: item.id, data: response.data });
        } else {
          results.push({
            success: false,
            id: item.id,
            error: "Unexpected response status",
          });
        }
      } catch (error) {
        console.error("Error syncing progress:", error);
        results.push({ success: false, id: item.id, error: error.message });
      }
    }

    return results;
  }

  // Sync feedback data
  async syncFeedback() {
    const feedback = this.getOfflineData("feedback").filter(
      (item) => !item.synced
    );
    const results = [];

    for (const item of feedback) {
      try {
        const token = this.getAuthToken();
        if (!token) {
          throw new Error("No auth token available");
        }

        const response = await axios.post(
          `${this.baseURL}/api/feedback/submit`,
          {
            type: item.type,
            content: item.content,
            rating: item.rating,
            timestamp: item.timestamp,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200 || response.status === 201) {
          this.markAsSynced("feedback", item.id);
          results.push({ success: true, id: item.id, data: response.data });
        } else {
          results.push({
            success: false,
            id: item.id,
            error: "Unexpected response status",
          });
        }
      } catch (error) {
        console.error("Error syncing feedback:", error);
        results.push({ success: false, id: item.id, error: error.message });
      }
    }

    return results;
  }

  // Sync audio recordings
  async syncAudio() {
    const audio = this.getOfflineData("audio").filter((item) => !item.synced);
    const results = [];

    for (const item of audio) {
      try {
        const token = this.getAuthToken();
        if (!token) {
          throw new Error("No auth token available");
        }

        // Convert base64 to blob if needed
        let audioBlob;
        if (item.audioData.startsWith("data:")) {
          const response = await fetch(item.audioData);
          audioBlob = await response.blob();
        } else {
          audioBlob = new Blob([item.audioData], { type: "audio/wav" });
        }

        const formData = new FormData();
        formData.append("audio", audioBlob, `recording_${item.id}.wav`);
        formData.append("videoId", item.videoId);
        formData.append("timestamp", item.timestamp);

        const response = await axios.post(
          `${this.baseURL}/api/audio/upload`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200 || response.status === 201) {
          this.markAsSynced("audio", item.id);
          results.push({ success: true, id: item.id, data: response.data });
        } else {
          results.push({
            success: false,
            id: item.id,
            error: "Unexpected response status",
          });
        }
      } catch (error) {
        console.error("Error syncing audio:", error);
        results.push({ success: false, id: item.id, error: error.message });
      }
    }

    return results;
  }

  // Sync all offline data
  async syncAll() {
    if (this.isSyncing) {
      console.log("Sync already in progress");
      return { success: false, message: "Sync already in progress" };
    }

    this.isSyncing = true;
    const results = {
      tests: [],
      progress: [],
      feedback: [],
      audio: [],
      summary: { total: 0, synced: 0, failed: 0 },
    };

    try {
      // Sync in order of priority
      results.tests = await this.syncTestSubmissions();
      results.progress = await this.syncProgress();
      results.feedback = await this.syncFeedback();
      results.audio = await this.syncAudio();

      // Calculate summary
      const allResults = [
        ...results.tests,
        ...results.progress,
        ...results.feedback,
        ...results.audio,
      ];
      results.summary.total = allResults.length;
      results.summary.synced = allResults.filter((r) => r.success).length;
      results.summary.failed = allResults.filter((r) => !r.success).length;

      return { success: true, results };
    } catch (error) {
      console.error("Error during sync:", error);
      return { success: false, error: error.message, results };
    } finally {
      this.isSyncing = false;
    }
  }

  // Get sync status
  getSyncStatus() {
    const types = ["tests", "progress", "feedback", "audio"];
    const status = {};

    types.forEach((type) => {
      const data = this.getOfflineData(type);
      status[type] = {
        total: data.length,
        pending: data.filter((item) => !item.synced).length,
        synced: data.filter((item) => item.synced).length,
      };
    });

    return status;
  }

  // Clear all offline data
  clearAllOfflineData() {
    const types = ["tests", "progress", "feedback", "audio"];
    types.forEach((type) => {
      localStorage.removeItem(`offline_${type}`);
    });
  }

  // Clear synced data only
  clearSyncedData() {
    const types = ["tests", "progress", "feedback", "audio"];
    types.forEach((type) => {
      const data = this.getOfflineData(type);
      const pending = data.filter((item) => !item.synced);
      localStorage.setItem(`offline_${type}`, JSON.stringify(pending));
    });
  }
}

export default new OfflineSyncService();

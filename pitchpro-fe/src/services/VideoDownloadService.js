class VideoDownloadService {
  constructor() {
    this.dbName = "PitchProVideos";
    this.dbVersion = 1;
    this.storeName = "videos";
    this.db = null;
  }

  async initDB() {
    if (this.db) return this.db;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, { keyPath: "id" });
          store.createIndex("downloadedAt", "downloadedAt", { unique: false });
          store.createIndex("size", "size", { unique: false });
        }
      };
    });
  }

  async downloadVideo(videoData, onProgress = null) {
    try {
      await this.initDB();

      const { id, url, title, thumbnail } = videoData;

      // Check if video already exists
      const existing = await this.getVideo(id);
      if (existing) {
        return existing;
      }

      // Download video blob
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to download video: ${response.statusText}`);
      }

      const contentLength = response.headers.get("content-length");
      const total = parseInt(contentLength, 10);
      let loaded = 0;

      const reader = response.body.getReader();
      const chunks = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        chunks.push(value);
        loaded += value.length;

        if (onProgress && total) {
          onProgress(Math.round((loaded / total) * 100));
        }
      }

      const blob = new Blob(chunks, { type: "video/mp4" });

      // Store in IndexedDB
      const videoRecord = {
        id,
        title,
        thumbnail,
        blob,
        size: blob.size,
        downloadedAt: new Date().toISOString(),
        originalUrl: url,
      };

      await this.storeVideo(videoRecord);
      return videoRecord;
    } catch (error) {
      console.error("Error downloading video:", error);
      throw error;
    }
  }

  async storeVideo(videoRecord) {
    await this.initDB();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);
      const request = store.put(videoRecord);

      request.onsuccess = () => resolve(videoRecord);
      request.onerror = () => reject(request.error);
    });
  }

  async getVideo(id) {
    await this.initDB();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readonly");
      const store = transaction.objectStore(this.storeName);
      const request = store.get(id);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getAllVideos() {
    await this.initDB();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readonly");
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async deleteVideo(id) {
    await this.initDB();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);
      const request = store.delete(id);

      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    });
  }

  async getStorageUsage() {
    const videos = await this.getAllVideos();
    const totalSize = videos.reduce((sum, video) => sum + (video.size || 0), 0);

    return {
      count: videos.length,
      totalSize,
      totalSizeMB: Math.round((totalSize / (1024 * 1024)) * 100) / 100,
      videos: videos.map((v) => ({
        id: v.id,
        title: v.title,
        size: v.size,
        downloadedAt: v.downloadedAt,
      })),
    };
  }

  async clearAllVideos() {
    await this.initDB();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);
      const request = store.clear();

      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    });
  }

  createVideoURL(blob) {
    return URL.createObjectURL(blob);
  }

  revokeVideoURL(url) {
    URL.revokeObjectURL(url);
  }
}

export default new VideoDownloadService();

import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function GET(request, { params }) {
  try {
    const { filename } = params;

    if (!filename) {
      return NextResponse.json(
        { error: "Filename is required" },
        { status: 400 }
      );
    }

    // Proxy the request to the backend /media endpoint
    const backendUrl = `${API_URL}/media?filename=${encodeURIComponent(
      filename
    )}`;

    const response = await fetch(backendUrl, {
      method: "GET",
      headers: {
        Authorization: request.headers.get("Authorization") || "",
      },
    });

    if (!response.ok) {
      console.error(
        `Backend video request failed: ${response.status} ${response.statusText}`
      );
      return NextResponse.json(
        { error: `Video not found: ${filename}` },
        { status: response.status }
      );
    }

    // Get the video data as a stream
    const videoData = await response.arrayBuffer();

    // Return the video with appropriate headers
    return new NextResponse(videoData, {
      status: 200,
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "video/mp4",
        "Content-Length":
          response.headers.get("Content-Length") ||
          videoData.byteLength.toString(),
        "Accept-Ranges": "bytes",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Error proxying video request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

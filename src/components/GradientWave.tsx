'use client';

export function GradientWave() {
  return (
    <div className="header_background">
      <div className="header_background-videos">
        <div className="header_background-video-1-wrapper">
          <div className="header_background-video-1">
            <video
              autoPlay
              loop
              muted
              playsInline
              style={{
                backgroundImage: 'url(https://cdn.prod.website-files.com/67f69c3ffe99cd671ac1ac6d%2F67ffe50cb956e6cf0feb87dd_waves-2-poster-00001.jpg)',
              }}
            >
              <source
                src="https://cdn.prod.website-files.com/67f69c3ffe99cd671ac1ac6d%2F67ffe50cb956e6cf0feb87dd_waves-2-transcode.mp4"
                type="video/mp4"
              />
              <source
                src="https://cdn.prod.website-files.com/67f69c3ffe99cd671ac1ac6d%2F67ffe50cb956e6cf0feb87dd_waves-2-transcode.webm"
                type="video/webm"
              />
            </video>
          </div>
        </div>
      </div>
    </div>
  );
}

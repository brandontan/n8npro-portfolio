import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default function handler() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(135deg, #1e1b4b 0%, #581c87 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          position: 'relative',
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 'bold', marginBottom: 20 }}>
          Brandon Tan
        </div>
        <div style={{ fontSize: 36, color: '#e5e7eb', marginBottom: 10 }}>
          AI Automation Expert
        </div>
        <div style={{ fontSize: 24, color: '#a5b4fc' }}>
          I Build Intelligent Automation
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            right: 40,
            fontSize: 24,
            color: '#a5b4fc',
          }}
        >
          aiflows.pro
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    elevenLabsWidgetLoaded?: boolean;
  }
}

export const ElevenLabsChat = () => {
  const widgetContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if custom element already exists or script is loading
    if (!customElements.get('elevenlabs-convai') && !window.elevenLabsWidgetLoaded) {
      window.elevenLabsWidgetLoaded = true;
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
      script.async = true;
      document.body.appendChild(script);
      
      // Wait for script to load then add the widget
      script.onload = () => {
        if (widgetContainerRef.current) {
          widgetContainerRef.current.innerHTML = '<elevenlabs-convai agent-id="agent_01k01kfd1werhvjjw6jtev0kh5"></elevenlabs-convai>';
        }
      };
      
      return () => {
        // Cleanup if component unmounts
        script.remove();
      };
    } else {
      // Custom element already exists, just add the widget
      if (widgetContainerRef.current) {
        widgetContainerRef.current.innerHTML = '<elevenlabs-convai agent-id="agent_01k01kfd1werhvjjw6jtev0kh5"></elevenlabs-convai>';
      }
    }
  }, []);

  return (
    <div 
      ref={widgetContainerRef}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000
      }}
    />
  );
};

export default ElevenLabsChat;
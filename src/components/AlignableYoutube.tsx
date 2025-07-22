import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react';
import { NodeViewProps } from '@tiptap/react';

// Custom YouTube component that respects alignment
const YoutubeComponent = ({ node }: NodeViewProps) => {
  const { src, width = 640, height = 480, align = 'left' } = node.attrs;
  
  const alignmentClasses = {
    left: '',
    center: 'mx-auto',
    right: 'ml-auto',
  };
  
  const wrapperStyles = {
    left: {},
    center: { display: 'flex', justifyContent: 'center' },
    right: { display: 'flex', justifyContent: 'flex-end' },
  };
  
  return (
    <NodeViewWrapper className="youtube-wrapper" style={wrapperStyles[align as keyof typeof wrapperStyles]}>
      <iframe
        src={src}
        width={width}
        height={height}
        className={`rounded-lg overflow-hidden my-4 ${alignmentClasses[align as keyof typeof alignmentClasses]}`}
        frameBorder="0"
        allowFullScreen
      />
    </NodeViewWrapper>
  );
};

// Custom YouTube extension
export const AlignableYoutube = Node.create({
  name: 'alignableYoutube',
  
  group: 'block',
  
  atom: true,
  
  addAttributes() {
    return {
      src: {
        default: null,
      },
      width: {
        default: 640,
      },
      height: {
        default: 480,
      },
      align: {
        default: 'left',
      },
    };
  },
  
  parseHTML() {
    return [
      {
        tag: 'div[data-youtube-video]',
        getAttrs: (dom: HTMLElement) => {
          const iframe = dom.querySelector('iframe');
          if (!iframe) return false;
          
          const src = iframe.getAttribute('src');
          const width = parseInt(iframe.getAttribute('width') || '640');
          const height = parseInt(iframe.getAttribute('height') || '480');
          
          // Determine alignment from wrapper styles
          const style = dom.getAttribute('style') || '';
          let align = 'left';
          if (style.includes('justify-content: center')) {
            align = 'center';
          } else if (style.includes('justify-content: flex-end')) {
            align = 'right';
          }
          
          return {
            src,
            width,
            height,
            align,
          };
        },
      },
    ];
  },
  
  renderHTML({ node }) {
    const { src, width = 640, height = 480, align = 'left' } = node.attrs;
    
    const alignmentClasses = {
      left: '',
      center: 'mx-auto',
      right: 'ml-auto',
    };
    
    const wrapperStyles = {
      left: '',
      center: 'display: flex; justify-content: center;',
      right: 'display: flex; justify-content: flex-end;',
    };
    
    return [
      'div',
      {
        'data-youtube-video': '',
        class: 'youtube-wrapper',
        style: wrapperStyles[align as keyof typeof wrapperStyles] || '',
      },
      [
        'iframe',
        {
          src,
          width: String(width),
          height: String(height),
          class: `rounded-lg overflow-hidden my-4 ${alignmentClasses[align as keyof typeof alignmentClasses] || ''}`,
          frameborder: '0',
          allowfullscreen: 'true',
        },
      ],
    ];
  },
  
  addNodeView() {
    return ReactNodeViewRenderer(YoutubeComponent);
  },
  
  addCommands() {
    return {
      setAlignableYoutube: (options: { src: string; width?: number; height?: number; align?: string }) => ({ commands, editor }: any) => {
        // Get current text alignment from the selection
        const { selection } = editor.state;
        const parentNode = selection.$from.parent;
        const currentAlign = parentNode.attrs.textAlign || 'left';
        
        return commands.insertContent({
          type: this.name,
          attrs: {
            src: options.src,
            width: options.width,
            height: options.height,
            align: options.align || currentAlign,
          },
        });
      },
    };
  },
});
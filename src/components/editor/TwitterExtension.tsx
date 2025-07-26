import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { NodeViewWrapper } from '@tiptap/react';
import { TwitterEmbedScript } from './TwitterEmbedScript';

// Twitter Node View Component
const TwitterNodeView = ({ node }: { node: any }) => {
  const { tweetId } = node.attrs;
  
  // Handle case where tweetId might be null or undefined
  if (!tweetId) {
    return (
      <NodeViewWrapper className="twitter-node-view">
        <div className="twitter-embed flex justify-center my-4">
          <div className="inline-flex items-center gap-2 bg-red-900/20 border border-red-500/30 rounded-lg px-4 py-3">
            <span className="text-red-400">Invalid tweet ID</span>
          </div>
        </div>
      </NodeViewWrapper>
    );
  }
  
  const tweetIdStr = String(tweetId); // Ensure it's a string
  
  return (
    <NodeViewWrapper className="twitter-node-view">
      <TwitterEmbedScript tweetId={tweetIdStr} />
    </NodeViewWrapper>
  );
};

// Twitter Extension
export const TwitterExtension = Node.create({
  name: 'twitter',

  group: 'block',

  atom: true,

  addAttributes() {
    return {
      tweetId: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-twitter-embed]',
        getAttrs: (dom: HTMLElement) => ({
          tweetId: dom.getAttribute('data-tweet-id'),
        }),
      },
    ];
  },

  renderHTML({ HTMLAttributes, node }) {
    // Render a placeholder that will be found and replaced by RenderContent
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-twitter-embed': '',
        'data-tweet-id': node.attrs.tweetId,
        class: 'twitter-embed-placeholder',
      }),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(TwitterNodeView);
  },

  addCommands() {
    return {
      setTwitterEmbed:
        (tweetId: string) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: {
              tweetId,
            },
          });
        },
    };
  },
});
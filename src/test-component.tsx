// Minimal test component to reproduce the issue
import { useState, useEffect } from 'react';

export function TestComponent() {
  const [selectedPosts, setSelectedPosts] = useState<string[]>(() => {
    console.log('[TEST] Initializing selectedPosts');
    return [];
  });
  
  const posts = ['1', '2', '3', '4', '5', '6', '7'];
  
  useEffect(() => {
    console.log('[TEST] selectedPosts changed:', selectedPosts);
  }, [selectedPosts]);
  
  const togglePost = (id: string) => {
    console.log('[TEST] Toggle called for:', id);
    setSelectedPosts(prev => {
      if (prev.includes(id)) {
        return prev.filter(p => p !== id);
      } else {
        return [...prev, id];
      }
    });
  };
  
  const handleDelete = () => {
    console.log('[TEST] Delete with:', selectedPosts);
    alert(`Delete ${selectedPosts.length} posts?`);
  };
  
  return (
    <div>
      <h1>Test Component</h1>
      <div>Selected: {selectedPosts.length}</div>
      {posts.map(id => (
        <div key={id}>
          <button onClick={() => togglePost(id)}>
            {selectedPosts.includes(id) ? '[X]' : '[ ]'} Post {id}
          </button>
        </div>
      ))}
      <button onClick={handleDelete}>Delete Selected</button>
    </div>
  );
}
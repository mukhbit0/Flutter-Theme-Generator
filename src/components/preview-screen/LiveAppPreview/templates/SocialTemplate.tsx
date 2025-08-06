import { useState } from 'react'
import { AppTemplateProps, InteractionState } from '../types'

export default function SocialTemplate({ theme, darkMode, onInteraction }: AppTemplateProps) {
  const [interactions, setInteractions] = useState<InteractionState>({
    buttonPressed: false,
    formFocused: null,
    drawerOpen: false,
    modalOpen: false,
    notifications: []
  })

  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set())
  const [postText, setPostText] = useState('')

  const handleLike = (postId: number) => {
    const newLikedPosts = new Set(likedPosts)
    if (newLikedPosts.has(postId)) {
      newLikedPosts.delete(postId)
    } else {
      newLikedPosts.add(postId)
    }
    setLikedPosts(newLikedPosts)
    onInteraction?.('like', { postId, liked: !likedPosts.has(postId) })
  }

  const handleInteraction = (type: string, data?: any) => {
    setInteractions(prev => ({ ...prev, buttonPressed: true }))
    onInteraction?.(type, data)
    setTimeout(() => {
      setInteractions(prev => ({ ...prev, buttonPressed: false }))
    }, 200)
  }

  const bgColor = darkMode ? theme.surface : theme.surface
  const textColor = darkMode ? theme.onSurface : theme.onSurface
  const cardColor = darkMode ? theme.surfaceContainer : theme.surfaceContainer

  const posts = [
    {
      id: 1,
      user: 'john_doe',
      avatar: '👨‍💻',
      time: '2h',
      content: 'Just launched my new Flutter app! The theme looks amazing 🚀',
      likes: 42,
      comments: 8,
      shares: 3
    },
    {
      id: 2,
      user: 'design_sarah',
      avatar: '👩‍🎨',
      time: '4h',
      content: 'Beautiful sunset today! Sometimes you need to step away from the screen and enjoy nature 🌅',
      likes: 128,
      comments: 15,
      shares: 7
    },
    {
      id: 3,
      user: 'tech_mike',
      avatar: '👨‍🔬',
      time: '6h',
      content: 'Working on some exciting new features. Can\'t wait to share them with you all! 💡',
      likes: 67,
      comments: 12,
      shares: 4
    }
  ]

  return (
    <div 
      className="w-full h-full relative overflow-hidden"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {/* App Bar */}
      <div 
        className="h-14 flex items-center justify-between px-4 shadow-sm border-b"
        style={{ 
          backgroundColor: cardColor,
          borderColor: theme.outline + '20'
        }}
      >
        <div className="flex items-center space-x-3">
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold"
            style={{ backgroundColor: theme.primary, color: theme.onPrimary }}
          >
            S
          </div>
          <h1 className="text-xl font-bold" style={{ color: theme.primary }}>
            Social
          </h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            className="p-2 rounded-full transition-all duration-200 hover:bg-black/5 relative"
            onClick={() => handleInteraction('notifications')}
          >
            <svg className="w-6 h-6" style={{ color: theme.onSurface }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-4-4m4 4l-4-4m4 4H9a6 6 0 000-12h3" />
            </svg>
            <div 
              className="absolute top-1 right-1 w-2 h-2 rounded-full"
              style={{ backgroundColor: theme.error }}
            />
          </button>
          <button 
            className="p-2 rounded-full transition-all duration-200 hover:bg-black/5"
            onClick={() => handleInteraction('messages')}
          >
            <svg className="w-6 h-6" style={{ color: theme.onSurface }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Stories Section */}
      <div className="px-4 py-3 border-b" style={{ borderColor: theme.outline + '20' }}>
        <div className="flex space-x-4 overflow-x-auto">
          {/* Your Story */}
          <div className="flex flex-col items-center space-y-1 flex-shrink-0">
            <div 
              className="w-16 h-16 rounded-full border-2 border-dashed flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-105"
              style={{ borderColor: theme.outline }}
              onClick={() => handleInteraction('add_story')}
            >
              <svg className="w-6 h-6" style={{ color: theme.onSurfaceVariant }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="text-xs" style={{ color: theme.onSurfaceVariant }}>Your Story</span>
          </div>

          {/* Other Stories */}
          {['alice', 'bob', 'charlie', 'diana'].map((user, index) => (
            <div key={user} className="flex flex-col items-center space-y-1 flex-shrink-0">
              <div 
                className="w-16 h-16 rounded-full border-2 cursor-pointer transition-all duration-200 hover:scale-105 flex items-center justify-center text-xl"
                style={{ 
                  borderColor: theme.primary,
                  backgroundColor: theme.primaryContainer 
                }}
                onClick={() => handleInteraction('view_story', { user })}
              >
                {['👩', '👨', '👱‍♂️', '👩‍🦱'][index]}
              </div>
              <span className="text-xs" style={{ color: theme.onSurfaceVariant }}>{user}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Post Composer */}
      <div 
        className="px-4 py-3 border-b"
        style={{ 
          backgroundColor: cardColor,
          borderColor: theme.outline + '20'
        }}
      >
        <div className="flex items-center space-x-3">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
            style={{ backgroundColor: theme.primaryContainer, color: theme.onPrimaryContainer }}
          >
            👤
          </div>
          <input
            type="text"
            placeholder="What's on your mind?"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            onFocus={() => setInteractions(prev => ({ ...prev, formFocused: 'post' }))}
            onBlur={() => setInteractions(prev => ({ ...prev, formFocused: null }))}
            className="flex-1 px-4 py-2 rounded-full border transition-all duration-200 outline-none"
            style={{
              backgroundColor: interactions.formFocused === 'post' ? theme.surfaceContainerHigh : theme.surfaceContainer,
              borderColor: interactions.formFocused === 'post' ? theme.primary : theme.outline,
              color: theme.onSurface
            }}
          />
          {postText && (
            <button
              className="px-4 py-2 rounded-full transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: theme.primary, color: theme.onPrimary }}
              onClick={() => {
                handleInteraction('post', { content: postText })
                setPostText('')
              }}
            >
              Post
            </button>
          )}
        </div>
      </div>

      {/* Posts Feed */}
      <div className="flex-1 overflow-y-auto pb-20">
        {posts.map((post) => (
          <div
            key={post.id}
            className="border-b p-4"
            style={{ 
              backgroundColor: cardColor,
              borderColor: theme.outline + '20'
            }}
          >
            {/* Post Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg">
                  {post.avatar}
                </div>
                <div>
                  <h3 className="font-semibold" style={{ color: theme.onSurface }}>
                    {post.user}
                  </h3>
                  <p className="text-sm" style={{ color: theme.onSurfaceVariant }}>
                    {post.time} ago
                  </p>
                </div>
              </div>
              <button 
                className="p-2 rounded-full transition-all duration-200 hover:bg-black/5"
                onClick={() => handleInteraction('post_menu', { postId: post.id })}
              >
                <svg className="w-5 h-5" style={{ color: theme.onSurfaceVariant }} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
            </div>

            {/* Post Content */}
            <p className="mb-4 leading-relaxed" style={{ color: theme.onSurface }}>
              {post.content}
            </p>

            {/* Post Actions */}
            <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: theme.outline + '20' }}>
              <div className="flex items-center space-x-6">
                <button
                  className="flex items-center space-x-2 transition-all duration-200 hover:scale-105"
                  onClick={() => handleLike(post.id)}
                >
                  <svg 
                    className="w-5 h-5" 
                    style={{ color: likedPosts.has(post.id) ? theme.error : theme.onSurfaceVariant }} 
                    fill={likedPosts.has(post.id) ? "currentColor" : "none"} 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span 
                    className="text-sm" 
                    style={{ color: likedPosts.has(post.id) ? theme.error : theme.onSurfaceVariant }}
                  >
                    {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                  </span>
                </button>

                <button
                  className="flex items-center space-x-2 transition-all duration-200 hover:scale-105"
                  onClick={() => handleInteraction('comment', { postId: post.id })}
                >
                  <svg className="w-5 h-5" style={{ color: theme.onSurfaceVariant }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="text-sm" style={{ color: theme.onSurfaceVariant }}>
                    {post.comments}
                  </span>
                </button>

                <button
                  className="flex items-center space-x-2 transition-all duration-200 hover:scale-105"
                  onClick={() => handleInteraction('share', { postId: post.id })}
                >
                  <svg className="w-5 h-5" style={{ color: theme.onSurfaceVariant }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  <span className="text-sm" style={{ color: theme.onSurfaceVariant }}>
                    {post.shares}
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-16 flex items-center justify-around border-t"
        style={{ 
          backgroundColor: cardColor,
          borderColor: theme.outline + '30'
        }}
      >
        {[
          { icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z', label: 'Home', active: true },
          { icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', label: 'Search', active: false },
          { icon: 'M12 4v16m8-8H4', label: 'Create', active: false },
          { icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', label: 'Activity', active: false },
          { icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', label: 'Profile', active: false }
        ].map((item) => (
          <button
            key={item.label}
            className="flex flex-col items-center space-y-1 p-2 transition-all duration-200"
            onClick={() => handleInteraction(`navigate_${item.label.toLowerCase()}`)}
          >
            <svg 
              className="w-6 h-6" 
              style={{ color: item.active ? theme.primary : theme.onSurfaceVariant }} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
            </svg>
            <span 
              className="text-xs" 
              style={{ color: item.active ? theme.primary : theme.onSurfaceVariant }}
            >
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {/* Floating Action Button - Create Post */}
      <button
        className={`absolute bottom-20 right-4 w-14 h-14 rounded-full shadow-lg transition-all duration-200 ${
          interactions.buttonPressed ? 'scale-95' : 'hover:scale-105'
        }`}
        style={{ backgroundColor: theme.secondary }}
        onClick={() => handleInteraction('create_post')}
      >
        <svg className="w-6 h-6 mx-auto" style={{ color: theme.onSecondary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  )
}

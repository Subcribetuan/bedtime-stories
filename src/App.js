import React, { useState, useEffect } from 'react';
import './App.css';
import storiesData from './data/stories.json';
import {
  getUserPreferences,
  saveUserPreferences,
  getFavorites,
  addToFavorites,
  removeFromFavorites,
  isStoryFavorited,
  getReadStories,
  markStoryAsRead
} from './utils/storage';
import {
  THEME_CATEGORIES,
  CHARACTER_GROUPS,
  READING_TIME_GROUPS,
  getStoriesByCharacter,
  getStoriesByThemeCategory,
  getStoriesByReadingTime,
  getStoryStats
} from './utils/storyGroups';

function App() {
  const [currentStory, setCurrentStory] = useState(0);
  const [darkMode, setDarkMode] = useState(true);
  const [fontSize, setFontSize] = useState('medium');
  const [readStories, setReadStories] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showStoryList, setShowStoryList] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('all');
  const [selectedCharacter, setSelectedCharacter] = useState('all');
  const [selectedThemeCategory, setSelectedThemeCategory] = useState('all');
  const [selectedReadingTime, setSelectedReadingTime] = useState('all');

  // Load preferences and data from localStorage
  useEffect(() => {
    const preferences = getUserPreferences();
    setDarkMode(preferences.darkMode);
    setFontSize(preferences.fontSize);
    setReadStories(getReadStories());
    setFavorites(getFavorites());
  }, []);

  // Save preferences when they change
  useEffect(() => {
    saveUserPreferences({ darkMode, fontSize });
  }, [darkMode, fontSize]);

  const currentStoryData = storiesData.stories[currentStory];

  // Helper functions
  const toggleFavorite = (storyId) => {
    if (isStoryFavorited(storyId)) {
      removeFromFavorites(storyId);
      setFavorites(getFavorites());
    } else {
      addToFavorites(storyId);
      setFavorites(getFavorites());
    }
  };

  const goToStory = (storyIndex) => {
    setCurrentStory(storyIndex);
    markStoryAsRead(storiesData.stories[storyIndex].id);
    setReadStories(getReadStories());
    setShowStoryList(false);
  };

  const getFilteredStories = () => {
    let filteredStories = storiesData.stories;

    // Filter by special categories first
    if (selectedTheme === 'favorites') {
      filteredStories = storiesData.stories.filter(story => favorites.includes(story.id));
    } else if (selectedTheme === 'recent') {
      filteredStories = storiesData.stories.filter(story => readStories.includes(story.id));
    } else if (selectedTheme !== 'all') {
      filteredStories = storiesData.stories.filter(story => story.themes && story.themes.includes(selectedTheme));
    }

    // Apply character filter
    if (selectedCharacter !== 'all') {
      filteredStories = getStoriesByCharacter(filteredStories, selectedCharacter);
    }

    // Apply theme category filter
    if (selectedThemeCategory !== 'all') {
      filteredStories = getStoriesByThemeCategory(filteredStories, selectedThemeCategory);
    }

    // Apply reading time filter
    if (selectedReadingTime !== 'all') {
      filteredStories = getStoriesByReadingTime(filteredStories, selectedReadingTime);
    }

    // Apply search filter
    if (searchTerm) {
      filteredStories = filteredStories.filter(story => {
        return story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
               (story.themes && story.themes.some(theme => theme.toLowerCase().includes(searchTerm.toLowerCase()))) ||
               story.hook.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }

    return filteredStories;
  };

  if (showStoryList) {
    return (
      <div className={`app ${darkMode ? 'dark' : 'light'} font-${fontSize}`}>
        {/* Story List View */}
        <div className="story-list-overlay">
          <div className="story-list-header">
            <h1>Bedtime Stories</h1>
            <button
              className="close-button"
              onClick={() => setShowStoryList(false)}
            >
              ✕
            </button>
          </div>

          {/* Search and Filters */}
          <div className="search-filters">
            <input
              type="text"
              placeholder="Search stories or themes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Character Tabs (Primary Navigation) */}
          <div className="character-tabs">
            <button
              className={`character-tab ${selectedCharacter === 'all' ? 'active' : ''}`}
              onClick={() => {
                setSelectedCharacter('all');
                setSelectedTheme('all');
              }}
            >
              🌟 All Stories ({storiesData.stories.length})
            </button>
            {Object.entries(CHARACTER_GROUPS).map(([key, group]) => {
              const count = getStoriesByCharacter(storiesData.stories, key).length;
              return (
                <button
                  key={key}
                  className={`character-tab ${selectedCharacter === key ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedCharacter(key);
                    setSelectedTheme('all');
                  }}
                >
                  {group.icon} {group.name} ({count})
                </button>
              );
            })}
          </div>

          {/* Secondary Filters */}
          <div className="secondary-filters">
            <select
              value={selectedThemeCategory}
              onChange={(e) => setSelectedThemeCategory(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Theme Categories</option>
              {Object.entries(THEME_CATEGORIES).map(([key, category]) => (
                <option key={key} value={key}>
                  {category.icon} {category.name}
                </option>
              ))}
            </select>

            <select
              value={selectedReadingTime}
              onChange={(e) => setSelectedReadingTime(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Reading Times</option>
              {Object.entries(READING_TIME_GROUPS).map(([key, group]) => (
                <option key={key} value={key}>
                  {group.icon} {group.name}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Access Tabs */}
          <div className="quick-tabs">
            <button
              className={`tab ${selectedTheme === 'favorites' ? 'active' : ''}`}
              onClick={() => {
                setSelectedTheme('favorites');
                setSelectedCharacter('all');
                setSelectedThemeCategory('all');
                setSelectedReadingTime('all');
              }}
            >
              ❤️ Favorites ({favorites.length})
            </button>
            <button
              className={`tab ${selectedTheme === 'recent' ? 'active' : ''}`}
              onClick={() => {
                setSelectedTheme('recent');
                setSelectedCharacter('all');
                setSelectedThemeCategory('all');
                setSelectedReadingTime('all');
              }}
            >
              ✓ Recently Read ({readStories.length})
            </button>
          </div>

          {/* Story Grid */}
          <div className="story-grid">
            {getFilteredStories().map((story, index) => {
              const storyIndex = storiesData.stories.findIndex(s => s.id === story.id);
              const isRead = readStories.includes(story.id);
              const isFavorite = isStoryFavorited(story.id);

              return (
                <div
                  key={story.id}
                  className={`story-card-preview ${isRead ? 'read' : ''}`}
                  onClick={() => goToStory(storyIndex)}
                >
                  <div className="story-card-content">
                    <h3>{story.title}</h3>
                    <p className="story-hook-preview">{story.hook}</p>
                    <div className="story-meta">
                      <span className="reading-time">{story.readingTime} min</span>
                      <span className="story-themes">
                        {story.themes.slice(0, 2).join(', ')}
                      </span>
                    </div>
                  </div>
                  <div className="story-indicators">
                    {isFavorite && <span className="favorite-indicator">❤️</span>}
                    {isRead && <span className="read-indicator">✓</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'} font-${fontSize}`}>
      {/* Progress Bar */}
      <div className="progress-container">
        <div
          className="progress-bar"
          style={{ width: `${((currentStory + 1) / storiesData.stories.length) * 100}%` }}
        ></div>
      </div>

      {/* Progress Text */}
      <div className="progress-text">
        Story {currentStory + 1} of {storiesData.stories.length}
      </div>

      {/* Controls */}
      <div className="controls">
        <button
          className="control-button"
          onClick={() => setShowStoryList(!showStoryList)}
          title="Story List"
        >
          📚
        </button>
        <button
          className="control-button"
          onClick={() => toggleFavorite(currentStoryData.id)}
          title="Toggle favorite"
        >
          {isStoryFavorited(currentStoryData.id) ? '❤️' : '🤍'}
        </button>
        <button
          className="control-button"
          onClick={() => setDarkMode(!darkMode)}
          title="Toggle theme"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
        <button
          className="control-button"
          onClick={() => {
            const sizes = ['small', 'medium', 'large', 'xlarge'];
            const nextIndex = (sizes.indexOf(fontSize) + 1) % sizes.length;
            setFontSize(sizes[nextIndex]);
          }}
          title="Font size"
        >
          Aa
        </button>
      </div>

      {/* Story Content */}
      <div className="story-content">
        <div className="story-card">
          <h1 className="story-title">{currentStoryData.title}</h1>
          <div className="story-hook">{currentStoryData.hook}</div>

          {currentStoryData.paragraphs.map((paragraph, index) => (
            <div key={index} className="story-paragraph">
              {paragraph}
            </div>
          ))}

          <div className="story-ending">{currentStoryData.ending}</div>
        </div>
      </div>

      {/* Navigation */}
      <div className="navigation">
        <button
          className="nav-button"
          disabled={currentStory === 0}
          onClick={() => setCurrentStory(currentStory - 1)}
        >
          Previous
        </button>
        <button
          className="nav-button"
          disabled={currentStory === storiesData.stories.length - 1}
          onClick={() => setCurrentStory(currentStory + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;

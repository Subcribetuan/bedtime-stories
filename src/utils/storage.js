// LocalStorage utility functions for bedtime stories app

const STORAGE_KEYS = {
  READ_STORIES: 'bedtime_read_stories',
  LAST_POSITION: 'bedtime_last_position',
  FAVORITES: 'bedtime_favorites',
  USER_PREFERENCES: 'bedtime_preferences',
  READING_DATES: 'bedtime_reading_dates'
};

// Helper function to safely parse JSON from localStorage
const safeParseJSON = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error parsing localStorage key ${key}:`, error);
    return defaultValue;
  }
};

// Helper function to safely stringify and save to localStorage
const safeSaveJSON = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error saving to localStorage key ${key}:`, error);
    return false;
  }
};

// Read Stories Management
export const getReadStories = () => {
  return safeParseJSON(STORAGE_KEYS.READ_STORIES, []);
};

export const markStoryAsRead = (storyId) => {
  const readStories = getReadStories();
  if (!readStories.includes(storyId)) {
    readStories.push(storyId);
    safeSaveJSON(STORAGE_KEYS.READ_STORIES, readStories);
  }
};

export const markStoryAsUnread = (storyId) => {
  const readStories = getReadStories();
  const updatedStories = readStories.filter(id => id !== storyId);
  safeSaveJSON(STORAGE_KEYS.READ_STORIES, updatedStories);
};

export const isStoryRead = (storyId) => {
  const readStories = getReadStories();
  return readStories.includes(storyId);
};

// Last Position Management
export const getLastStoryPosition = () => {
  return safeParseJSON(STORAGE_KEYS.LAST_POSITION, { storyId: 0, paragraphIndex: 0 });
};

export const saveLastStoryPosition = (storyId, paragraphIndex = 0) => {
  safeSaveJSON(STORAGE_KEYS.LAST_POSITION, { storyId, paragraphIndex });
};

// Favorites Management
export const getFavorites = () => {
  return safeParseJSON(STORAGE_KEYS.FAVORITES, []);
};

export const addToFavorites = (storyId) => {
  const favorites = getFavorites();
  if (!favorites.includes(storyId)) {
    favorites.push(storyId);
    safeSaveJSON(STORAGE_KEYS.FAVORITES, favorites);
  }
};

export const removeFromFavorites = (storyId) => {
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter(id => id !== storyId);
  safeSaveJSON(STORAGE_KEYS.FAVORITES, updatedFavorites);
};

export const isStoryFavorited = (storyId) => {
  const favorites = getFavorites();
  return favorites.includes(storyId);
};

// User Preferences Management
export const getUserPreferences = () => {
  return safeParseJSON(STORAGE_KEYS.USER_PREFERENCES, {
    darkMode: true,
    fontSize: 'medium',
    autoPlay: false,
    soundEnabled: true,
    readingSpeed: 'normal'
  });
};

export const saveUserPreferences = (preferences) => {
  const currentPrefs = getUserPreferences();
  const updatedPrefs = { ...currentPrefs, ...preferences };
  safeSaveJSON(STORAGE_KEYS.USER_PREFERENCES, updatedPrefs);
};

export const updatePreference = (key, value) => {
  const preferences = getUserPreferences();
  preferences[key] = value;
  safeSaveJSON(STORAGE_KEYS.USER_PREFERENCES, preferences);
};

// Reading Dates Management (for tracking which child read what when)
export const getReadingDates = () => {
  return safeParseJSON(STORAGE_KEYS.READING_DATES, {});
};

export const recordReadingDate = (childName, storyId) => {
  const readingDates = getReadingDates();
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

  if (!readingDates[childName]) {
    readingDates[childName] = {};
  }

  if (!readingDates[childName][storyId]) {
    readingDates[childName][storyId] = [];
  }

  // Only add if not already recorded today
  if (!readingDates[childName][storyId].includes(today)) {
    readingDates[childName][storyId].push(today);
  }

  safeSaveJSON(STORAGE_KEYS.READING_DATES, readingDates);
};

export const getChildReadingHistory = (childName) => {
  const readingDates = getReadingDates();
  return readingDates[childName] || {};
};

export const getStoryReadingDates = (childName, storyId) => {
  const readingDates = getReadingDates();
  return readingDates[childName]?.[storyId] || [];
};

// Statistics and Analytics
export const getReadingStats = () => {
  const readStories = getReadStories();
  const favorites = getFavorites();
  const readingDates = getReadingDates();

  const totalChildren = Object.keys(readingDates).length;
  const totalReadSessions = Object.values(readingDates)
    .reduce((total, child) => {
      return total + Object.values(child).reduce((childTotal, dates) => {
        return childTotal + dates.length;
      }, 0);
    }, 0);

  return {
    totalStoriesRead: readStories.length,
    totalFavorites: favorites.length,
    totalChildren,
    totalReadSessions
  };
};

// Utility function to clear all data (for reset functionality)
export const clearAllData = () => {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
};

// Export/Import functionality for backup
export const exportData = () => {
  const data = {};
  Object.entries(STORAGE_KEYS).forEach(([name, key]) => {
    data[name] = safeParseJSON(key, null);
  });
  return data;
};

export const importData = (data) => {
  Object.entries(STORAGE_KEYS).forEach(([name, key]) => {
    if (data[name] !== undefined) {
      safeSaveJSON(key, data[name]);
    }
  });
};
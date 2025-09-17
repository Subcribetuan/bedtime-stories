// Story grouping and filtering utilities

export const THEME_CATEGORIES = {
  'learning-discovery': {
    name: 'Learning & Discovery',
    icon: '🔍',
    themes: [
      'curiosity', 'wonder', 'discovery', 'exploration', 'learning',
      'love-of-learning', 'scientific-thinking', 'critical-thinking',
      'observation', 'investigation', 'questions', 'questioning',
      'learning-everywhere', 'knowledge', 'experimentation'
    ]
  },
  'emotions-feelings': {
    name: 'Emotions & Feelings',
    icon: '💗',
    themes: [
      'emotional-awareness', 'emotional-regulation', 'emotional-acceptance',
      'emotional-processing', 'emotional-validation', 'feelings',
      'feelings-identification', 'self-compassion', 'self-acceptance',
      'emotional-intelligence', 'emotional-expression', 'emotion-acceptance'
    ]
  },
  'family-relationships': {
    name: 'Family & Relationships',
    icon: '👨‍👩‍👧‍👦',
    themes: [
      'family-connection', 'father-bond', 'brotherhood', 'unconditional-love',
      'family-traditions', 'family-history', 'parent-child-bond',
      'sibling-cooperation', 'love-connection', 'attachment', 'forever-love',
      'love-security', 'family-unity', 'forever-bonds'
    ]
  },
  'kindness-compassion': {
    name: 'Kindness & Compassion',
    icon: '🤗',
    themes: [
      'compassion', 'kindness', 'empathy', 'helping-others', 'helping',
      'cooperation', 'sharing', 'generosity', 'caring-hearts', 'good deeds',
      'power-of-kindness', 'understanding-others', 'foster-compassion',
      'gentle-guidance', 'gentleness'
    ]
  },
  'courage-resilience': {
    name: 'Courage & Resilience',
    icon: '💪',
    themes: [
      'bravery', 'courage', 'facing-fears', 'resilience', 'persistence',
      'inner-strength', 'strength', 'courage-building', 'confidence',
      'self-confidence', 'building-confidence', 'growth-mindset',
      'mistakes-as-learning', 'learning-from-mistakes'
    ]
  },
  'mindfulness-calm': {
    name: 'Mindfulness & Calm',
    icon: '🧘',
    themes: [
      'mindfulness', 'calm', 'calmness', 'inner-peace', 'present-moment',
      'breathing-techniques', 'breathing', 'calming-techniques',
      'stress-management', 'bedtime-comfort', 'sleep-preparation',
      'sleep', 'bedtime-routine', 'anxiety-management', 'worry-management'
    ]
  },
  'problem-solving': {
    name: 'Problem Solving',
    icon: '🧩',
    themes: [
      'problem-solving', 'solutions', 'resourcefulness', 'critical-thinking',
      'cognitive-flexibility', 'cognitive-reframing', 'creative-expression',
      'creativity', 'innovation', 'teamwork', 'collaboration'
    ]
  },
  'adventure-fun': {
    name: 'Adventure & Fun',
    icon: '🎈',
    themes: [
      'adventure', 'excitement', 'joy', 'imagination', 'magic',
      'dreams', 'storytelling', 'art', 'creative-expression',
      'treasure-hunting', 'anticipation', 'celebration'
    ]
  },
  'act-therapy': {
    name: 'ACT Therapy Stories',
    icon: '🧘',
    themes: [
      'ACT-principles', 'emotional-acceptance', 'cognitive-defusion',
      'present-moment', 'values-based-action', 'psychological-flexibility',
      'mindfulness', 'acceptance', 'commitment'
    ]
  },
  'cbt-therapy': {
    name: 'CBT Therapy Stories',
    icon: '🧠',
    themes: [
      'CBT-techniques', 'cognitive-reframing', 'thought-awareness',
      'problem-solving', 'coping', 'behavioral-activation',
      'cognitive-restructuring', 'emotional-regulation', 'skills-building'
    ]
  },
  'daddy-stories': {
    name: 'Daddy Stories',
    icon: '👨‍🔧',
    themes: [
      'father-bond', 'daddy', 'father-child', 'paternal', 'dad',
      'masculine-nurturing', 'father-guidance', 'father-love'
    ],
    titleKeywords: ['daddy', 'father', "daddy's", 'tool', 'drill', 'buzzy', 'workshop']
  },
  'mummy-stories': {
    name: 'Mummy Stories',
    icon: '👩‍👦',
    themes: [
      'mother-bond', 'mama', 'mummy', 'mother-child', 'maternal',
      'mother-love', 'nurturing', 'mother-guidance', 'mother-care'
    ],
    titleKeywords: ['mama', 'mummy', 'mother', "mama's", "mummy's"]
  },
  'uncle-stories': {
    name: 'Uncle John Stories',
    icon: '👨‍🎓',
    themes: [
      'uncle-bond', 'uncle', 'uncle-nephew', 'extended-family',
      'uncle-guidance', 'uncle-adventures', 'mentor-relationship'
    ],
    titleKeywords: ['uncle john', 'uncle']
  },
  'aunty-cindy-stories': {
    name: 'Aunty Cindy Stories',
    icon: '👩‍🎨',
    themes: [
      'aunt-bond', 'aunty', 'aunt-nephew', 'aunt-guidance',
      'aunty-adventures', 'creative-aunt', 'caring-aunt'
    ],
    titleKeywords: ['aunty cindy', 'aunty', 'aunt']
  },
  'yay-yay-stories': {
    name: "Yay Yay's Stories",
    icon: '👵💕',
    themes: [
      'grandparent-bond', 'grandma', 'grandpa', 'yay-yay', 'grandmother',
      'grandfather', 'wisdom', 'generational-love', 'elder-guidance',
      'Memory Making', 'Forever Bonds', 'Love Security'
    ],
    titleKeywords: ['yay yay', 'grandma yay yay', 'grandmother', 'grandma']
  }
};

export const CHARACTER_GROUPS = {
  'benjamin': {
    name: 'Ages 2-3 years',
    description: 'Gentle adventures for toddlers',
    icon: '🧸',
    ageRange: '2-3 years'
  },
  'christopher': {
    name: 'Ages 4-5 years',
    description: 'Curious preschool explorations',
    icon: '🚀',
    ageRange: '4-5 years'
  },
  'family': {
    name: 'Ages 2-5 years',
    description: 'Perfect when siblings listen together',
    icon: '👨‍👩‍👧‍👦',
    ageRange: '2-5 years'
  },
  'general': {
    name: 'Flexible Ages',
    description: 'Universal themes for any listener',
    icon: '⭐',
    ageRange: 'Any age'
  }
};

export const READING_TIME_GROUPS = {
  'short': {
    name: 'Quick Stories',
    description: '2-3 minutes',
    icon: '⚡',
    maxTime: 3
  },
  'medium': {
    name: 'Medium Stories',
    description: '4-5 minutes',
    icon: '📖',
    minTime: 3.1,
    maxTime: 5
  },
  'long': {
    name: 'Longer Stories',
    description: '6+ minutes',
    icon: '📚',
    minTime: 5.1
  }
};

// Helper functions for filtering
export const getStoriesByCharacter = (stories, character) => {
  switch (character) {
    case 'benjamin':
      return stories.filter(s => {
        const levels = s.ageLevel || [];
        return levels.includes('2-3 years');
      });
    case 'christopher':
      return stories.filter(s => {
        const levels = s.ageLevel || [];
        return levels.includes('4-5 years');
      });
    case 'family':
      return stories.filter(s => {
        const levels = s.ageLevel || [];
        return levels.includes('2-5 years') || levels.includes('2-4 years');
      });
    case 'general':
      return stories.filter(s => {
        const levels = s.ageLevel || [];
        return levels.length === 0 || (!levels.includes('2-3 years') && !levels.includes('4-5 years') && !levels.includes('2-5 years') && !levels.includes('2-4 years'));
      });
    default:
      return stories;
  }
};

export const getStoriesByThemeCategory = (stories, category) => {
  if (!THEME_CATEGORIES[category]) return stories;
  const categoryData = THEME_CATEGORIES[category];
  const categoryThemes = categoryData.themes;
  const titleKeywords = categoryData.titleKeywords || [];

  return stories.filter(story => {
    // Check if story has matching themes
    const hasMatchingTheme = story.themes && story.themes.some(theme => categoryThemes.includes(theme));

    // Check if story title contains relevant keywords
    const hasMatchingTitle = titleKeywords.some(keyword =>
      story.title.toLowerCase().includes(keyword.toLowerCase())
    );

    // Special case for Aunty Cindy stories - also check hook content
    if (category === 'aunty-cindy-stories') {
      const hasAuntyCindyInHook = story.hook && story.hook.toLowerCase().includes('aunty cindy');
      return hasMatchingTheme || hasMatchingTitle || hasAuntyCindyInHook;
    }

    // Special filtering to prevent overlap between daddy and mummy stories
    if (category === 'mummy-stories') {
      // Only include if it has mummy/mama/mother keywords, not daddy keywords
      const isDaddyStory = story.title.toLowerCase().includes('daddy') || story.title.toLowerCase().includes('father');
      if (isDaddyStory) return false;
    }

    if (category === 'daddy-stories') {
      // Include daddy stories and power tool stories, but exclude mummy stories
      const isMummyStory = story.title.toLowerCase().includes('mummy') || story.title.toLowerCase().includes('mama');
      if (isMummyStory) return false;
    }

    return hasMatchingTheme || hasMatchingTitle;
  });
};

export const getStoriesByReadingTime = (stories, timeGroup) => {
  if (!READING_TIME_GROUPS[timeGroup]) return stories;
  const { minTime = 0, maxTime = Infinity } = READING_TIME_GROUPS[timeGroup];

  return stories.filter(story => {
    const readingTime = story.readingTime || (story.wordCount || 400) / 100;
    return readingTime >= minTime && readingTime <= maxTime;
  });
};

export const getStoryStats = (stories) => {
  const characterCounts = {};
  Object.keys(CHARACTER_GROUPS).forEach(char => {
    characterCounts[char] = getStoriesByCharacter(stories, char).length;
  });

  const themeCategoryCounts = {};
  Object.keys(THEME_CATEGORIES).forEach(cat => {
    themeCategoryCounts[cat] = getStoriesByThemeCategory(stories, cat).length;
  });

  const readingTimeCounts = {};
  Object.keys(READING_TIME_GROUPS).forEach(time => {
    readingTimeCounts[time] = getStoriesByReadingTime(stories, time).length;
  });

  return {
    total: stories.length,
    byCharacter: characterCounts,
    byThemeCategory: themeCategoryCounts,
    byReadingTime: readingTimeCounts
  };
};


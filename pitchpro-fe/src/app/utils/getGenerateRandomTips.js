

export function generateRandomTip(category) {
  const tips = {
    pace: ["Vary your pace to emphasize key points.", "Pause for effect or before/after important ideas.", "Practice with a timer to find your natural rhythm."],
    intonation: ["Use upward intonation for questions.", "Use downward intonation for statements and conclusions.", "Avoid monotone, it makes you sound bored."],
    articulation: ["Open your mouth properly when speaking.", "Warm up your mouth with tongue twisters before speaking.", "Avoid slurring, mumbling, or running words together."],
    "word-choice": ["Know your audience, use familiar and appropriate language.", "Avoid jargon unless it’s explained clearly.", "Use vivid, active words to create mental images."],
  };

  const categoryTips = tips[category] || [];
  if (categoryTips.length === 0) return "No tips available.";

  const randomIndex = Math.floor(Math.random() * categoryTips.length);
  return categoryTips[randomIndex];
}

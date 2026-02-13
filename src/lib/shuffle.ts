export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function shuffleWithCorrectTracking(
  options: string[],
  correctIndex: number
): { options: string[]; correctIndex: number } {
  const correctAnswer = options[correctIndex];
  const shuffled = shuffle(options);
  const newCorrectIndex = shuffled.indexOf(correctAnswer);
  return { options: shuffled, correctIndex: newCorrectIndex };
}

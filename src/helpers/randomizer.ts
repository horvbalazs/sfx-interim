const randomizer = (source: string[], chance: number): string | null => {
  const random = source[Math.floor(Math.random() * source.length)];
  return Math.random() <= chance ? random : null;
};

export default randomizer;

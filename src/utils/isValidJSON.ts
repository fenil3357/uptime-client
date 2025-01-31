const isValidJsonObject = (value: string): boolean => {
  if (typeof value !== 'string') return false;
  try {
    const parsed = JSON.parse(value);
    return parsed !== null && typeof parsed === 'object' && !Array.isArray(parsed);
  } catch {
    return false;
  }
}

export default isValidJsonObject;
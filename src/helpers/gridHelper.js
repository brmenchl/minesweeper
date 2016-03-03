export const count = (width) => {
  return Math.pow(width,2);
}

export const upIndex = (index, width) => {
  if(index >= count(width)) return undefined;
  if(index < width) return undefined;
  return index - width;
}

export const downIndex = (index, width) => {
  if(index < 0) return undefined;
  if(index >= count(width) - width) return undefined;
  return index + width;
}

export const leftIndex = (index, width) => {
  if(index < 0 || index >= count(width)) return undefined;
  if(index % width === 0) return undefined;
  return index - 1;
}

export const rightIndex = (index, width) => {
  if(index < 0 || index >= count(width)) return undefined;
  if((index + 1) % width === 0) return undefined;
  return index + 1;
}

/* eslint-disable import/prefer-default-export */
export const optimumBoardSize = ({ height, width }, heightOffset = 0) => {
  const widthOffset = width > 480 ? 64 : 32;
  const effectiveMaxHeight = height - heightOffset;
  const effectiveMaxWidth = width - widthOffset;

  return Math.min(effectiveMaxHeight, effectiveMaxWidth) || 0;
};

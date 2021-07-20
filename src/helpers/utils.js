const getChildIndex = (item) => {
  const parent = item.parentNode;
  return Array.prototype.indexOf.call(parent.children, item);
};

const parsePosition = (position) => {
  const index = position.indexOf("px");
  return Number(position.slice(0, index));
};

export { getChildIndex, parsePosition };

export const extractTagsFromText = input => {
  const split = input.split("$%T");

  if (split.length === 1) {
    return {
      text: split[0],
      tags: []
    };
  }

  return {
    text: split[0],
    tags: split[1].split(",").map(tag => tag.trim())
  };
};

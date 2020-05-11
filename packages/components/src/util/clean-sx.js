const cleanSx = sx => {
  return Object.entries(sx).reduce((acc, [key, value]) => {
    if (value !== undefined) {
      return {...acc, [key]: value};
    }

    return acc;
  }, {});  
};

export default cleanSx;

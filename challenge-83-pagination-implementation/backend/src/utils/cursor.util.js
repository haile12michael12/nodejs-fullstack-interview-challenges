const encodeCursor = (id) => {
  if (!id) return null;
  return Buffer.from(id.toString()).toString('base64');
};

const decodeCursor = (cursor) => {
  if (!cursor) return null;
  try {
    return parseInt(Buffer.from(cursor, 'base64').toString('ascii'));
  } catch (error) {
    return null;
  }
};

const createCursors = (items, total, limit) => {
  if (!items || items.length === 0) {
    return {
      hasNextPage: false,
      hasPreviousPage: false,
    };
  }

  const firstItem = items[0];
  const lastItem = items[items.length - 1];
  
  const hasNextPage = lastItem.id < total;
  const hasPreviousPage = firstItem.id > 1;
  
  const cursors = {
    hasNextPage,
    hasPreviousPage,
  };
  
  if (hasNextPage) {
    cursors.endCursor = encodeCursor(lastItem.id);
  }
  
  if (hasPreviousPage) {
    cursors.startCursor = encodeCursor(firstItem.id);
  }
  
  return cursors;
};

module.exports = {
  encodeCursor,
  decodeCursor,
  createCursors,
};
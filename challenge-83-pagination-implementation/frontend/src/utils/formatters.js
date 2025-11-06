export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString();
};

export const formatNumber = (num) => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

export const createPaginationRange = (currentPage, totalPages, maxPages = 5) => {
  const half = Math.floor(maxPages / 2);
  let start = Math.max(1, currentPage - half);
  let end = Math.min(totalPages, currentPage + half);
  
  if (end - start + 1 < maxPages) {
    if (start === 1) {
      end = Math.min(totalPages, start + maxPages - 1);
    } else {
      start = Math.max(1, end - maxPages + 1);
    }
  }
  
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};
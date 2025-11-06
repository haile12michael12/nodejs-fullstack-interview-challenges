import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePagination } from '../../hooks/usePagination';
import ItemList from '../../components/ItemList';
import PaginationControls from '../../components/Pagination/PaginationControls';
import PageSizeSelector from '../../components/Pagination/PageSizeSelector';

const ItemPage = () => {
  const { page: pageParam } = useParams();
  const navigate = useNavigate();
  const pageNumber = parseInt(pageParam) || 1;
  
  const {
    data: items,
    meta,
    loading,
    error,
    limit,
    goToPage,
    changeLimit,
  } = usePagination(pageNumber, 10);

  const handlePageChange = (newPage) => {
    navigate(`/items/${newPage}`);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Items - Page {pageNumber}</h1>
          <p className="mt-1 text-sm text-gray-500">
            Browse through paginated items (URL-based pagination)
          </p>
        </div>

        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Item List</h2>
              <PageSizeSelector
                currentLimit={limit}
                onLimitChange={changeLimit}
              />
            </div>

            <ItemList items={items} loading={loading} error={error} />

            {meta && (
              <PaginationControls
                currentPage={meta.page}
                totalPages={meta.totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
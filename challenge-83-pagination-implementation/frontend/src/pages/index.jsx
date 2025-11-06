import React from 'react';
import { usePagination } from '../hooks/usePagination';
import ItemList from '../components/ItemList';
import PaginationControls from '../components/Pagination/PaginationControls';
import PageSizeSelector from '../components/Pagination/PageSizeSelector';

const HomePage = () => {
  const {
    data: items,
    meta,
    loading,
    error,
    page,
    limit,
    goToPage,
    changeLimit,
  } = usePagination(1, 10);

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Items</h1>
          <p className="mt-1 text-sm text-gray-500">
            Browse through paginated items
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
                onPageChange={goToPage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
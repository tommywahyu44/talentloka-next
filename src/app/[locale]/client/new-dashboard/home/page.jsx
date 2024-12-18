'use client'

import ModelCard from '@/components/card/ModelCard.jsx'
import FilterDrawer from '@/components/screen/dashboard/client/FilterDrawer.jsx'
import { useModels } from '@/hooks/useModels'
import localStorageService from '@/utils/localStorageService'
import { ChevronLeft, ChevronRight, Filter, Search } from 'lucide-react'
import React, { useMemo, useState } from 'react'

const ITEMS_PER_PAGE = 20

const NewDashboard = () => {
  const email = localStorageService.getEmailClient()
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState({})
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const { models, loading, error } = useModels()

  const filteredModels = useMemo(() => {
    return models.filter((model) => {
      // Search filter
      const searchMatch =
        searchQuery === '' ||
        model.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.city?.toLowerCase().includes(searchQuery.toLowerCase())

      if (!searchMatch) return false

      // Apply filters
      const matchGender =
        !filters.gender || model.gender?.toLowerCase() === filters.gender.toLowerCase()

      const matchCity = !filters.city || model.city?.toLowerCase() === filters.city.toLowerCase()

      const matchEthnic =
        !filters.ethnic || model.ethnic?.toLowerCase() === filters.ethnic.toLowerCase()

      const matchCountry =
        !filters.country || model.country?.toLowerCase() === filters.country.toLowerCase()

      const matchRole = !filters.role || model.role?.toLowerCase() === filters.role.toLowerCase()

      const matchIndustry =
        !filters.industry?.length ||
        (model.industry &&
          filters.industry.some((ind) =>
            model.industry.map((i) => i?.toLowerCase()).includes(ind.toLowerCase())
          ))

      const matchProductField =
        !filters.product_field?.length ||
        (model.product_field &&
          filters.product_field.some((field) =>
            model.product_field.map((f) => f?.toLowerCase()).includes(field.toLowerCase())
          ))

      return (
        matchGender &&
        matchCity &&
        matchEthnic &&
        matchCountry &&
        matchRole &&
        matchIndustry &&
        matchProductField
      )
    })
  }, [models, filters, searchQuery])

  // Pagination
  const totalPages = Math.ceil(filteredModels.length / ITEMS_PER_PAGE)
  const paginatedModels = filteredModels.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handleFiltersApply = (newFilters) => {
    setFilters(newFilters)
    setIsFilterOpen(false)
    setCurrentPage(1)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderPaginationNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    // Always show first page
    pages.push(1)

    if (currentPage > 3) {
      pages.push('...')
    }

    // Show pages around current page
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i)
    }

    if (currentPage < totalPages - 2) {
      pages.push('...')
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages)
    }

    return pages
  }

  return (
    <div className="sm:px-6">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 px-4 pt-2">
        <div className="flex flex-row items-center justify-between gap-4">
          <div className="relative w-full flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 transform text-gray-400"
              size={20}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search talents by industry, product field or location..."
              className="w-full rounded-xl border border-gray-200 bg-white/60 py-3 pl-12 pr-4 text-gray-800 transition-all focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-50"
            />
          </div>

          <Filter
            onClick={() => setIsFilterOpen(true)}
            size={20}
            className="flex text-rose-600 md:hidden"
          />
          <button
            onClick={() => setIsFilterOpen(true)}
            className="hidden items-center gap-2 rounded-xl bg-rose-50 px-6 py-3 text-rose-600 transition-colors hover:bg-rose-100 md:flex">
            <Filter size={20} />
            <span>
              Filters {Object.keys(filters).length > 0 && `(${Object.keys(filters).length})`}
            </span>
          </button>
        </div>
      </div>

      {error && <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-600">{error}</div>}

      {/* Model Grid */}
      <div className="mt-6 grid grid-cols-2 gap-4 px-4 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {loading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="aspect-[3/4] animate-pulse rounded-xl bg-gray-100"
            />
          ))
        ) : paginatedModels.length === 0 ? (
          <div className="col-span-full py-12 text-center">
            <p className="text-gray-500">No talents found matching your criteria</p>
          </div>
        ) : (
          paginatedModels.map((model) => (
            <ModelCard
              key={model.id}
              model={model}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      {filteredModels.length > 0 && (
        <div className="mb-8 mt-8 flex justify-center">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className="flex flex-row rounded-lg border border-gray-200 p-2 hover:bg-gray-50 disabled:opacity-50">
              <ChevronLeft size={20} />
              <ChevronLeft
                size={20}
                className="-ml-4"
              />
            </button>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="rounded-lg border border-gray-200 p-2 hover:bg-gray-50 disabled:opacity-50">
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
              {renderPaginationNumbers().map((page, index) => (
                <React.Fragment key={index}>
                  {page === '...' ? (
                    <span className="px-4 py-2">...</span>
                  ) : (
                    <button
                      onClick={() => handlePageChange(page)}
                      className={`min-w-[40px] rounded-lg border px-4 py-2 ${
                        currentPage === page
                          ? 'border-rose-500 bg-rose-500 text-white'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}>
                      {page}
                    </button>
                  )}
                </React.Fragment>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="rounded-lg border border-gray-200 p-2 hover:bg-gray-50 disabled:opacity-50">
              <ChevronRight size={20} />
            </button>
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className="flex flex-row rounded-lg border border-gray-200 p-2 hover:bg-gray-50 disabled:opacity-50">
              <ChevronRight size={20} />
              <ChevronRight
                size={20}
                className="-ml-4"
              />
            </button>
          </div>
        </div>
      )}

      {/* Filter Drawer */}
      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        initialFilters={filters}
        onApply={handleFiltersApply}
      />
    </div>
  )
}

export default NewDashboard

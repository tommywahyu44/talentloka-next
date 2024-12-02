import { useState, useEffect } from 'react'
import { X, ChevronDown, ChevronUp } from 'lucide-react'

const FilterDrawer = ({ isOpen, onClose, initialFilters, onApply }) => {
  const [expandedSection, setExpandedSection] = useState(null)
  const [selectedFilters, setSelectedFilters] = useState(initialFilters)

  useEffect(() => {
    setSelectedFilters(initialFilters)
  }, [initialFilters])

  const filters = [
    {
      name: 'Gender',
      key: 'gender',
      type: 'single',
      options: ['Male', 'Female'],
    },
    {
      name: 'City',
      key: 'city',
      type: 'single',
      options: ['Bali', 'Jakarta', 'Surabaya'],
    },
    {
      name: 'Ethnic',
      key: 'ethnic',
      type: 'single',
      options: ['Indonesian', 'Indonesian - Chinese'],
    },
    {
      name: 'Country',
      key: 'country',
      type: 'single',
      options: ['Indonesia', 'Singapore', 'Malaysia', 'Vietnam', 'Thailand'],
    },
    {
      name: 'Role',
      key: 'role',
      type: 'single',
      options: ['SPG', 'Model'],
    },
    {
      name: 'Industry',
      key: 'industry',
      type: 'multiple',
      options: [
        'Automotive',
        'Bank',
        'Baby / kids care',
        'Beauty tools',
        'Fashion',
        'Education',
        'Food and beverages',
        'Furniture',
        'Franchise',
        'Haircare',
        'Homecare',
        'Jewelry',
        'Make up',
        'Manufacturing goods',
        'Medicine / healthcare',
        'Perfume',
        'Skincare',
        'Sports',
        'Technology',
        'Tobacco / cigarettes',
        'Watches',
        'Wedding expo',
      ],
    },
    {
      name: 'Product Field',
      key: 'product_field',
      type: 'multiple',
      options: [
        'Bazaar',
        'Company Events / Expo / Exhibition',
        'Company Gathering',
        'Conference',
        'Exhibition',
        'Fair',
        'Fashion Week',
        'Festival',
        'Party Event',
        'Product Launching',
        'Seminar',
      ],
    },
  ]

  const toggleFilter = (category, option, type) => {
    setSelectedFilters((prev) => {
      if (type === 'single') {
        return {
          ...prev,
          [category]: prev[category] === option ? undefined : option,
        }
      } else {
        const current = prev[category] || []
        const updated = current.includes(option)
          ? current.filter((item) => item !== option)
          : [...current, option]
        return {
          ...prev,
          [category]: updated.length ? updated : undefined,
        }
      }
    })
  }

  const toggleSection = (name) => {
    setExpandedSection(expandedSection === name ? null : name)
  }

  const resetFilters = () => {
    setSelectedFilters({})
  }

  const handleApply = () => {
    // Remove undefined values before applying
    const cleanFilters = Object.entries(selectedFilters).reduce((acc, [key, value]) => {
      if (value !== undefined && (!Array.isArray(value) || value.length > 0)) {
        acc[key] = value
      }
      return acc
    }, {})

    onApply(cleanFilters)
  }

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/50 text-gray-800 transition-opacity ${
        isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      onClick={onClose}>
      <div
        className={`fixed right-0 top-0 h-screen w-full max-w-md transform bg-white transition-transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-xl font-semibold">Filters</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 transition-colors hover:bg-gray-100">
            <X size={24} />
          </button>
        </div>

        <div className="h-[calc(100vh-144px)] overflow-y-auto">
          {filters.map((filter) => (
            <div
              key={filter.name}
              className="border-b border-gray-100">
              <button
                onClick={() => toggleSection(filter.name)}
                className="flex w-full items-center justify-between p-4 hover:bg-gray-50">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{filter.name}</span>
                  {selectedFilters[filter.key] && (
                    <span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs text-rose-600">
                      {Array.isArray(selectedFilters[filter.key])
                        ? selectedFilters[filter.key].length
                        : '1'}
                    </span>
                  )}
                </div>
                {expandedSection === filter.name ? (
                  <ChevronUp
                    size={20}
                    className="text-gray-500"
                  />
                ) : (
                  <ChevronDown
                    size={20}
                    className="text-gray-500"
                  />
                )}
              </button>

              {expandedSection === filter.name && (
                <div className="bg-gray-50 p-4 pt-0">
                  <div className="flex flex-wrap gap-2">
                    {filter.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => toggleFilter(filter.key, option, filter.type)}
                        className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                          filter.type === 'single'
                            ? selectedFilters[filter.key] === option
                              ? 'border border-rose-200 bg-rose-100 text-rose-600'
                              : 'border border-gray-200 bg-white hover:border-rose-200 hover:bg-rose-50'
                            : (selectedFilters[filter.key] || []).includes(option)
                              ? 'border border-rose-200 bg-rose-100 text-rose-600'
                              : 'border border-gray-200 bg-white hover:border-rose-200 hover:bg-rose-50'
                        }`}>
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="absolute bottom-0 w-full border-t bg-white p-4">
          <div className="flex gap-4">
            <button
              className="flex-1 rounded-lg border border-gray-200 px-4 py-2 transition-colors hover:bg-gray-50"
              onClick={resetFilters}>
              Reset
            </button>
            <button
              className="flex-1 rounded-lg bg-gradient-to-r from-rose-500 to-rose-600 px-4 py-2 text-white transition-colors hover:from-rose-600 hover:to-rose-700"
              onClick={handleApply}>
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterDrawer

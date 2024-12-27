import clientFavoriteService from '@/services/clientFavoriteService'
import clsx from 'clsx'
import domtoimage from 'dom-to-image'
import { Calendar, ChevronLeft, ChevronRight, MapPin, Ruler, Weight, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const TalentDetailsModal = ({ isOpen, onClose, code, model, favorites, setListFavorites }) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [loadedImages, setLoadedImages] = useState(new Set())

  const getImages = () => {
    if (!model.profilePicture)
      return [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60',
      ]
    return Array.isArray(model.profilePicture) ? model.profilePicture : [model.profilePicture]
  }

  const images = getImages()

  useEffect(() => {
    const preloadImages = () => {
      images.forEach((src, index) => {
        const img = new Image()
        img.src = src
        img.onload = () => {
          setLoadedImages((prev) => new Set([...prev, index]))
        }
      })
    }
    preloadImages()
  }, [images])

  const handleImageNav = (direction) => {
    const newIndex =
      direction === 'prev'
        ? (selectedImage - 1 + images.length) % images.length
        : (selectedImage + 1) % images.length
    setSelectedImage(newIndex)
  }

  const downloadCompCard = () => {
    const node = document.getElementById('compcard')
    domtoimage
      .toPng(node)
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = `compcard-${model.code}-${model.name}.png`
        link.href = dataUrl
        link.click()
      })
      .catch((error) => {
        console.error('Error capturing image:', error)
      })
  }

  const handleFavorites = () => {
    if (favorites.includes(code)) {
      const newFavorites = clientFavoriteService.remove(code)
      setListFavorites(newFavorites)
    } else {
      const newFavorites = clientFavoriteService.add(code)
      setListFavorites(newFavorites)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className={clsx('fixed inset-0 z-50 overflow-y-auto bg-black/30 p-2')}
      onClick={onClose}>
      <div
        className="flex min-h-screen items-center justify-center"
        onClick={(e) => e.stopPropagation()}>
        <div
          id="compcard"
          className={clsx(
            favorites.includes(code) && 'border-8 border-rose-500/50',
            model.tier === 1 && !favorites.includes(code) && 'border-4 border-yellow-300/50',
            model.tier === 2 && !favorites.includes(code) && 'border-4 border-blue-500/50',
            model.tier === 3 && !favorites.includes(code) && 'border-4 border-gray-500/50',
            'relative w-full max-w-md overflow-hidden rounded-3xl bg-white p-2 shadow-2xl md:max-w-3xl'
          )}>
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-transparent to-rose-500/5" />

          <button
            onClick={onClose}
            className="absolute right-6 top-6 z-10 cursor-pointer rounded-full p-2 text-white transition-colors hover:bg-white/20 hover:text-gray-900 md:text-gray-600 lg:right-2 lg:top-2">
            <X className="h-6 w-6" />
          </button>

          <div className="relative grid gap-8 p-2 md:grid-cols-2 md:p-4">
            {/* Left Column - Images */}
            <div className="space-y-6">
              <div className="group relative aspect-[5/6] overflow-hidden rounded-2xl bg-gray-100">
                {/* Loading skeleton */}
                {!loadedImages.has(selectedImage) && (
                  <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200">
                    <div className="animate-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  </div>
                )}

                <img
                  src={images[selectedImage]}
                  alt={`${model.name} - ${selectedImage + 1}`}
                  className={`h-full w-full object-cover object-center transition-opacity duration-300 ${loadedImages.has(selectedImage) ? 'opacity-100' : 'opacity-0'}`}
                />

                {/* Navigation arrows */}
                <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleImageNav('prev')
                    }}
                    className="rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/50">
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleImageNav('next')
                    }}
                    className="rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/50">
                    <ChevronRight size={24} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square overflow-hidden rounded-xl transition-transform hover:scale-105 ${
                      selectedImage === index ? 'ring-2 ring-rose-500 ring-offset-2' : ''
                    }`}>
                    {!loadedImages.has(index) && (
                      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200">
                        <div className="animate-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      </div>
                    )}
                    <img
                      src={img}
                      alt={`${model.name} - Thumbnail ${index + 1}`}
                      className={`h-full w-full object-cover object-center transition-opacity duration-300 ${loadedImages.has(index) ? 'opacity-100' : 'opacity-0'}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="flex flex-col space-y-8">
              {/* Model ID and Name */}
              <div>
                <h2 className="bg-clip-text text-xl font-bold text-gray-900 md:text-4xl">
                  {model.name}
                </h2>
                <div className="mt-1 font-medium text-gray-800">{code}</div>
              </div>

              {/* Stats Grid */}
              <div className="grow">
                <div className="grid grid-cols-2 gap-6">
                  {model.dobYear && (
                    <div className="rounded-xl bg-white/50 p-2 backdrop-blur-sm transition-colors hover:bg-white/70 sm:p-4">
                      <div className="flex items-center gap-3">
                        <Calendar
                          size={20}
                          className="text-rose-500"
                        />
                        <div>
                          <div className="text-xs text-gray-500 sm:text-sm">Birth Year</div>
                          <div className="text-sm font-semibold text-gray-900 sm:text-base">
                            {model.dobYear}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {model.city && (
                    <div className="rounded-xl bg-white/50 p-2 backdrop-blur-sm transition-colors hover:bg-white/70 sm:p-4">
                      <div className="flex items-center gap-3">
                        <MapPin
                          size={20}
                          className="text-rose-500"
                        />
                        <div>
                          <div className="text-xs text-gray-500 sm:text-sm">Location</div>
                          <div className="text-sm font-semibold text-gray-900 sm:text-base">
                            {model.city}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {model.heightCm && (
                    <div className="rounded-xl bg-white/50 p-2 backdrop-blur-sm transition-colors hover:bg-white/70 sm:p-4">
                      <div className="flex items-center gap-3">
                        <Ruler
                          size={20}
                          className="text-rose-500"
                        />
                        <div>
                          <div className="text-xs text-gray-500 sm:text-sm">Height</div>
                          <div className="text-sm font-semibold text-gray-900 sm:text-base">
                            {model.heightCm} cm
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {model.weightKg && (
                    <div className="rounded-xl bg-white/50 p-2 backdrop-blur-sm transition-colors hover:bg-white/70 sm:p-4">
                      <div className="flex items-center gap-3">
                        <Weight
                          size={20}
                          className="text-rose-500"
                        />
                        <div>
                          <div className="text-xs text-gray-500 sm:text-sm">Weight</div>
                          <div className="text-sm font-semibold text-gray-900 sm:text-base">
                            {model.weightKg} kg
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-9 space-y-6 text-base text-gray-800 sm:text-sm">
                  <div>
                    <div className="pb-2">Categories</div>
                    {model.categories &&
                      model.categories.length > 0 &&
                      model.categories.map((category, index) => (
                        <span
                          key={index}
                          className="mr-1 rounded-full border border-rose-400/20 bg-rose-500/80 px-2 py-1 text-xs text-white backdrop-blur-sm sm:px-3 sm:text-sm">
                          {category.role}
                        </span>
                      ))}
                  </div>
                  <div>
                    <div className="pb-2">Industry</div>
                    {model.brands &&
                      model.brands.length > 0 &&
                      model.brands.map((brand, index) => (
                        <span
                          key={index}
                          className="mr-1 rounded-full border border-rose-400/20 bg-rose-500/80 px-2 py-1 text-xs text-white backdrop-blur-sm sm:px-3 sm:text-sm">
                          {brand}
                        </span>
                      ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-row space-x-2">
                {/* <button
                  onClick={() => downloadCompCard()}
                  className="w-full rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 px-4 py-2 text-sm text-white shadow-lg transition-colors hover:from-rose-600 hover:to-rose-700 hover:shadow-xl sm:px-8 sm:py-4">
                  Download
                </button> */}
                <button
                  onClick={() => handleFavorites()}
                  className={clsx(
                    favorites.includes(code)
                      ? 'border border-rose-500 bg-white text-rose-600'
                      : 'bg-gradient-to-r from-rose-500 to-rose-600 text-white',
                    'w-full rounded-xl px-4 py-2 text-sm shadow-sm transition-colors hover:from-rose-600 hover:to-rose-700 hover:shadow-xl sm:px-8 sm:py-4'
                  )}>
                  {favorites.includes(code) ? 'Remove -' : 'Hire +'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TalentDetailsModal

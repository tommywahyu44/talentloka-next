import TalentDetailsModal from '@/components/screen/dashboard/client/TalentDetailsModal'
import clientFavoriteService from '@/services/clientFavoriteService'
import { Favorite, FavoriteTwoTone, Straighten } from '@mui/icons-material'
import clsx from 'clsx'
import { Briefcase, Crown, MapPin } from 'lucide-react'
import { useState } from 'react'

const ModelCard = ({ code, model, favorites, setListFavorites }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const getProfileImage = () => {
    if (!model.profilePicture)
      return 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60'
    return Array.isArray(model.profilePicture) ? model.profilePicture[0] : model.profilePicture
  }

  const handleFavorites = (event) => {
    event.stopPropagation()
    if (favorites.includes(code)) {
      const newFavorites = clientFavoriteService.remove(code)
      setListFavorites(newFavorites)
    } else {
      const newFavorites = clientFavoriteService.add(code)
      setListFavorites(newFavorites)
    }
  }

  return (
    <>
      <div
        className={clsx(
          favorites.includes(code) && 'border-4 border-rose-500/80',
          model.tier === 1 && !favorites.includes(code) && 'border-4 border-yellow-300/50',
          // model.tier === 2 && !favorites.includes(code) && 'border-4 border-blue-500/50',
          // model.tier === 3 && !favorites.includes(code) && 'border-4 border-emerald-500/50',
          'group relative min-h-48 cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl sm:min-h-96'
        )}
        onClick={() => setIsModalOpen(true)}>
        <div className={clsx('absolute right-0 top-0 z-10 rotate-45 px-2 py-1.5')}>
          {favorites.includes(code) ? (
            <Favorite
              sx={{
                fontSize: '2rem',
              }}
              onClick={handleFavorites}
              className="text-rose-600 hover:text-rose-800 sm:h-8 sm:w-8"
              style={{ fill: 'currentColor' }}
            />
          ) : (
            <FavoriteTwoTone
              sx={{
                fontSize: '2rem',
              }}
              onClick={handleFavorites}
              className="text-rose-600 hover:text-rose-800 sm:h-8 sm:w-8"
              style={{ fill: 'currentColor' }}
            />
          )}
        </div>
        {model.tier === 1 && (
          <div className="absolute -right-2 top-0 z-10 rotate-45 px-12 py-1.5">
            <Crown
              className="h-5 w-5 animate-pulse text-yellow-300 sm:h-7 sm:w-7"
              style={{ fill: 'currentColor' }}
            />
          </div>
        )}
        {model.tier === 1 && (
          <div className="absolute -left-12 top-5 z-10 -rotate-45 bg-gradient-to-r from-yellow-300 to-yellow-400 px-12 py-0.5 sm:py-1.5">
            <div className="flex items-center justify-center gap-1 text-xs font-medium text-white sm:text-sm">
              Most Popular
            </div>
          </div>
        )}
        {/* {model.tier === 2 && (
          <div className="absolute -right-10 top-0 z-10 rotate-45 px-12 py-1.5">
            <Crown
              className="h-4 w-4 animate-pulse text-blue-500 sm:h-6 sm:w-6"
              style={{ fill: 'currentColor' }}
            />
          </div>
        )}
        {model.tier === 3 && (
          <div className="absolute -right-10 top-0 z-10 rotate-45 px-12 py-1.5">
            <Crown
              className="h-3 w-3 animate-pulse text-emerald-500 sm:h-4 sm:w-4"
              style={{ fill: 'currentColor' }}
            />
          </div>
        )} */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
          <img
            src={getProfileImage()}
            alt={model.name}
            className="h-full w-full object-cover object-center transition-all duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4">
          <h3 className="mb-1 text-base font-semibold text-white sm:text-lg md:text-xl">
            {model.name}
          </h3>

          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-white/90 sm:text-sm lg:text-base">
              <MapPin
                size={16}
                className="text-rose-300"
              />
              <span>{model.city}</span>
            </div>
            {model.brands && model.brands.length > 0 && (
              <span className="flex items-center gap-2 text-sm text-white/90">
                <Briefcase
                  size={14}
                  className="text-rose-300"
                />
                {model.brands[0]}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            {model.categories && model.categories.length > 0 && (
              <span className="rounded-full border border-rose-400/20 bg-rose-500/20 px-2 py-1 text-xs text-white backdrop-blur-sm sm:px-3 sm:text-sm">
                {model.categories[0].role}
              </span>
            )}
            {model.heightCm && (
              <span className="flex items-center gap-1 text-sm text-white/90">
                <Straighten
                  fontSize="small"
                  className="rotate-90 text-rose-300"
                />
                <span className="text-base">{model.heightCm}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      <TalentDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        code={code}
        model={model}
        favorites={favorites}
        setListFavorites={setListFavorites}
      />
    </>
  )
}

export default ModelCard

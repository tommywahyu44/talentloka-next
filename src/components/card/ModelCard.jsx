import TalentDetailsModal from '@/components/screen/dashboard/client/TalentDetailsModal'
import clsx from 'clsx'
import { Briefcase, Crown, MapPin } from 'lucide-react'
import { useState } from 'react'

const ModelCard = ({ model }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const getProfileImage = () => {
    if (!model.profilePicture)
      return 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60'
    return Array.isArray(model.profilePicture) ? model.profilePicture[0] : model.profilePicture
  }

  return (
    <>
      <div
        className={clsx(
          model.tier === 1 && 'border-4 border-yellow-300',
          model.tier === 2 && 'border-4 border-blue-500',
          model.tier === 3 && 'border-4 border-gray-500',
          'group relative min-h-48 cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl sm:min-h-96'
        )}
        onClick={() => setIsModalOpen(true)}>
        {model.tier === 1 && (
          <div className="absolute -right-10 top-0 z-10 rotate-45 px-12 py-1.5">
            <Crown
              className="h-6 w-6 animate-pulse text-yellow-300 sm:h-8 sm:w-8"
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
        {model.tier === 2 && (
          <div className="absolute -right-10 top-0 z-10 rotate-45 px-12 py-1.5">
            <Crown
              className="h-4 w-4 animate-pulse text-blue-500 sm:h-6 sm:w-6"
              style={{ fill: 'currentColor' }}
            />
          </div>
        )}
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

          <div className="mb-2 flex items-center gap-2 text-xs text-white/90 sm:text-sm lg:text-base">
            <MapPin
              size={16}
              className="text-rose-300"
            />
            <span>{model.city}</span>
          </div>

          <div className="flex items-center justify-between">
            {model.categories && model.categories.length > 0 && (
              <span className="rounded-full border border-rose-400/20 bg-rose-500/20 px-2 py-1 text-xs text-white backdrop-blur-sm sm:px-3 sm:text-sm">
                {model.categories[0].role}
              </span>
            )}
            {model.brands && model.brands.length > 0 && (
              <span className="flex items-center gap-1 text-sm text-white/90">
                <Briefcase
                  size={14}
                  className="text-rose-300"
                />
                {model.brands[0]}
              </span>
            )}
          </div>
        </div>
      </div>

      <TalentDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        model={model}
      />
    </>
  )
}

export default ModelCard

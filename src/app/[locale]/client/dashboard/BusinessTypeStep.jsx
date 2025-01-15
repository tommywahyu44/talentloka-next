import { AuthButton } from '@/components/button/AuthButton'
import OnboardingForm from '@/components/screen/dashboard/client/OnboardingForm'
import { Business, Storefront, Work } from '@mui/icons-material'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'

export const BusinessTypeStep = ({ businessType, handleBusinessTypeChange, email }) => {
  const t = useTranslations('default')

  const options = [
    {
      id: 'PT',
      label: 'clientOnboardingStep1CompanyType1Title',
      description: 'clientOnboardingStep1CompanyType1Description',
      icon: <Business className="h-6 w-6 text-rose-600" />,
    },
    {
      id: 'PP',
      label: 'clientOnboardingStep1CompanyType2Title',
      description: 'clientOnboardingStep1CompanyType2Description',
      icon: <Storefront className="h-6 w-6 text-rose-600" />,
    },
    {
      id: 'ID',
      label: 'clientOnboardingStep1CompanyType3Title',
      description: 'clientOnboardingStep1CompanyType3Description',
      icon: <Work className="h-6 w-6 text-rose-600" />,
    },
  ]

  return (
    <div className="h-full bg-white">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-20 text-center sm:mb-0 sm:w-full sm:max-w-2xl">
          {businessType.isSelected && (
            <div className="mt-16">
              <OnboardingForm
                email={email}
                businessType={businessType.selected}
                handleBusinessTypeChange={handleBusinessTypeChange}
              />
            </div>
          )}
          {!businessType.isSelected && (
            <div className="mt-14 sm:mt-[15vh]">
              <div className="mb-10 text-xl font-semibold leading-6 md:mb-14 lg:mb-20">
                <span
                  id="comments-description"
                  className="text-stone-700">
                  What type of business entity do you represent?
                </span>
              </div>
              <div className="space-y-3">
                {options.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => handleBusinessTypeChange(option.id, false)}
                    className={clsx(
                      'group flex cursor-pointer items-center rounded-lg border-2 px-16 py-10 transition-all',
                      businessType.selected === option.id
                        ? 'border-rose-500 bg-rose-50'
                        : 'border-stone-200 hover:border-rose-500 hover:bg-rose-50'
                    )}>
                    <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-rose-100">
                      {option.icon}
                    </div>
                    <label
                      htmlFor={`radio-business-${option.id}`}
                      className="ml-4 flex flex-col text-left">
                      <span className="block cursor-pointer text-sm font-medium leading-6 text-stone-900">
                        {t(option.label)}
                      </span>
                      <span className="block cursor-pointer text-xs text-stone-500">
                        {t(option.description)}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
              <AuthButton
                color="secondary"
                type="submit"
                marginTop={12}
                onClick={() => handleBusinessTypeChange(businessType.selected, true)}>
                {t('commonContinue')}
              </AuthButton>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

import { AuthButton } from '@/components/button/AuthButton'
import OnboardingForm from '@/components/screen/dashboard/client/OnboardingForm'
import { Business, Work } from '@mui/icons-material'
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
      id: 'ID',
      label: 'clientOnboardingStep1CompanyType3Title',
      description: 'clientOnboardingStep1CompanyType3Description',
      icon: <Work className="h-6 w-6 text-rose-600" />,
    },
  ]

  return (
    <div className="h-full bg-white">
      <div className="px-3 sm:px-6 lg:px-8">
        <div className="mx-auto text-center sm:w-full sm:max-w-2xl">
          {businessType.isSelected && (
            <OnboardingForm
              email={email}
              businessType={businessType.selected}
              handleBusinessTypeChange={handleBusinessTypeChange}
            />
          )}
          {!businessType.isSelected && (
            <div className="mt-14">
              <div className="mb-10 text-xl font-semibold leading-6 md:mb-14 lg:mb-20">
                <span
                  id="comments-description"
                  className="font-display text-slate-700">
                  What type of business entity do you represent?
                </span>
              </div>
              <div className="space-y-3">
                {options.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => handleBusinessTypeChange(option.id, false)}
                    className={clsx(
                      'group flex cursor-pointer items-center rounded-lg border-2 px-8 py-6 transition-all sm:px-16 sm:py-16',
                      businessType.selected === option.id
                        ? 'border-rose-500 bg-rose-50'
                        : 'border-slate-200 hover:border-rose-300'
                    )}>
                    <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-rose-100">
                      {option.icon}
                    </div>
                    <label
                      htmlFor={`radio-business-${option.id}`}
                      className="ml-4 flex flex-col text-left">
                      <span className="block cursor-pointer font-display text-sm font-medium leading-6 text-slate-900">
                        {t(option.label)}
                      </span>
                      <span className="block cursor-pointer text-xs text-slate-500">
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

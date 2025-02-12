import { PaperClipIcon } from '@heroicons/react/20/solid'
import { useTranslations } from 'next-intl'

export default function Profile({ email, userProfile }) {
  const t = useTranslations('default')
  return (
    <div className="px-4 pt-4 sm:px-6 lg:px-8">
      <div className="px-4 sm:px-0">
        <h1 className="text-base font-semibold leading-6 text-gray-900">{t('commonProfile')}</h1>
        <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">{t('clientDashboardProfileDescription')}</p>
      </div>
      <div className="mt-6">
        <dl className="grid grid-cols-1 sm:grid-cols-2">
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">{t('commonFullname')}</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:mt-2">{userProfile.name}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">{t('commonCompany')}</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:mt-2">{userProfile.company}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">{t('commonEmailAddress')}</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:mt-2">{email}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Nomor KTP</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:mt-2">{userProfile.directorIdCard}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">{t('commonAttachments')}</dt>
            <dd className="mt-2 text-sm text-gray-900">
              <ul
                role="list"
                className="divide-y divide-gray-100 rounded-md border border-gray-200">
                {userProfile.employerTaxId && (
                  <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm/6">
                    <div className="flex w-0 flex-1 items-center">
                      <PaperClipIcon
                        aria-hidden="true"
                        className="size-5 shrink-0 text-gray-400"
                      />
                      <div className="ml-4 flex min-w-0 flex-1 gap-2">
                        <span className="truncate font-medium">
                          {userProfile.employerTaxId}_npwp.pdf
                        </span>
                      </div>
                    </div>
                    <div className="ml-4 shrink-0">
                      <a
                        href={userProfile.employerTaxIdFile}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-rose-600 hover:text-rose-500">
                        Download
                      </a>
                    </div>
                  </li>
                )}
                {userProfile.singleBusinessNumber && (
                  <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm/6">
                    <div className="flex w-0 flex-1 items-center">
                      <PaperClipIcon
                        aria-hidden="true"
                        className="size-5 shrink-0 text-gray-400"
                      />
                      <div className="ml-4 flex min-w-0 flex-1 gap-2">
                        <span className="truncate font-medium">
                          {userProfile.singleBusinessNumber}_nib.pdf
                        </span>
                      </div>
                    </div>
                    <div className="ml-4 shrink-0">
                      <a
                        href={userProfile.singleBusinessNumberFile}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-rose-600 hover:text-rose-500">
                        Download
                      </a>
                    </div>
                  </li>
                )}
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

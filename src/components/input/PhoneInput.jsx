import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'
import { useCountries } from 'use-react-countries'

export default function PhoneInput({
  label,
  id,
  contact,
  onChange,
  selectedCountry,
  setSelectedCountry,
  errorEmptyMessage,
  isSubmit,
  isFullWidth = false,
}) {
  const allowedCountries = ['Indonesia', 'Thailand', 'Malaysia', 'Vietnam', 'Singapore']
  const { countries } = useCountries()
  return (
    <div className={isFullWidth ? 'sm:col-span-6' : 'sm:col-span-3'}>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-slate-900">
        {label}
      </label>
      <div className="flex items-center sm:col-span-3">
        <Menu
          as="div"
          className="relative mt-2 inline-block text-left">
          <div>
            <MenuButton
              id="dropdown-phone-button"
              data-dropdown-toggle="dropdown-phone"
              className="z-10 inline-flex w-full flex-shrink-0 items-center rounded-s-md border-0 bg-slate-800 px-3 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
              type="button">
              <img
                src={selectedCountry.flagUrl}
                alt={selectedCountry.name}
                className="h-5 w-5 rounded-full object-cover"
              />
              <span className="ml-2 text-sm text-white">{selectedCountry.countryCode}</span>
              <ChevronDownIcon
                className="group-transition ml-1 mr-3 h-5 w-5 flex-shrink-0 text-white duration-300 hover:text-rose-500"
                aria-hidden="true"
              />
            </MenuButton>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95">
            <MenuItems className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {countries
                  .filter((country) => allowedCountries.includes(country.name))
                  .map(({ name, flags, countryCallingCode }, index) => {
                    return (
                      <MenuItem key={index}>
                        <button
                          type="button"
                          className="inline-flex w-full px-2 py-1 text-sm text-slate-700 transition duration-300 hover:bg-slate-600 hover:text-white dark:text-slate-200 dark:transition"
                          role="menuitem"
                          onClick={() => {
                            setSelectedCountry({
                              name: name,
                              flagUrl: flags.svg,
                              countryCode: countryCallingCode,
                            })
                          }}>
                          <div className="inline-flex items-center text-sm text-white">
                            <img
                              src={flags.svg}
                              alt={name}
                              className="mr-2 h-5 w-5 rounded-full object-cover"
                            />{' '}
                            {name} <span className="ml-2">{countryCallingCode}</span>
                          </div>
                        </button>
                      </MenuItem>
                    )
                  })}
              </div>
            </MenuItems>
          </Transition>
        </Menu>
        <div className="relative mt-2 w-full">
          <input
            type="number"
            name={id}
            id={id}
            value={contact}
            onChange={onChange}
            className="block w-full rounded-e-md border-0 px-2 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
            placeholder="812-345-6789"
            required
          />
        </div>
      </div>
      <p className="mt-1 text-sm text-red-600">
        {contact === '' && isSubmit ? errorEmptyMessage : ''}
      </p>
    </div>
  )
}

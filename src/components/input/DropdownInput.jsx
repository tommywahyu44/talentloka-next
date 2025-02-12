import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'

export default function DropdownInput({
  label,
  id,
  listItems,
  value,
  onChange,
  isFullWidth = false,
}) {
  return (
    <div className={isFullWidth ? 'sm:col-span-6' : 'sm:col-span-3'}>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-slate-900">
        {label}
      </label>
      <Menu
        as="div"
        className="relative mt-2 inline-block w-full text-left">
        <div>
          <MenuButton
            id="dropdown-phone-button"
            data-dropdown-toggle="dropdown-phone"
            className="z-10 inline-flex w-full flex-shrink-0 items-center rounded-md border-0 bg-slate-800 px-3 py-1 text-white shadow-sm outline-none ring-1 ring-inset ring-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            type="button">
            {value}
            <ChevronDownIcon
              className="group-transition ml-1 ml-auto mr-3 h-5 w-5 text-white duration-300 hover:text-rose-500"
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
          <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {listItems.map((text, index) => {
                return (
                  <MenuItem key={index}>
                    <button
                      type="button"
                      className="inline-flex w-full px-2 py-1 text-sm text-slate-700 transition duration-300 hover:bg-slate-50 hover:text-white dark:text-slate-200 dark:transition"
                      role="menuitem"
                      onClick={() => {
                        const item = {
                          target: {
                            value: text,
                            name: id,
                          },
                        }
                        onChange(item)
                      }}>
                      <div className="inline-flex items-center text-slate-800">{text}</div>
                    </button>
                  </MenuItem>
                )
              })}
            </div>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  )
}

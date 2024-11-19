import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { checkOthersInArray } from '@/lib/helpers'

export const textItemSmall = (title, desc) => {
  return (
    <span className="mx-2 flex-none truncate">
      <span className="truncate text-left font-light text-stone-500">{title}:</span>
      <span className="ml-1 truncate font-medium text-stone-900">{desc}</span>
    </span>
  )
}

export const textItem = (icon, desc) => {
  return (
    <div className="flex flex-row text-white opacity-90">
      <div className="mr-3">{icon}</div>
      <h3 className="truncate text-xs font-medium">{desc}</h3>
    </div>
  )
}

export const checkboxDropdown = (items, title) => {
  return (
    <Menu
      as="div"
      className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-stone-900 shadow-sm ring-1 ring-inset ring-stone-300 transition duration-300 hover:bg-stone-50">
          {title}
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-stone-400"
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
          {items.map((item) => (
            <MenuItem
              as="div"
              key={item.id}
              className="ui-active:bg-blue-500 ui-active:text-white ui-not-active:bg-white ui-not-active:text-black">
              <input
                id={`input-${item.id}`}
                name={item.id}
                type="checkbox"
                defaultChecked={item.active}
                className="h-4 w-4 rounded border-stone-300 text-rose-600 focus:ring-0"
              />
              <label
                htmlFor={`label-${item.id}`}
                className="ml-3 min-w-0 flex-1 text-stone-500">
                {item.name}
              </label>
            </MenuItem>
          ))}
        </MenuItems>
      </Transition>
    </Menu>
  )
}

export const checkbox = (
  items,
  handleChange,
  handleCustomOthersChange,
  checkedItems,
  title,
  textInput
) => {
  return (
    <div>
      <div className="mb-2 text-sm font-medium leading-6 text-stone-900">{title}</div>
      {items.map((item) => (
        <div
          key={item.id}
          className="ui-active:bg-blue-500 ui-active:text-white ui-not-active:bg-white ui-not-active:text-black">
          <input
            id={`input-${item.id}`}
            name={item.name}
            type="checkbox"
            checked={
              item.name === 'Others'
                ? checkOthersInArray(checkedItems)
                : checkedItems.includes(item.name) ?? item.active
            }
            onChange={handleChange}
            className="h-4 w-4 cursor-pointer rounded border-stone-300 text-rose-600 focus:ring-0"
          />
          <label
            htmlFor={`label-${item.id}`}
            className="ml-3 min-w-0 flex-1 text-sm leading-6 text-stone-900">
            {item.name}
          </label>
        </div>
      ))}
      <div
        key="others"
        className="ui-active:bg-blue-500 ui-active:text-white ui-not-active:bg-white ui-not-active:text-black">
        <input
          id={'input-others'}
          name="Others"
          type="text"
          placeholder="Input your custom"
          value={textInput}
          onChange={handleCustomOthersChange}
          className={`mt-2 h-8 w-full cursor-pointer rounded border-stone-300 text-stone-900 focus:ring-0 ${
            checkOthersInArray(checkedItems) ? '' : 'hidden'
          }`}
        />
      </div>
    </div>
  )
}

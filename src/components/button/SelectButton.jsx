import { CheckIcon } from '@heroicons/react/24/outline'

export default function SelectButton({ listText, onClick }) {
  return (
    <>
      {listText.map((text) => {
        return (
          <button
            key={text}
            onClick={() => onClick(text)}
            className="group relative mx-auto mt-8 flex w-full justify-center rounded-full border-2 border-rose-500 px-3 py-2 text-sm font-semibold leading-6 text-rose-600 shadow-sm transition duration-300 hover:bg-rose-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600">
            <p className="">{text}</p>
            <CheckIcon
              className="absolute right-4 top-2.5 h-5 w-5 rounded-full border border-rose-600 p-0.5 opacity-20 group-hover:bg-white group-hover:text-rose-600 group-hover:opacity-100"
              aria-hidden="true"
            />
          </button>
        )
      })}
    </>
  )
}

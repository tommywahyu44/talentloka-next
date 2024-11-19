import { moneyFormat } from '@/lib/helpers'

export default function TextInput({
  label,
  id,
  value,
  onChange,
  errorEmptyMessage,
  isSubmit,
  max,
  min,
  note,
  isFullWidth = false,
  type = 'text',
  editable = true,
}) {
  const getInput = () => {
    if (!editable) {
      return <h5 className="text-xs font-semibold">{value}</h5>
    } else if (type === 'textarea') {
      return (
        <textarea
          name={id}
          id={id}
          value={value}
          onChange={onChange}
          rows={3}
          required
          className="block w-full rounded-md border-0 px-2 py-1 text-stone-900 shadow-sm outline-none ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
        />
      )
    } else if (type === 'money') {
      const money = moneyFormat(value)
      return (
        <div>
          <input
            type={type}
            name={id}
            id={id}
            value={value}
            onChange={onChange}
            max={max}
            min={min}
            required
            className="block w-full rounded-md border-0 px-2 py-1 text-stone-900 shadow-sm outline-none ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
          />
          <h5 className="mt-1 text-xs font-semibold">{money}</h5>
        </div>
      )
    } else {
      return (
        <input
          type={type}
          name={id}
          id={id}
          value={value}
          onChange={onChange}
          max={max}
          min={min}
          required
          className="block w-full rounded-md border-0 px-2 py-1 text-stone-900 shadow-sm outline-none ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
        />
      )
    }
  }
  return (
    <div className={isFullWidth ? 'sm:col-span-6' : 'sm:col-span-3'}>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-stone-900">
        {label}
      </label>
      <div className="mt-2">{getInput()}</div>
      <p className="mt-1 text-sm text-stone-500">
        {note}
        <span className="text-red-600">{value === '' && isSubmit ? errorEmptyMessage : ''}</span>
      </p>
    </div>
  )
}

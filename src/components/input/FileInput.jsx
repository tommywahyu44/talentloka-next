export default function FileInput({
  label,
  limitDesc,
  id,
  value,
  onChange,
  errorEmptyMessage,
  isSubmit,
  isFullWidth = false,
}) {
  return (
    <div className={isFullWidth ? 'sm:col-span-6' : 'sm:col-span-3'}>
      <label
        className="mb-2 block text-sm font-medium text-stone-900"
        htmlFor={id}>
        {label}
      </label>
      <input
        className="block w-full cursor-pointer rounded-lg border border-stone-300 bg-stone-50 text-sm text-stone-900 focus:outline-none"
        id={id}
        type="file"
        accept="image/png, image/jpg, image/jpeg, application/pdf"
        onChange={onChange}
      />
      <p
        className="mt-1 text-sm text-stone-500"
        id="file_input_help">
        {limitDesc}
        <span className="text-red-600">
          {value[1] !== '' ? value[1] : !value[0] && isSubmit ? errorEmptyMessage : ''}
        </span>
      </p>
    </div>
  )
}

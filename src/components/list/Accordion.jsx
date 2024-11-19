export default function Accordion(props) {
  return (
    <div className="mb-1 rounded-md border">
      <div
        className="w-full cursor-pointer justify-between gap-x-1.5 rounded-md bg-rose-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-stone-300 transition duration-300 hover:bg-rose-600"
        onClick={props.toggleAccordion}>
        {props.title}
        <span
          className={`float-right transform ${
            props.isOpen ? 'rotate-180' : 'rotate-0'
          } transition-transform duration-300`}>
          &#9660;
        </span>
      </div>
      {props.isOpen && <div className="bg-white p-4">{props.child}</div>}
    </div>
  )
}

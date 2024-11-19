import { Dropdown } from 'flowbite-react'

export default function DropdownButton({ listText, onClick }) {
  return (
    <>
      <Dropdown
        label="Others"
        dismissOnClick={true}>
        {listText.map((text) => {
          return (
            <Dropdown.Item
              key={text}
              onClick={() => onClick(text)}>
              {text}
            </Dropdown.Item>
          )
        })}
      </Dropdown>
    </>
  )
}

import React from 'react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { useState } from 'react'

const people = [
  { id: 1, name: 'Ming',avatar:'/p1.webp' },
  { id: 2, name: 'Bruce Wen',avatar:'/p2.webp' },
  { id: 3, name: 'Michael Star',avatar:'/p3.webp' },
  { id: 4, name: 'Convoy',avatar:'/p4.webp' },
  { id: 5, name: 'Peterson Paul',avatar:'/p5.webp' },
]

const Picker=()=> {
  const [selected, setSelected] = useState(people[3])
  const profile = localStorage.getItem;
  return (
    
      <Listbox value={selected} onChange={setSelected}>
        <ListboxButton
          className={clsx(
            'relative block  w-full rounded-full bg-white py-4  pr-8 pl-4 text-left text-sm/8 text-green-700',
            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 border '
          )}
        >
            <div className='flex gap-x-4'>
            <img src={selected.avatar} alt="avatar" className="h-8 w-8 rounded-full" />
            {selected.name}
            </div>
            <svg
            className="group pointer-events-none absolute top-6 right-5 w-4 h-4 text-black"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
             fill="currentColor"
            aria-hidden="true"
            >
  <path d="M12 15.5l-7-7h14z" />
</svg>

        </ListboxButton>
        <Transition leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
          <ListboxOptions
            anchor="bottom"
            className="w-[var(--button-width)] rounded-xl  bg-white  [--anchor-gap:var(--spacing-1)] focus:outline-none z-50 mt-1 border"
          >
            {/* I need to filter my name here */}
            {people.filter((p)=>(p.name!==profile.name)).map((person) => (
              <ListboxOption
                key={person.name}
                value={person}
                className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
              >
                <img src={person.avatar} alt="avatar" className="h-6 w-6 rounded-full" />
                <div className="text-sm/6 text-black">{person.name}</div>
                <CheckIcon className="invisible size-4 fill-black group-data-[selected]:visible" />
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Transition>
      </Listbox>
    
  )
}


export default Picker
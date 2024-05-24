import React, { useEffect } from 'react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { useState } from 'react'

const people = [
  { id: 1, name: 'Tom Cook',avatar:'./p1.webp' },
  { id: 2, name: 'Wade Cooper',avatar:'./p2.webp' },
  { id: 3, name: 'Tanya Fox',avatar:'./p3.webp' },
  { id: 4, name: 'Arlene Mccoy',avatar:'./p4.webp' },
  { id: 5, name: 'Devon Webb',avatar:'./p5.webp' },
]



const ProfilePicker=()=> {
  const [selected, setSelected] = useState(people[1])

  useEffect(()=>{
    localStorage.setItem('profile',selected.name);
    localStorage.setItem('profileImage',selected.avatar);
},[selected]);
  return (
      <Listbox value={selected} onChange={setSelected}>
        <ListboxButton
          className={clsx(
            'relative block  w-full rounded-lg bg-white py-1.5 pr-8 pl-3 text-left text-sm/6 text-black ',
            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 justify-center '
          )}
        >
            <div className='flex justify-center gap-[10px]'>
            <img src={selected.avatar} alt="avatar" className="h-12 w-12 rounded-full" />           
          
            </div>
        </ListboxButton>
        <Transition leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
          <ListboxOptions
            anchor="bottom"
            className="w-[var(--button-width)] rounded-xl  bg-white  [--anchor-gap:var(--spacing-1)] focus:outline-none z-50 mt-1 border"
          >
            {people.map((person) => (
              <ListboxOption
                key={person.name}
                value={person}
                className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
              >
                <img src={person.avatar} alt="avatar" className="h-12 w-12 rounded-full" />
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Transition>
      </Listbox>
    
  )
}

export default ProfilePicker
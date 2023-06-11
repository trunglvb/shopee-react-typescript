/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from 'react-router-dom'
import { useRef, useState } from 'react'
import { FloatingPortal, useFloating, arrow } from '@floating-ui/react'
import LogoHeader from '../LogoHeader'

const Header = () => {
  const arrowRef = useRef<HTMLElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const { x, y, refs, strategy, middlewareData } = useFloating({
    //strategy dinh nghia viec hien thi fixed hay absolute
    middleware: [
      arrow({
        element: arrowRef
      })
    ]
  })

  const showPopover = () => {
    setIsOpen(true)
  }

  const hidePopover = () => {
    setIsOpen(false)
  }
  return (
    <div className='bg-[linear-gradient(-180deg,#f53d2d,#f63)] pb-5 pt-2 text-white'>
      <div className='container'>
        <div className='flex justify-end '>
          <div
            className='flex cursor-pointer items-center py-1 hover:text-gray-300'
            ref={refs.setReference}
            onMouseEnter={showPopover}
            onMouseLeave={hidePopover}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-4 w-4'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
              />
            </svg>
            <span className='mx-1'>Tiếng Việt</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-4 w-4'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
            </svg>
          </div>
          <FloatingPortal>
            {isOpen && (
              <div
                ref={refs.setFloating}
                style={{
                  position: strategy,
                  top: y ?? 0,
                  left: x ?? 0,
                  width: 'max-content'
                }}
              >
                <div className='relative flex flex-col rounded-sm border border-gray-200 bg-white shadow-md'>
                  <button className='px-3 py-2 hover:text-orange'>Tiếng Việt</button>
                  <button className='mt-2 px-3 py-2 hover:text-orange'>English</button>
                </div>
              </div>
            )}
          </FloatingPortal>
          <div className='ml-6 flex cursor-pointer items-center py-1 hover:text-gray-300'>
            <div className='mr-2 h-4 w-4 flex-shrink-0'>
              <img
                className='h-full w-full rounded-full object-cover'
                src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg'
                alt='avatar'
              />
            </div>
            <div>lvbtrung</div>
            <div>MacBook</div>
          </div>
        </div>
        <div className='mt-4 grid grid-cols-12 items-end gap-4'>
          <div className='col-span-2'>
            <LogoHeader fill='fill-white' />
          </div>
          <form className='col-span-9'>
            <div className='flex rounded-sm bg-white p-1'>
              <input
                type='text'
                name='search'
                className='flex-grow border-none bg-transparent px-3 py-2 text-black outline-none'
                placeholder='Đăng kí và nhận vocher bạn mới đến 70k'
              />
              <button className='flex-shrink-0 rounded-sm bg-orange px-6 py-2 hover:opacity-90'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='h-6 w-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                  />
                </svg>
              </button>
            </div>
          </form>
          <div className='col-span-1 flex justify-center text-xl'>
            <Link to='/'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-6 w-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
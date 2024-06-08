// 'use client'
// import React, { useCallback, useEffect, useState } from 'react'
// import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

// type PaginationProps = {
//   onChangePage: (page: number) => void
//   totalPages: number
//   page: number
// }

// const LIMIT = 5

// function Pagination({ onChangePage, totalPages, page }: PaginationProps) {
//   const [currentPage, setCurrentPage] = useState<number[]>([])

//   const initPageNumber = useCallback((totalPages: number, page: number) => {
//     const viewPages = []
//     const halfLimit = Math.floor(LIMIT / 2)
//     const startPage = Math.max(1, page - halfLimit)
//     const endPage = Math.min(totalPages, startPage + LIMIT - 1)

//     for (let i = startPage; i <= endPage; i += 1) {
//       viewPages.push(i)
//     }
//     setCurrentPage(viewPages)
//   }, [])

//   const prePages = () => {
//     const newPage = Math.max(1, currentPage[0] - LIMIT)
//     onChangePage(newPage)
//     initPageNumber(totalPages, newPage)
//   }

//   const nextPages = () => {
//     const newPage = Math.min(totalPages, currentPage[0] + LIMIT)
//     onChangePage(newPage)
//     initPageNumber(totalPages, newPage)
//   }

//   useEffect(() => {
//     initPageNumber(totalPages, page)
//   }, [totalPages, page, initPageNumber])

//   return (
//     <div className="flex mt-4">
//       <button disabled={currentPage[0] === 1} onClick={prePages} type="button">
//         <FaArrowLeft color="white" />
//       </button>
//       <ul>
//         {currentPage.map((v) => (
//           <li
//             onClick={() => onChangePage(v)}
//             key={v}
//             style={{
//               display: 'inline-block',
//               padding: '0 10px',
//               cursor: 'pointer',
//               color: v === page ? 'rgb(74 222 128)' : 'white',
//             }}
//           >
//             {v}
//           </li>
//         ))}
//       </ul>
//       <button
//         disabled={currentPage[currentPage.length - 1] === totalPages}
//         onClick={nextPages}
//         type="button"
//       >
//         <FaArrowRight color="white" />
//       </button>
//     </div>
//   )
// }

// export default Pagination

'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

type PaginationProps = {
  onChangePage: (page: number) => void
  totalPages: number
  page: number
}

const LIMIT = 5

function Pagination({ onChangePage, totalPages, page }: PaginationProps) {
  const [currentPage, setCurrentPage] = useState<number[]>([])

  const initPageNumber = useCallback((totalPages: number, page: number) => {
    const viewPages = []
    const halfLimit = Math.floor(LIMIT / 2)
    const startPage = Math.max(1, page - halfLimit)
    const endPage = Math.min(totalPages, startPage + LIMIT - 1)

    for (let i = startPage; i <= endPage; i += 1) {
      viewPages.push(i)
    }
    setCurrentPage(viewPages)
  }, [])

  const prePages = () => {
    const newPage = Math.max(1, page - 1)
    onChangePage(newPage)
  }

  const nextPages = () => {
    const newPage = Math.min(totalPages, page + 1)
    onChangePage(newPage)
  }

  useEffect(() => {
    initPageNumber(totalPages, page)
  }, [totalPages, page, initPageNumber])

  return (
    <div className="flex mt-4">
      <button disabled={page === 1} onClick={prePages} type="button">
        <FaArrowLeft color="white" />
      </button>
      <ul>
        {currentPage.map((v) => (
          <li
            onClick={() => onChangePage(v)}
            key={v}
            style={{
              display: 'inline-block',
              padding: '0 10px',
              cursor: 'pointer',
              color: v === page ? 'rgb(74 222 128)' : 'white',
            }}
          >
            {v}
          </li>
        ))}
      </ul>
      <button disabled={page === totalPages} onClick={nextPages} type="button">
        <FaArrowRight color="white" />
      </button>
    </div>
  )
}

export default Pagination

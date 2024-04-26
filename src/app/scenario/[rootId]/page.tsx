'use client'

import { useParams } from 'react-router-dom'
import Background from '../../_components/Background'
import Navbar from '../../_components/Navbar'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScenarioRootId = (props: any) => {
  // const { rootId } = useParams() // rootId만 사용
  // const { rootId } = useParams<{ rootId: string }>()
  const searchParams = new URLSearchParams(location.search)
  const rootId = searchParams.get('rootId')
  console.log(rootId)

  // const location = useLocation()
  // const params = new URLSearchParams(location.search)
  // const rootId = params.get('rootId')

  // console.log(rootId) // rootId를 콘솔에 출력합니다.

  // console.log(params.rootId)
  // console.log(params.rootId)
  // useEffect(() => {
  //   if (rootId) {
  //     console.log(rootId)
  //   }
  // }, [rootId])
  return (
    <div className="overflow-hidden">
      <Background />
      <div className="flex w-[100vw] h-[100vh] flex-col justify-center items-center absolute top-1/2 left-1/2 z-1 bg-transparent -translate-x-1/2 -translate-y-1/2">
        <div className="overflow-hidden flex flex-col w-full h-full">
          <Navbar />
          {/* <TreeGraph openmodal={openModal} scenario={scenario} /> */}
        </div>
      </div>
    </div>
  )
}
export default ScenarioRootId

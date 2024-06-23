'use client'

import React from 'react'
import TreeGraph from './TreeGraph'
import Navbar from '../_components/Navbar'
import Background from '../_components/Background'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Scenario = () => {
  //   const user = useRecoilValue(userState);
  //   const { rootId } = useParams() as { rootId: string }
  //   const story_id = parseInt(rootId, 10)s
  // const { rootId } = useParams() // rootId만 사용
  // const { rootId } = useParams<{ rootId: string }>()
  // console.log(rootId)
  //   const navigate = useNavigate() // 뒤로 가기

  // const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const rootId = searchParams.get('rootId')

  console.log(rootId)

  // const [isStoryModalOpen, setIsStoryModalOpen] = useState(false)
  // const [isCreateModalOpen, setIsCreateModalOpen] = useState(false) // 모달 관리

  const [scenario, setScenario] = useState([]) // d3 시나리오
  const [clickStoryId, setClickStoryId] = useState<{
    rootId: number | null
    page: number
  }>({
    rootId: typeof rootId === 'string' ? parseInt(rootId) : rootId,
    page: 0,
  }) //클릭한 시나리오 조회

  const handleClickBack = () => {
    // 메인 페이지로 가기
    // navigate('/main')
    // window.location.href = '/main'
    window.history.back()
  }

  useEffect(() => {
    //이 코드가 useEffect 내부에 있어야 렌더링 시 바로 트리 그래프 출력됨
    const searchParams = new URLSearchParams(location.search)
    const rootId = searchParams.get('rootId')
    console.log('rootId: ', rootId)
    const scenarioAPI = async () => {
      try {
        const response = await axios.get(`/api/v2/stories/${rootId}`)
        console.log('response: ', response.data.data)
        console.log(rootId)
        if (response.status == 200) {
          const stories = response.data.data
          setScenario(stories)
          console.log(stories)
          const rootIdNull = stories.find(
            (story: { parentId: null }) => story.parentId === null,
          ) // parentId가 null인 요소를 찾습니다.
          console.log('parentId가 null인 id 값:', rootIdNull.id)
        }
      } catch (error) {
        console.error('Error fetching scenario data:', error)
      }
    }

    if (rootId) {
      // rootId가 존재할 때만 API 호출
      scenarioAPI()
    }
    // }, [rootId, isCreateModalOpen])
  }, [rootId])

  return (
    <div className="overflow-hidden">
      <Background />
      <div className="flex w-[100vw] h-[100vh] flex-col justify-center items-center absolute top-1/2 left-1/2 z-1 bg-transparent -translate-x-1/2 -translate-y-1/2">
        <div className="overflow-hidden flex flex-col w-full h-full">
          <Navbar />
          <TreeGraph scenario={scenario} />
        </div>
      </div>
      <div className="flex gap-1 text-gray-400 text-[14px] absolute right-10 bottom-8">
        <svg
          className="w-[15px]"
          data-slot="icon"
          fill="none"
          strokeWidth={2.5}
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
          />
        </svg>
        <span>마우스 휠과 드래그로 스토리를 따라가보세요!</span>
      </div>
      <div
        onClick={handleClickBack}
        className="w-[50px] h-[50px] text-white absolute left-8 bottom-8"
      >
        <svg
          className="hover:scale-125 hover:opacity-35 h-full drop-shadow"
          style={{
            filter: 'drop-shadow(7px 1px 8px rgba(255, 255, 255, 0.7))',
          }}
          data-slot="icon"
          fill="none"
          strokeWidth="2"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          ></path>
        </svg>
      </div>
    </div>
  )
}

export default Scenario

'use client'
import React, { useEffect } from 'react'
import jwt from 'jsonwebtoken'
import { useUserStore } from '@/stores/useUserStore'

const RedirectPage: React.FC = () => {
  const { nickname, setNickname } = useUserStore()
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('a')

    // 토큰이 존재하는지 확인하고 로컬 스토리지에 저장
    if (token) {
      localStorage.setItem('a', token)
      console.log(token)
      const decodedToken = jwt.decode(token)
      console.log(decodedToken)
      if (decodedToken?.sub != 'null') {
        // 기존 회원일 경우
        fetch('http://localhost:8080/api/v2/users/details', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok')
            }
            return response.json()
          })
          .then((data) => {
            // 요청 성공 시 수행할 작업
            console.log(data)
            console.log('닉네임은', data.data.nickname)
            setNickname(data.data.nickname)
          })
          .catch((error) => {
            // 요청 실패 시 수행할 작업
            console.error(
              'There was a problem with your fetch operation:',
              error,
            )
          })
        const redirectPage = '/'
        window.location.href = redirectPage
      }
    } else {
      console.error('토큰이 없습니다.')
    }
  }, [])

  return <div>페이지 이동 중...</div>
}

export default RedirectPage

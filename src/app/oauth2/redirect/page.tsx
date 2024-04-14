'use client'
import React, { useEffect } from 'react'
import jwt from 'jsonwebtoken'

const RedirectPage: React.FC = () => {
  useEffect(() => {
    // 현재 URL에서 토큰 추출
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')

    // 토큰이 존재하는지 확인하고 로컬 스토리지에 저장
    if (token) {
      localStorage.setItem('token', token)
      const decodedToken = jwt.decode(token)
      if (decodedToken?.sub != 'null') {
        // 기존 회원일 경우
        const redirectPage = '/'
        window.location.href = redirectPage
      } else {
        // 신규 회원일 경우
        const redirectPage = '/login'
        window.location.href = redirectPage
      }
    } else {
      console.error('토큰이 없습니다.')
    }
  }, [])

  return <div>페이지 이동 중...</div>
}

export default RedirectPage

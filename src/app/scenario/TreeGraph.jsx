import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import ViewStoryModal from '../scenario/_component/ViewStoryModal'
import PostStoryModal from '../scenario/_component/PostStoryModal'
import useRightStory from '@/stores/useRightStory'

const TreeGraph = ({ scenario, scenarioAPI }) => {
  const svgRef = useRef(null)
  const [clickStoryId, setClickStoryId] = useState(null)
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false) // 모달 관리
  const { updateRightState } = useRightStory()

  const handleClickStory = (id, page) => {
    // console.log('d: ', d)
    // const id = d.data.name
    // const page = d.depth + 1
    if (id >= 0) {
      setClickStoryId({ id, page })
      // console.log(id)
      // console.log(page)
      updateRightState(id)
      setIsStoryModalOpen(true)
    } else {
      setIsCreateModalOpen(true)
    }
  }

  const closeModals = () => {
    // 둘 다 닫히게
    setIsStoryModalOpen(false)
    setIsCreateModalOpen(false)
  }
  useEffect(() => {
    if (scenario && scenario.length > 0) {
      // Remove any existing SVG
      d3.select(svgRef.current).selectAll('*').remove()

      // 너비와 높이 설정
      const width = document.body.clientWidth
      const height = document.body.clientHeight

      // Add margins
      const margin = { top: 300, left: 600, right: 0, bottom: 0 }
      const innerWidth = width - margin.right - margin.left
      const innerHeight = height - margin.top - margin.bottom

      // tree() sets x and y value
      const tree = d3
        .tree()
        .size([innerHeight, innerWidth])
        .nodeSize([200, 390]) //각각 노드의 수평 및 수직 크기

      const stratifyData = scenario.map((node) => ({
        name: node.id,
        parent: node.parentId ? node.parentId.toString() : null,
        image: node.imageUrl,
      }))
      stratifyData.forEach((node) => {
        node.data = { image: node.image } // Add image to data property
      })

      const stratify = d3
        .stratify()
        .id((d) => d.name)
        .parentId((d) => d.parent)
      // .imageUrl((d) => d.image)

      const root = stratify(stratifyData)
      console.log(root)
      console.log(root.children)
      console.log(root.data.image)
      // console.log((root.children.id = .image))

      const links = tree(root).links()
      const lineGenerator = d3
        .line()
        .x((d) => d.y)
        .y((d) => d.x)

      // Update zoom based on the number of nodes
      // const totalNodes = root.descendants().length;
      const totalHeight = root.descendants()[0].height
      const scale = 1.5 / Math.log2(totalHeight + 1.7) // 로그 기반 스케일

      // SVG 요소 생성
      const svg = d3
        .select(svgRef.current)
        .attr('width', width)
        .attr('height', height)

      const zoomG = svg.append('g')

      const g = zoomG
        .append('g')
        .attr(
          'transform',
          `translate(${margin.left - 180 * totalHeight}, ${height / 2})`,
        )

      // // Add Zooming
      // svg.call(
      //   d3
      //     .zoom()
      //     .scaleExtent([0.45, 3.3]) // 최소 스케일과 최대 스케일을 설정
      //     .on("zoom", ({ transform }) => {
      //       zoomG.attr("transform", transform);
      //     })
      // );

      // // 마우스 이동에 따라 트리 이동
      // svg.call(
      //   d3.drag().on("drag", (event) => {
      //     const newX = event.x - margin.left;
      //     const newY = event.y - margin.top;
      //     g.attr("transform", `translate(${newX}, ${newY})`);
      //   })
      // );

      // Add Zooming
      const zoom = d3
        .zoom()
        .scaleExtent([0.4, 3.3]) // 최소 스케일과 최대 스케일을 설정
        .on('zoom', ({ transform }) => {
          zoomG.attr('transform', transform)
        })

      svg.transition().call(zoom.scaleTo, scale)

      svg.call(zoom)

      // // 마우스 위치에 따라 트리 이동
      // svg.on("mousemove", (event) => {
      //   const [mouseX, mouseY] = d3.pointer(event);
      //   const treeX = (mouseX - margin.left) / scale;
      //   const treeY = (mouseY - margin.top) / scale;

      //   g.attr("transform", `translate(${-treeX}, ${height / 2 - treeY})`);
      // });

      // // 마우스 위치에 따라 부드럽게 트리 이동
      // svg.on("mousemove", (event) => {
      //   const [mouseX, mouseY] = d3.pointer(event);
      //   const treeX = (mouseX - margin.left) / scale;
      //   const treeY = (mouseY - margin.top) / scale;

      //   g.transition()
      //     .duration(300) // 이동에 걸리는 시간 (밀리초)
      //     .attr("transform", `translate(${-treeX}, ${height / 2 - treeY})`);
      // });

      // 마우스 위치에 따라 일정한 속도로 트리 이동
      let mouseX = 0
      let mouseY = 0

      svg.on('mousemove', (event) => {
        const [newMouseX, newMouseY] = d3.pointer(event)

        // 일정한 비율로 이동
        const speed = 0.02
        mouseX += (newMouseX - mouseX) * speed
        mouseY += (newMouseY - mouseY) * speed

        const treeX = (mouseX - margin.left) / scale
        const treeY = (mouseY - margin.top) / scale

        g.attr('transform', `translate(${-treeX}, ${height / 2 - treeY})`)
      })

      update()

      // eslint 경고 무시하는 주석
      // eslint-disable-next-line no-inner-declarations
      function update() {
        const delayFactor = (d) => 250 + 300 * d.depth

        g.selectAll('path')
          .data(links)
          .enter()
          .append('path')
          .attr('d', (d) => lineGenerator(d)) // 직선으로 변경
          .attr('fill', 'none')
          .style('stroke', 'white')
          .style('transform', 'rotateX(20deg) rotateY(8deg) rotateZ(-8deg)')
          .transition()
          .duration(500)
          .attr('stroke-width', 7)
          .style('stroke-dasharray', '18, 10') // dashed 스타일 설정
          .style('filter', 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))')
          .attr('d', (d) => lineGenerator([d.source, d.target])) // 직선으로 변경
          .delay((d) => 250 * d.source.depth)
        // .delay(delayFactor)

        g.selectAll('rect') // 사각형 배경 추가
          .data(root.descendants())
          .enter()
          .append('rect')
          .attr('x', (d) => d.y - 80)
          .attr('y', (d) => d.x - 80)
          .style('transform', 'rotateX(20deg) rotateY(8deg) rotateZ(-8deg)')
          .style('fill', 'none')
          .attr('width', 160)
          .attr('height', 160)
          .style('filter', 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))')
          .style('fill', 'rgba(255, 255, 255, 0.9)')
          .transition()
          .duration(400)
          // .delay((d) => 250 + 300 * d.depth)
          .delay(delayFactor)

        g.selectAll('image') //이미지 추가
          .data(root.descendants())
          .enter()
          .append('image')
          .attr('x', (d) => d.y - 75)
          .attr('y', (d) => d.x - 75)
          .style('transform', 'rotateX(20deg) rotateY(8deg) rotateZ(-8deg)')
          .style('fill', 'none')
          .attr('width', 150)
          .attr('height', 150)
          .attr('xlink:href', (d) => d.data.image)
          .transition()
          .duration(400)
          .delay(delayFactor)
          .on('end', () => {
            g.selectAll('image').on('click', (event, d) =>
              handleClickStory(d.data.name, d.depth + 1),
            )
          })
        // .transition()
        // .duration(400)
        // .delay((d) => 250 + 300 * d.depth)
      }
    }
  }, [scenario])

  return (
    <div className="w-full h-full">
      <svg ref={svgRef} className="w-full h-full"></svg>
      {isStoryModalOpen && ( // 클릭한 스토리의 ID가 있을 때만 모달을 열도록 설정
        <div className="z-10 w-full h-full">
          <ViewStoryModal
            storyID={clickStoryId}
            isOpen={isStoryModalOpen}
            handleClickStory={handleClickStory}
            onClose={closeModals}
            isCreateModalOpen={isCreateModalOpen}
          />
        </div>
      )}
      {isCreateModalOpen && (
        <div className="z-20">
          <PostStoryModal
            parentStoryID={clickStoryId.id}
            isOpen={isCreateModalOpen}
            closeModal={closeModals}
            isCreateModalOpen={isCreateModalOpen}
            scenarioAPI={scenarioAPI}
          />
        </div>
      )}
    </div>
  )
}

export default TreeGraph

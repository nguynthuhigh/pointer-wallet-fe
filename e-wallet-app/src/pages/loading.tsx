import LoadingImg from '../assets/png/loading_img.png'
import LoadingSvg from '../assets/svg/loading.svg'
const Loading = () => {
  return (
    <div class={` w-full`}>
      <img class={`mx-auto mt-36`} src={LoadingImg}></img>
      <img class={`mx-auto animate-spin my-5`} src={LoadingSvg}></img>
      <div class={`font-semibold text-center my-2`}>Đang tải chờ chút nhé...</div>
    </div>
  )
}

export default Loading
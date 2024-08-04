import LoadingImg from '../assets/png/loading_img.png'
const Loading = () => {
  return (
    <div class={` w-full`}>
      <img class={`mx-auto mt-40`} src={LoadingImg}></img>
      <div class={`font-semibold text-center my-2`}>Đang tải chờ chút nhé...</div>
    </div>
  )
}

export default Loading
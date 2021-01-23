export default function (video) {
  if (!video) return null

  if (video.coverImg instanceof File) return URL.createObjectURL(video.coverImg)

  // if (video.coverImg.link) return video.photo[0]?.link

  return video?.coverImg?.link ?? null
}

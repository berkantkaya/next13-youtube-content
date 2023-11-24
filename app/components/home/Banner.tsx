import Image from "next/image"

const Banner = () => {
  return (
    <div className="h-[237px] bg-black flex items-center justify-center">
      <div className="h-[137px] relative w-full">
          <Image src={"/hepsi.jpeg"} fill alt="" className="object-cover"/>
      </div>
    </div>
  )
}

export default Banner
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  title: string
  src: string
  link?: string
}

const CoverImage = ({ title, src, link }: Props) => {
  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      width={500}
      height={200}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  )
  return (
    <div className='rounded-sm' style={{ margin: 0, overflow: "hidden" }} >
      {link ? (
        <Link
          href={link}
          aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  )
}

export default CoverImage
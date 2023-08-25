import Link from 'next/link'
import Image from 'next/image'
import useRewrites from 'hooks/useRewrites'

type Props = {
  title: string
  src: string
  link?: string
}

const CoverImage = ({ title, src, link }: Props) => {
  const {rewrite} = useRewrites()
  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      width={1300}
      height={630}
      style={{width:"100%", height:"100%", objectFit:"cover"}}

    />
  )
  return (
    <div className='rounded-sm' style={{margin:0, overflow:"hidden"}} >
      {link ? (
        <Link as={link} href={`/${rewrite("blog")}/[slug]`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  )
}

export default CoverImage
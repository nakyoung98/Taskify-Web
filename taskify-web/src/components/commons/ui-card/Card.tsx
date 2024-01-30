import Image from 'next/image';

type CardProps = {
  imageUrl?: string;
  title: string;
  /**TODO: tag에 대한 type을 추후 추가로 신설해야할 듯  */
  tags?: string[];
  /**TODO: expiredDate type 명확히  */
  expiredDate?: string;
  user?: string;
};

export default function Card({
  imageUrl,
  title,
  tags,
  expiredDate,
  user,
}: CardProps) {
  return (
    <article>
      {imageUrl && <Image src={imageUrl} alt={`${title} 카드`} />}
      <header>{title}</header>
      {tags?.map((tag) => {
        return null;
      })}
      <footer>
        <p>{expiredDate}</p>
        {/** user가 있으면 UserBadge에 userData에 맞게 데이터를 불러와야함 */}
      </footer>
    </article>
  );
}

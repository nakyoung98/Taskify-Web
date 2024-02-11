import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './LandingLayout.module.scss';
import Button from '@/components/commons/ui-button/Button';
import headerImg from './headerImg.png';
import Landing1 from './landing1.png';
import Landing2 from './landing2.png';
import Landing3 from './landing3.png';
import Landing4 from './landing4.png';
import Landing5 from './landing5.png';

type LandingLayoutProps = {
  header: ReactNode;
  footer: ReactNode;
};

const cx = classNames.bind(styles);

export default function LandingLayout({ header, footer }: LandingLayoutProps) {
  return (
    <>
      {header}
      <main className={cx('main')}>
        <article className={cx('header')}>
          <div className={cx('headerImage')}>
            <Image src={headerImg} alt="hi" fill />
          </div>
          <div className={cx('headerText')}>
            <h1 className={cx('slogan')}>
              새로운 일정 관리 <span className={cx('taskify')}>Taskify</span>
            </h1>
          </div>
          <p className={cx('headerDescription')}>
            서비스의 메인 설명 들어갑니다
          </p>
          <Link className={cx('buttonContainer')} href="/signin">
            <Button onClick={() => {}} size="large">
              로그인 하기
            </Button>
          </Link>
        </article>
        <article className={cx('article')}>
          <section className={cx('section1')}>
            <div className={cx('descriptionContainer')}>
              <p className={cx('point')}>Point 1</p>
              <h1 className={cx('description')}>
                일의 우선순위를
                <br />
                관리하세요
              </h1>
            </div>
            <div className={cx('imageContainer1')}>
              <div className={cx('image1')}>
                <Image src={Landing1} alt="랜딩1" fill />
              </div>
            </div>
          </section>
        </article>
        <article className={cx('article')}>
          <section className={cx('section2')}>
            <div className={cx('imageContainer2')}>
              <div className={cx('image2')}>
                <Image src={Landing2} alt="랜딩2" fill />
              </div>
            </div>
            <div className={cx('descriptionContainer')}>
              <p className={cx('point')}>Point 2</p>
              <h1 className={cx('description')}>
                해야 할 일을
                <br />
                등록하세요
              </h1>
            </div>
          </section>
        </article>
        <article className={cx('cardArticle')}>
          <p className={cx('settings')}>생산성을 높이는 다양한 설정 ⚡️</p>
          <section className={cx('cardList')}>
            <div className={cx('card')}>
              <div className={cx('cardImage')}>
                <div className={cx('cardImg1')}>
                  <Image src={Landing3} alt="카드1" fill />
                </div>
              </div>
              <div className={cx('cardText')}>
                <h3 className={cx('cardTitle')}>대시보드 설정</h3>
                <p className={cx('cardDescription')}>
                  대시보드 사진과 이름을 변경할 수 있어요.
                </p>
              </div>
            </div>
            <div className={cx('card')}>
              <div className={cx('cardImage')}>
                <div className={cx('cardImg2')}>
                  <Image src={Landing4} alt="카드2" fill />
                </div>
              </div>
              <div className={cx('cardText')}>
                <h3 className={cx('cardTitle')}>초대</h3>
                <p className={cx('cardDescription')}>
                  새로운 팀원을 초대할 수 있어요.
                </p>
              </div>
            </div>
            <div className={cx('card')}>
              <div className={cx('cardImage')}>
                <div className={cx('cardImg3')}>
                  <Image src={Landing5} alt="카드3" fill />
                </div>
              </div>
              <div className={cx('cardText')}>
                <h3 className={cx('cardTitle')}>구성원</h3>
                <p className={cx('cardDescription')}>
                  구성원을 초대하고 내보낼 수 있어요.
                </p>
              </div>
            </div>
          </section>
        </article>
      </main>
      {footer}
    </>
  );
}

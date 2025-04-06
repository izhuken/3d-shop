import { useAppDispatch, useAppSelector } from '@/store';
import { animConfigActions } from '@/store/slices/animation-entities';
import { ShopCreateStyles } from '@/styles';
import React, { useEffect } from 'react';
import { EditorButton } from '../editor';

interface ControlPlaneProps {}

export const ControlPlane: React.FC<ControlPlaneProps> = () => {
  const d = useAppDispatch();
  const { currentStamp, isPlay } = useAppSelector(
    (x) => x.animConfig.state.control
  );

  useEffect(() => {
    if (isPlay === false) return;

    const to = setInterval(() => {
      d(animConfigActions.next());
    }, 1000);

    return () => clearInterval(to);
  }, [isPlay]);

  return (
    <>
      <section className={ShopCreateStyles.entityWrapper}>
        <span>{currentStamp}</span>

        <EditorButton
          disabled={isPlay}
          size={40}
          action={() => d(animConfigActions.play())}
        >
          <img src='/play.svg' alt='' />
        </EditorButton>

        <EditorButton
          disabled={!isPlay}
          action={() => d(animConfigActions.stop())}
          size={40}
        >
          <img src='/pause.svg' alt='' />
        </EditorButton>
      </section>
    </>
  );
};

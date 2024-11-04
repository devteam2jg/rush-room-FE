import { Dispatch, ReactNode, SetStateAction } from 'react';
import useMeasure from 'react-use-measure';
import {
  useDragControls,
  useMotionValue,
  useAnimate,
  motion,
} from 'framer-motion';

interface Props {
  h: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  heightValue: string;
}

function DragCloseDrawer({ h, open, setOpen, children, heightValue }: Props) {
  const [scope, animate] = useAnimate();
  const [drawerRef, { height }] = useMeasure();

  const y = useMotionValue(0);
  const controls = useDragControls();

  const handleClose = async () => {
    animate(scope.current, {
      opacity: [1, 0],
    });

    const yStart = typeof y.get() === 'number' ? y.get() : 0;

    await animate('#drawer', {
      y: [yStart, height],
    });

    setOpen(false);
  };

  return (
    <div>
      {open && (
        <motion.div
          ref={scope}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleClose}
          className="absolute h-[100vh] left-0 bottom-0 w-full z-50 bg-neutral-950/70"
        >
          <motion.div
            id="drawer"
            ref={drawerRef}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            transition={{
              ease: 'easeInOut',
            }}
            className={`absolute bottom-0 h-[${heightValue}] w-full overflow-hidden rounded-t-3xl`}
            style={{ y, backgroundColor: '#282828' }}
            drag="y"
            dragControls={controls}
            onDragEnd={() => {
              if (y.get() >= 100) {
                handleClose();
              }
            }}
            dragListener={false}
            dragConstraints={{
              top: 0,
              bottom: 0,
            }}
            dragElastic={{
              top: 0,
              bottom: 0.5,
            }}
          >
            <div className="absolute h-5 left-0 right-0 top-0 z-10 flex justify-center p-2">
              <button
                onPointerDown={(e) => {
                  controls.start(e);
                }}
                className="h-full w-14 cursor-grab touch-none rounded-full bg-neutral-700 active:cursor-grabbing "
              />
            </div>
            <div className={`${h} relative z-0 overflow-y-scroll  pt-8`}>
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default DragCloseDrawer;

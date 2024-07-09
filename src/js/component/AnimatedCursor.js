import React from 'react';
import useEventListener from './useEventListener';

function AnimatedCursor({
  color = '220, 90, 90',    // Color del cursor en formato RGB
  outerAlpha = 0.4,        // Transparencia del borde exterior del cursor
  innerSize = 8,           // Tamaño del círculo interno del cursor en píxeles
  outerSize = 8,           // Tamaño del círculo exterior del cursor en píxeles
  outerScale = 5,          // Escala del círculo exterior cuando el cursor está activo
  innerScale = 0.7,        // Escala del círculo interno cuando el cursor está activo
  followSpeed = 18          // Velocidad de seguimiento del círculo interno del cursor
}) {
  const cursorOuterRef = React.useRef();
  const cursorInnerRef = React.useRef();
  const requestRef = React.useRef();
  const previousTimeRef = React.useRef();
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });
  const [innerCoords, setInnerCoords] = React.useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = React.useState(true);
  const [isActive, setIsActive] = React.useState(false);
  const [isActiveClickable, setIsActiveClickable] = React.useState(false);
  let endX = React.useRef(0);
  let endY = React.useRef(0);

  const onMouseMove = React.useCallback(({ clientX, clientY }) => {
    setCoords({ x: clientX, y: clientY });
    endX.current = clientX;
    endY.current = clientY;
  }, []);

  const animateInnerCursor = React.useCallback(
    (time) => {
      if (previousTimeRef.current !== undefined) {
        innerCoords.x += (endX.current - innerCoords.x) / followSpeed;
        innerCoords.y += (endY.current - innerCoords.y) / followSpeed;
        cursorInnerRef.current.style.top = `${innerCoords.y}px`;
        cursorInnerRef.current.style.left = `${innerCoords.x}px`;
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animateInnerCursor);
    },
    [followSpeed, innerCoords]
  );

  const animateOuterCursor = React.useCallback(
    (time) => {
      if (previousTimeRef.current !== undefined) {
        coords.x += (endX.current - coords.x) / followSpeed;
        coords.y += (endY.current - coords.y) / followSpeed;
        cursorOuterRef.current.style.top = `${coords.y}px`;
        cursorOuterRef.current.style.left = `${coords.x}px`;
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animateOuterCursor);
    },
    [followSpeed, coords]
  );

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animateInnerCursor);
    return () => cancelAnimationFrame(requestRef.current);
  }, [animateInnerCursor]);

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animateOuterCursor);
    return () => cancelAnimationFrame(requestRef.current);
  }, [animateOuterCursor]);

  const onMouseDown = React.useCallback(() => setIsActive(true), []);
  const onMouseUp = React.useCallback(() => setIsActive(false), []);
  const onMouseEnter = React.useCallback(() => setIsVisible(true), []);
  const onMouseLeave = React.useCallback(() => setIsVisible(false), []);

  useEventListener('mousemove', onMouseMove, document);
  useEventListener('mousedown', onMouseDown, document);
  useEventListener('mouseup', onMouseUp, document);
  useEventListener('mouseenter', onMouseEnter, document);
  useEventListener('mouseleave', onMouseLeave, document);

  React.useEffect(() => {
    if (isActive) {
      cursorInnerRef.current.style.transform = `scale(${innerScale})`;
      cursorOuterRef.current.style.transform = `scale(${outerScale})`;
    } else {
      cursorInnerRef.current.style.transform = 'scale(1)';
      cursorOuterRef.current.style.transform = 'scale(1)';
    }
  }, [innerScale, outerScale, isActive]);

  React.useEffect(() => {
    if (isActiveClickable) {
      cursorInnerRef.current.style.transform = `scale(${innerScale * 1.3})`;
      cursorOuterRef.current.style.transform = `scale(${outerScale * 1.4})`;
    }
  }, [innerScale, outerScale, isActiveClickable]);

  React.useEffect(() => {
    if (isVisible) {
      cursorInnerRef.current.style.opacity = 1;
      cursorOuterRef.current.style.opacity = 1;
    } else {
      cursorInnerRef.current.style.opacity = 0;
      cursorOuterRef.current.style.opacity = 0;
    }
  }, [isVisible]);

  React.useEffect(() => {
    const clickables = document.querySelectorAll(
      'a, input[type="submit"], input[type="image"], label[for], select, button, .link'
    );
    clickables.forEach((el) => {
      el.style.cursor = 'none';

      el.addEventListener('mouseover', () => {
        setIsActive(true);
      });
      el.addEventListener('click', () => {
        setIsActive(true);
        setIsActiveClickable(false);
      });
      el.addEventListener('mousedown', () => {
        setIsActiveClickable(true);
      });
      el.addEventListener('mouseup', () => {
        setIsActive(true);
      });
      el.addEventListener('mouseout', () => {
        setIsActive(false);
        setIsActiveClickable(false);
      });
    });

    return () => {
      clickables.forEach((el) => {
        el.removeEventListener('mouseover', () => {
          setIsActive(true);
        });
        el.removeEventListener('click', () => {
          setIsActive(true);
          setIsActiveClickable(false);
        });
        el.removeEventListener('mousedown', () => {
          setIsActiveClickable(true);
        });
        el.removeEventListener('mouseup', () => {
          setIsActive(true);
        });
        el.removeEventListener('mouseout', () => {
          setIsActive(false);
          setIsActiveClickable(false);
        });
      });
    };
  }, [isActive]);

  const styles = {
    cursor: {
      zIndex: 9999, // Asegura que el cursor esté siempre por encima de otros elementos
      position: 'fixed',
      opacity: 1,
      pointerEvents: 'none',
      transition: 'opacity 0.15s ease-in-out, transform 0.15s ease-in-out'
    },
    cursorInner: {
      position: 'fixed',
      borderRadius: '50%',
      width: innerSize,
      height: innerSize,
      pointerEvents: 'none',
      backgroundColor: `rgba(${color}, 1)`,
      transition: 'opacity 0.15s ease-in-out, transform 0.25s ease-in-out'
    },
    cursorOuter: {
      position: 'fixed',
      borderRadius: '50%',
      pointerEvents: 'none',
      width: outerSize,
      height: outerSize,
      backgroundColor: `rgba(${color}, ${outerAlpha})`,
      transition: 'opacity 0.15s ease-in-out, transform 0.15s ease-in-out'
    }
  };

  return (
    <React.Fragment>
      <div ref={cursorOuterRef} style={styles.cursorOuter} />
      <div ref={cursorInnerRef} style={styles.cursorInner} />
    </React.Fragment>
  );
}

export default AnimatedCursor;

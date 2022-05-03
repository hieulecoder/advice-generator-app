import styles from "./App.module.css";
import { ReactComponent as DesktopDivider } from "../images/pattern-divider-desktop.svg";
import { ReactComponent as MobileDivider } from "../images/pattern-divider-mobile.svg";
import { ReactComponent as DiceIcon } from "../images/icon-dice.svg";
import { useCallback, useEffect, useState } from "react";

const App = () => {
  const [isMobileSize, setIsMobileSize] = useState(false);
  const [advice, setAdvice] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getAdvice = useCallback(() => {
    setIsLoading(true);
    fetch("https://api.adviceslip.com/advice")
      .then((response) => response.json())
      .then(({ slip }) => {
        setAdvice({ id: slip.id, advice: slip.advice });
        setTimeout(() => setIsLoading(false), 1000);
      });
  }, []);

  useEffect(() => {
    getAdvice();
  }, [getAdvice]);

  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth <= 590) {
        setIsMobileSize(true);
      } else {
        setIsMobileSize(false);
      }
    };

    handleWindowResize();

    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <div className={styles.container}>
      <main>
        <h1>ADVICE #{advice ? advice.id : null}</h1>
        <p>&ldquo;{advice ? advice.advice : null}.&rdquo;</p>
        {isMobileSize ? <MobileDivider /> : <DesktopDivider />}
        <div
          className={`${styles.button} ${isLoading ? styles.loading : null}`}
          onClick={() => {
            if (!isLoading) {
              getAdvice();
            }
          }}
        >
          <DiceIcon />
        </div>
      </main>
    </div>
  );
};

export default App;

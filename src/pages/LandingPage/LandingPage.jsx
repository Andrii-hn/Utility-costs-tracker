import { useNavigate } from "react-router-dom"

import Benefits from "../../components/landing/Benefits/Benefits"
import CallToAction from "../../components/landing/CallToAction/CallToAction"
import Hero from "../../components/landing/Hero/Hero"

import styles from "./LandingPage.module.css"

function LandingPage() {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/login")
  }

  const handleDemoClick = () => {
    console.log("demo")
  } 

  return <>
    <div className={styles.page}>
      <Hero />
        <Benefits />
          <CallToAction
            onLoginClick={handleLoginClick}
            onDemoClick={handleDemoClick}    
          />
    </div>
  </>
}

export default LandingPage
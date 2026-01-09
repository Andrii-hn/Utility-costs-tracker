import Benefits from "../components/landing/Benefits"
import CallToAction from "../components/landing/CallToAction"
import Hero from "../components/landing/Hero"

import { useNavigate } from "react-router-dom"

function LandingPage() {
    const navigate = useNavigate();
    const handleLoginClick = () => {
        navigate("/login")
    }

    const handleDemoClick = () => {
        console.log("demo")
    } 

    return <>
        <Hero />
        <Benefits />
        <CallToAction
            onLoginClick={handleLoginClick}
            onDemoClick={handleDemoClick}    
         />
    </>
}

export default LandingPage
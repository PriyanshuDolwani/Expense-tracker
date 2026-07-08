import { useState } from "react";
import { useEffect } from "react";

function WelcomeBanner() {
  const user = JSON.parse(localStorage.getItem("user"));

  const hour = new Date().getHours();

  let greeting="";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  const messages = [
    "Every rupee tracked is a step toward financial freedom.",
    "Small savings today create big opportunities tomorrow.",
    "Your money deserves a smart manager — that's you.",
    "Stay consistent. Great finances are built one transaction at a time.",
    "Track wisely, spend mindfully, and grow confidently.",
    "Keep tracking. Wealth is built through consistency.",
    "Your future self will thank you for tracking today.",
    "Financial discipline beats financial stress.",
    "One smart decision at a time, you're building financial freedom.",
    "Every expense tells a story. Make yours meaningful.",
    "Budgeting isn't restriction — it's empowerment.",
    "You're in control of your money journey.",
  ];

  const [randomMessage,setRandomMessage] = useState(messages[new Date().getDate() % messages.length]);

  useEffect(()=>{
    const interval = setInterval(()=>{
        const newMessage = messages[Math.floor(Math.random()*messages.length)];
        setRandomMessage(newMessage);
    },10000);
    return ()=>clearInterval(interval);
  },[])
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-semibold text-gray-800">
        {greeting}, {user?.name || "User"}
      </h1>
      <p className="text-sm text-gray-500 mt-1">{randomMessage}</p>
    </div>
  );
}

export default WelcomeBanner;
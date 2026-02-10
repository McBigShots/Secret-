import { QuizQuestion, UserContext, Images } from './types';

export const USER_CONTEXT: UserContext = {
  proposer: "Adam",
  partner: "Baru",
  location: "Prague",
  duration: "1 year and 5 months",
  proposerJob: "Medical Student",
  proposerHobby: "Photography",
  proposerFood: "Majbus (Kuwaiti Chicken & Rice)",
  partnerJob: "Police School Student",
  partnerHobby: "Gym",
  partnerFood: "Pho Bo",
};

// REPLACE THESE URLS WITH YOUR ACTUAL IMAGE URLS
export const IMAGES: Images = {
  // Images are removed from display in App.tsx as requested
  pixelAvatars: "", 
  kissingPhoto: "" 
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Where did we first meet?",
    options: [
      "Coffee shop '' borinngggggg ''",
      "In School",
      "On Roblox 😒",
      "OmiTv 😎"
    ],
    correctAnswer: "OmiTv 😎"
  },
  {
    id: 2,
    question: "How long have we been together?",
    options: [
      "1 year exactly",
      "1 year and 5 months",
      "Feels like 84 years 👴",
      "2 years"
    ],
    correctAnswer: "1 year and 5 months"
  },
  {
    id: 3,
    question: "What is Adam's absolute favorite meal?",
    options: [
      "Pizza",
      "Pho Bo (That's yours!)",
      "Majbus",
      "Salad"
    ],
    correctAnswer: "Majbus"
  },
  {
    id: 4,
    question: "What does Adam like most about you?",
    options: [
      "Honesty",
      "How strong you are",
      "You are literally an angel on earth",
      "Your kind heart",
      "Your cooking"
    ],
    correctAnswer: "All of the above 'Batehka'",
    secretAnswer: "All of the above 'Batehka'" 
  }
];
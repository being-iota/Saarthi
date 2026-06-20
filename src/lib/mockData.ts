export interface ExplanationResponse {
  type: "explain";
  topic: string;
  explanation: string;
  analogy: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answerIndex: number;
}

export interface QuizResponse {
  type: "quiz";
  topic: string;
  questions: QuizQuestion[];
}

export interface RecallItem {
  question: string;
  answer: string;
}

export interface RevisionResponse {
  type: "revise";
  topic: string;
  bullets: string[];
  analogy: string;
  recall?: RecallItem[];
}

export const MOCK_TOPICS: Record<string, {
  explain: ExplanationResponse;
  revise: RevisionResponse;
  quiz: QuizResponse;
}> = {
  photosynthesis: {
    explain: {
      type: "explain",
      topic: "Photosynthesis",
      explanation: "Arey balako! Dhyaan se suno. Photosynthesis ka matlab hai plants ka apna chota dhaba! Green leaves (hamaari chef) sun ki garmi, hawa se carbon dioxide gas, aur roots se paani (H2O) lekar mast starch (khana) banati hain. Aur badle mein hume taazi oxygen gas deti hain saans lene ke liye!",
      analogy: "Jaise khet mein chulhe par paani aur chawal rakh ke kheer banti hai, waise hi patton ke chulhe par dhoop aur paani se plants apna khana banate hain!"
    },
    revise: {
      type: "revise",
      topic: "Photosynthesis",
      bullets: [
        "Arey balako, plants sunlight, Carbon Dioxide, aur roots se paani lekar khana banate hain.",
        "Chlorophyll in green leaves acts as the head chef, capturing sun's energy.",
        "Process ke baad oxygen gas chodi jati hai jo hamare breath karne ke liye zaroori hai.",
        "Starch/Glucose plants ka khana hai jise ye store karke rakhte hain.",
        "Yeh kaam sirf din mein dhoop mein hota hai, raat ko kitchen band rehta hai!"
      ],
      analogy: "Leaves are the kitchen of the plant, Sunlight is the stove, and Chlorophyll is the head chef!",
      recall: [
        {
          question: "Photosynthesis kya hota hai aur yeh plants ke liye kyun zaroori hai?",
          answer: "Photosynthesis plants dwara sunlight, CO2 aur water ko use karke carbohydrates (food) banane ka process hai. Isi se plants ko energy milti hai."
        },
        {
          question: "Leaves mein green color kis wajah se hota hai aur iska kya kaam hai?",
          answer: "Leaves mein green color Chlorophyll pigment ki wajah se hota hai. Yeh chef ki tarah kaam karta hai aur sunlight ko capture karta hai."
        },
        {
          question: "Photosynthesis process ke baad kaun si gas release hoti hai?",
          answer: "Photosynthesis process mein Oxygen gas release hoti hai, jo saare living beings ke saans lene ke liye zaroori hai."
        }
      ]
    },
    quiz: {
      type: "quiz",
      topic: "Photosynthesis",
      questions: [
        {
          question: "Arey balako batao, plants khana banane ke liye hawa (air) se kaun si gas sarakte hain?",
          options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"],
          answerIndex: 1
        },
        {
          question: "Patton ka green colour kis pigment ki wajah se dikhta hai?",
          options: ["Melanin", "Hemoglobin", "Chlorophyll", "Xanthophyll"],
          answerIndex: 2
        },
        {
          question: "Photosynthesis ke baad plants hume kaun sa uphar (gas) dete hain jo humare liye zaroori hai?",
          options: ["Carbon Dioxide", "Oxygen", "Water Vapor", "Smoke"],
          answerIndex: 1
        }
      ]
    }
  },
  gravity: {
    explain: {
      type: "explain",
      topic: "Gravity (Gurutvakarshan)",
      explanation: "Arey balako! Socho, jab tum kabaddi mein red maar ke aasmaan ki taraf koodte ho, toh zameen par wapas kaise aate ho? Wo hai dharti maa ka adrishya khinchav—Gravity! Agar gravity na ho, toh hum sab, hamare geometry box aur school bus sab space mein gas ke gubbare ki tarah float kar rahe hote!",
      analogy: "Jaise Haryana Roadways ki bus mod par sabko ek taraf khinch leti hai, waise hi gravity humein floor se chipkake rakhti hai taaki hum ud na jayein!"
    },
    revise: {
      type: "revise",
      topic: "Gravity (Gurutvakarshan)",
      bullets: [
        "Gravity ek adrishya (invisible) pulling force hai jo heavy objects lagati hain.",
        "Dharti maa har cheez ko apne center ki taraf khinchti hai, jisse hum tike rehte hain.",
        "Sir Isaac Newton ne iski khoj ki thi jab unke sar par ek apple aake gira tha.",
        "Jitna zyada mass, utna hi strong gravity ka pull (Earth vs Moon).",
        "Agar gravity gayab ho jaye, toh paani aur hawa sab space mein bhaag jayenge."
      ],
      analogy: "Earth ek bohot bada magnet hai jo pure classroom ko floor se chipka kar rakhta hai!",
      recall: [
        {
          question: "Gravity kya hai aur yeh humare liye kya karti hai?",
          answer: "Gravity Earth ka ek invisible pull hai jo har massive object ko apni taraf khinchta hai, jisse hum sab zameen par tike rehte hain."
        },
        {
          question: "Gravity ko kisne aur kaise discover kiya tha?",
          answer: "Sir Isaac Newton ne gravity discover ki thi jab unhone ek seb ko ped se niche girte dekha tha."
        },
        {
          question: "Moon aur Earth ki gravity mein kya difference hai?",
          answer: "Moon ki gravity Earth ke mukable bohot kam hai (lagbhag 1/6th of Earth), kyunki moon ka mass Earth se kam hai."
        }
      ]
    },
    quiz: {
      type: "quiz",
      topic: "Gravity (Gurutvakarshan)",
      questions: [
        {
          question: "Suno bhai, gravity ki khoj kis scientist ne ki thi jab unke sar par seb gira?",
          options: ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Aryabhata"],
          answerIndex: 1
        },
        {
          question: "Agar dharti se gravity bilkul gayab ho jaye, toh kya haal hoga?",
          options: ["Hum tezi se daudenge", "Hum space mein float karne lagenge", "Kuch farq nahi padega", "Hum floor se chipak jayenge"],
          answerIndex: 1
        },
        {
          question: "Moon ki gravity Earth ke mukable kaisi hoti hai, batao?",
          options: ["Ekdam barabar", "Bohot zyada", "Kam hoti hai (1/6th of Earth)", "Bilkul zero"],
          answerIndex: 2
        }
      ]
    }
  },
  "water cycle": {
    explain: {
      type: "explain",
      topic: "Water Cycle (Jal Chakra)",
      explanation: "Suno bhai balako! Jal chakra (Water Cycle) paani ki apni ek lambi yatra hai. Suraj chacha nadiyon aur talaabo ke paani ko bhaap (evaporation) banakar aasmaan mein udate hain. Wahan thanda hokar badal (condensation) banta hai, aur fir mast baarish (precipitation) bankar zameen par baras jata hai. Paani ki ye non-stop ride chalti rehti hai!",
      analogy: "Jaise khet mein tube-well ka paani behkar wapas zameen mein chala jata hai aur dhoop se udta hai, waise hi nature paani ko recycle karti hai."
    },
    revise: {
      type: "revise",
      topic: "Water Cycle (Jal Chakra)",
      bullets: [
        "Evaporation: Suraj ki garmi se paani bhaap (vapour) banakar aasmaan mein udta hai.",
        "Condensation: Vapour thanda hokar badal (clouds) ka roop le leta hai.",
        "Precipitation: Badal jab bohot bhari ho jate hain toh baarish ban kar baraste hain.",
        "Collection: Baarish ka paani rivers aur oceans mein jama hokar cycle poora karta hai.",
        "Jal chakra earth par paani ka balance banaye rakhne ke liye sabse zaroori hai."
      ],
      analogy: "Jaise nature ek bohot bada filter plant chalati hai paani ko recycle karne ke liye!",
      recall: [
        {
          question: "Water Cycle (Jal Chakra) kya hota hai?",
          answer: "Water Cycle paani ka badal banna (evaporation/condensation) aur fir baarish bankar wapas zameen par girne aur rivers/oceans mein collect hone ka ek continuous natural process hai."
        },
        {
          question: "Evaporation aur Condensation mein kya difference hai?",
          answer: "Evaporation mein liquid water suraj ki garmi se gas (vapour) bankar udta hai. Condensation mein wahi vapour thanda hokar liquid droplets (clouds) mein convert hota hai."
        },
        {
          question: "Precipitation kise kehte hain?",
          answer: "Precipitation badalon se paani ka liquid (baarish) ya solid (snow/haill) ke roop mein zameen par girne ko kehte hain."
        }
      ]
    },
    quiz: {
      type: "quiz",
      topic: "Water Cycle (Jal Chakra)",
      questions: [
        {
          question: "Arey balako, paani ka bhaap (gas) bankar aasmaan mein udna kya kehlata hai?",
          options: ["Condensation", "Precipitation", "Evaporation", "Freezing"],
          answerIndex: 2
        },
        {
          question: "Clouds (badal) ka banna kis process ki wajah se hota hai?",
          options: ["Evaporation", "Condensation", "Collection", "Precipitation"],
          answerIndex: 1
        },
        {
          question: "Baarish ya barf ka zameen par girna kya kehlata hai, batao?",
          options: ["Precipitation", "Evaporation", "Melting", "Boiling"],
          answerIndex: 0
        }
      ]
    }
  },
  arrays: {
    explain: {
      type: "explain",
      topic: "Arrays in Programming",
      explanation: "Arey balako! Array ko coding ka 'railway compartment' samajho! Ek ke baad ek lagatar dibbe (contiguous memory) jisme saara data ek hi data type ka hota hai. Har dibbe ka ek fixed number hota hai jise hum 'index' kehte hain. Aur yaad rakhna, indexing humesha 0 se shuru hoti hai, 1 se nahi!",
      analogy: "Jaise khet mein gannay (sugarcane) ki tray mein saare gannay ek ke baad ek sequential line mein lage hote hain aur hum index 0, 1, 2... se count karte hain, wahi array hai."
    },
    revise: {
      type: "revise",
      topic: "Arrays in Programming",
      bullets: [
        "Array same data type ke elements ko continuous memory blocks mein store karta hai.",
        "Array elements ko direct access karne ke liye zero-based indexing (0, 1, 2...) use hoti hai.",
        "Static array ka size humesha fixed hota hai, ise banane ke baad change nahi kiya ja sakta.",
        "Index pata ho toh element ko nikalna bohot fast (O(1) complexity) hota hai.",
        "Insertion aur deletion slwo ho sakta hai kyunki elements ko shift karna padta hai."
      ],
      analogy: "Jaise building ke flats ke numbers sequential (101, 102, 103...) hote hain, waise hi arrays ke elements sequential locations par hote hain.",
      recall: [
        {
          question: "Array elements memory mein kaise store hote hain?",
          answer: "Array elements contiguous (continuous) memory locations mein sequential order mein store hote hain."
        },
        {
          question: "Array ka first element kis index par hota hai?",
          answer: "Array zero-based indexing use karta hai, isliye first element humesha index 0 par hota hai."
        },
        {
          question: "Array mein index ke through element access karne ki time complexity kya hoti hai?",
          answer: "Index ke through element access karne ki time complexity O(1) ya constant time hoti hai."
        }
      ]
    },
    quiz: {
      type: "quiz",
      topic: "Arrays in Programming",
      questions: [
        {
          question: "Arey balako batao, array ka index kahan se shuru hota hai?",
          options: ["1", "0", "-1", "Kisi bhi number se"],
          answerIndex: 1
        },
        {
          question: "Array elements ke memory locations kaise hote hain?",
          options: ["Contiguous (Sequential/Continuous)", "Random", "Linked", "Scatter"],
          answerIndex: 0
        },
        {
          question: "Agar array ka size 5 hai, toh uske aakhiri element ka index kya hoga?",
          options: ["5", "4", "6", "Kuch bhi ho sakta hai"],
          answerIndex: 1
        }
      ]
    }
  }
};

export function getMockResponse(topic: string, mode: "explain" | "quiz" | "revise", context?: string) {
  const cleanTopic = topic.toLowerCase().trim();
  
  // Try to find direct match
  for (const key of Object.keys(MOCK_TOPICS)) {
    if (cleanTopic.includes(key) || key.includes(cleanTopic)) {
      return MOCK_TOPICS[key][mode];
    }
  }

  // Fallback dynamic generator
  const displayTopic = topic.charAt(0).toUpperCase() + topic.slice(1);
  
  // If context is provided and has actual text, extract sentences to make dynamic guide
  if (context && context.trim().length > 100) {
    const sentences = context
      .split(/\s*\.(?!\d)\s*|\s*[!?]\s*/)
      .map(s => s.trim().replace(/\s+/g, " "))
      .filter(s => s.length > 25 && s.length < 250 && !/^[0-9\s.]+$/.test(s) && !/\\/.test(s) && !/[«»¤•Û¬|î¿‡–]/.test(s));

    if (sentences.length >= 3) {
      if (mode === "explain") {
        const explanation = `Arey bachon, chalo aaj hum seekhte hain ${displayTopic} ke baare mein! ${sentences[0]}. ${sentences[1]}.`;
        const analogy = `Jaise hum daily life mein steps follow karke coordination banate hain, waise hi ${displayTopic} ke concepts structured tarike se kaam karte hain.`;
        return {
          type: "explain",
          topic: displayTopic,
          explanation,
          analogy
        };
      } else if (mode === "revise") {
        const bullets = sentences.slice(0, 5);
        while (bullets.length < 5) {
          bullets.push(`${displayTopic} concepts provide necessary structures for this topic.`);
        }
        const recall = [
          {
            question: `${displayTopic} ka basic structure kya explain karta hai?`,
            answer: bullets[0]
          },
          {
            question: `${displayTopic} ke rules ya description ke baare mein kya likha hai?`,
            answer: bullets[1] || bullets[0]
          },
          {
            question: `${displayTopic} ka ek aur core point kya hai?`,
            answer: bullets[2] || bullets[0]
          }
        ];
        return {
          type: "revise",
          topic: displayTopic,
          bullets,
          analogy: `Jaise school schedule mein classes arranged hoti hain, waise hi ye points connected hain.`,
          recall
        };
      } else {
        // Mode is quiz
        const questions = [
          {
            question: `In reference to ${displayTopic}, select the true statement:`,
            options: [
              sentences[0],
              `It is completely unrelated to ${displayTopic}.`,
              "It is an obsolete concept with no practical usage.",
              "None of the options are correct."
            ],
            answerIndex: 0
          },
          {
            question: `Which of the following is correct regarding ${displayTopic}?`,
            options: [
              "It is not defined in this document.",
              sentences[1] || `${displayTopic} is a key learning point.`,
              "It only operates under zero conditions.",
              "Both A and C."
            ],
            answerIndex: 1
          },
          {
            question: `Identify the main description of ${displayTopic}:`,
            options: [
              "It cannot be analyzed or documented.",
              "It represents a constant value of zero.",
              sentences[2] || `${displayTopic} represents an important conceptual foundation.`,
              "It has no specific definition."
            ],
            answerIndex: 2
          }
        ];
        return {
          type: "quiz",
          topic: displayTopic,
          questions
        };
      }
    }
  }

  // Absolute fallback if no context or text is too short/junk
  if (mode === "explain") {
    return {
      type: "explain",
      topic: displayTopic,
      explanation: `Arey bachon, ${displayTopic} bohot hi simple aur interactive concept hai! Yeh hamari study guides aur classes mein bar-bar use hota hai. Isko dhyan se samajhna chahiye. Iski basic explanation real-life systems aur process par depend karti hai!`,
      analogy: `Jaise dadi maa kitchen mein khana banane ke liye ingredients set karti hain, waise hi ${displayTopic} elements ko organize karta hai.`
    };
  } else if (mode === "revise") {
    return {
      type: "revise",
      topic: displayTopic,
      bullets: [
        `${displayTopic} forms the foundational base for all upcoming lessons.`,
        "Understanding this topic helps in solving complex exam questions.",
        "Key formulas and structural components should be reviewed daily.",
        "Always practice with real-world problems to master the topic.",
        "Refer to standard classroom materials for deeper insights."
      ],
      analogy: `Jaise calendar mein dates sequence wise hoti hain, waise hi ${displayTopic} points arranged hain.`,
      recall: [
        {
          question: `${displayTopic} topic ka study purpose kya hai?`,
          answer: `Iska primary purpose ${displayTopic} ke concepts ko simple real-world cases ke saath connect karna hai.`
        },
        {
          question: `Is topic ko hum exams ke liye kaise revise karein?`,
          answer: "Hum real-world analogies aur standard points se isko simple revision notes se revise kar sakte hain."
        },
        {
          question: `Exams mein is topic ka kitna weightage hota hai?`,
          answer: "Yeh aamtaur par high-weightage topic hota hai, isliye iske questions score karne ke liye perfect hain."
        }
      ]
    };
  } else {
    return {
      type: "quiz",
      topic: displayTopic,
      questions: [
        {
          question: `Hum ${displayTopic} ko daily life mein kahan dekh sakte hain?`,
          options: ["Market ke prices mein", "Classroom whiteboard par", "Khelte aur daudte waqt", "Upar diye gaye sabhi options sahi hain"],
          answerIndex: 3
        },
        {
          question: `${displayTopic} ka sabse basic rule kya hai?`,
          options: ["Concepts ko rathna", "Concepts ko daily life se samajhna", "Questions ko ignore karna", "Bina padhe exam dena"],
          answerIndex: 1
        },
        {
          question: `Agar hum ${displayTopic} ko practical life mein use karein, toh kya hoga?`,
          options: ["Sab mushkil ho jayega", "Samajhna bohot aasan ho jayega", "Hum padhna chhod denge", "Teacher gussa karenge"],
          answerIndex: 1
        }
      ]
    };
  }
}

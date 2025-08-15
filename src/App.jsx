import React, { useState, useEffect } from 'react';

// Main App component
const App = () => {
  // State to hold the current play call for Alignment Challenge
  const [playCall, setPlayCall] = useState('');
  
  // States to store the user's placement of X, Y, Z, and H players (for Alignment Challenge)
  const [xPlayerPositionUser, setXPlayerPositionUser] = useState(null);
  const [yPlayerPositionUser, setYPlayerPositionUser] = useState(null);
  const [zPlayerPositionUser, setZPlayerPositionUser] = useState(null);
  // H player placement now uses a single cell to store the clicked position,
  // but the rendering logic is conditional based on the play call.
  const [hPlayerPositionUser, setHPlayerPositionUser] = useState(null);

  // States to store the CORRECT positions of X, Y, Z, and H players (for Alignment Challenge)
  // For H player, this is an array of valid positions to handle "in-between" placements.
  const [correctXPosition, setCorrectXPosition] = useState(null);
  const [correctYPosition, setCorrectYPosition] = useState(null);
  const [correctZPosition, setCorrectZPosition] = useState(null);
  const [correctHPosition, setCorrectHPosition] = useState(null);
  
  // State to store feedback message (for below the grid, for both challenges)
  const [feedbackMessage, setFeedbackMessage] = useState('');
  
  // States to track if the user's placement for each player is correct (for Alignment Challenge)
  const [isXPlayerCorrect, setIsXPlayerCorrect] = useState(null);
  const [isYPlayerCorrect, setIsYPlayerCorrect] = useState(null); 
  const [isZPlayerCorrect, setIsZPlayerCorrect] = useState(null);
  const [isHPlayerCorrect, setIsHPlayerCorrect] = useState(null);

  // State to track which player the user is currently placing (for Alignment Challenge)
  const [playerToPlace, setPlayerToPlace] = useState('Y');

  // State for the score, initialized to 0
  const [score, setScore] = useState(0);

  // State to control the visibility of the runner popup (for Alignment Challenge)
  const [showRunnerPopup, setShowRunnerPopup] = useState(false);
  // State to store the name of the correct runner player (for Alignment Challenge)
  const [correctRunnerPlayer, setCorrectRunnerPlayer] = useState(null);
  // State for the message within the runner popup (for Alignment Challenge)
  const [runnerPopupMessage, setRunnerPopupMessage] = useState('');

  // State to manage the current phase of the game (within a game mode)
  const [gamePhase, setGamePhase] = useState('alignment'); // 'alignment', 'runnerGuess', 'runSpotGuess', 'readyForNewPlay'
  
  // State to manage the overall game mode
  const [gameMode, setGameMode] = useState('selection'); // 'selection', 'playAlignment', 'guessPlayCall'

  // State to store the correct grid coordinates for the run spot (for Alignment Challenge)
  const [correctRunSpot, setCorrectRunSpot] = useState(null);

  // NEW: States for Guess Play Call Challenge
  const [currentPlayImage, setCurrentPlayImage] = useState('');
  const [correctPlayCallForImage, setCorrectPlayCallForImage] = useState('');
  const [userPlayCallGuess, setUserPlayCallGuess] = useState('');
  const [guessPlayCallFeedback, setGuessPlayCallFeedback] = useState('');
  const [currentPlayIndex, setCurrentPlayIndex] = useState(0); // To cycle through plays

  // Define your play images and their corresponding correct play calls
  const playsData = [
    { 
      image: 'image_6f382b.png', // Removed leading slash for local dev server compatibility
      playCall: 'Right C 20' 
    },
    {
      image: 'image_708262.png', // Added the new play image
      playCall: 'Right 4 20' // Correct play call for the new image
    },
    {
      image: 'image_708e20.png', // Added the new play image
      playCall: 'Right C 10' // Correct play call for the new image
    },
    {
      image: 'image_709d44.png', // Added the new play image
      playCall: 'Right 4 10' // Correct play call for the new image
    },
    {
      image: 'image_70f687.png', // Added the new play image
      playCall: 'Right A 24 Power' // Correct play call for the new image
    },
    {
      image: 'image_70fe02.png', // Added the new play image
      playCall: 'Right C Empty 18 Sweep' // Correct play call for the new image
    },
    {
      image: 'image_7102a0.png', // Added the new play image
      playCall: 'Left C Fake 21 QB Keep Right' // Correct play call for the new image
    },
    {
      image: 'image_7109e3.png', // Added the new play image
      playCall: 'Left 3 48 Reverse Right' // Corrected play call for the image
    },
    {
      image: 'image_7110e9.png', // Added the new play image
      playCall: 'Right D 28 Sweep' // Correct play call for the new image
    },
    {
      image: 'image_71156a.png', // Added the new play image
      playCall: 'Left C 21' // Correct play call for the new image
    },
    {
      image: 'image_7afb0f.png', // Added the new play image
      playCall: 'Left 4 21' // Correct play call for the new image
    },
    {
      image: 'image_7b022b.png', // Added the new play image
      playCall: 'Left 4 11' // Correct play call for the new image
    },
    {
      image: 'image_7b0975.png', // Added the new play image
      playCall: 'Left A 25 Power' // Correct play call for the new image
    },
    {
      image: 'image_7b0e2d.png', // Added the new play image
      playCall: 'Right C Fake 20 QB Keep Left' // Correct play call for the new image
    },
    {
      image: 'image_7b1554.png', // Added the new play image
      playCall: 'Left D 29 Sweep' // Correct play call for the new image
    },
    {
      image: 'image_7dc750.png', // Added the new play image
      playCall: 'Left 4 Fake 20 Hawk' // Correct play call for the new image
    },
    {
      image: 'image_7dcc04.png', // Added the new play image
      playCall: 'Left Trips Right H Screen Pass' // Correct play call for the new image
    },
    {
      image: 'image_7dd332.png', // Added the new play image
      playCall: 'Right 4 Fake 21 Hawk' // Correct play call for the new image
    },
    {
      image: 'image_7e290c.png', // Added the new play image
      playCall: 'Lex 4 Florida' // Correct play call for the new image
    },
    {
      image: 'image_7e2dbf.png', // Added the new play image
      playCall: 'Lex 4 Arrow' // Correct play call for the new image
    },
    {
      image: 'image_7e34cb.png', // Added the new play image
      playCall: 'Lex 4 Smash' // Correct play call for the new image
    },
    {
      image: 'image_7e3f93.png', // Added the new play image
      playCall: 'Lex 4 Vegas' // Correct play call for the new image
    },
    {
      image: 'image_7e4424.png', // Added the new play image
      playCall: 'Lex 4 Smoke' // Correct play call for the new image
    },
    {
      image: 'image_7e9a1e.png', // Added the new play image
      playCall: 'Lex 4 Hawk' // Correct play call for the new image
    },
    {
      image: 'image_7ea105.png', // Added the new play image
      playCall: 'Lex 4 Sniper' // Correct play call for the new image
    },
    {
      image: 'image_7ea584.png', // Added the new play image
      playCall: 'Lex 4 Devil' // Correct play call for the new image
    }
    // Add more plays as you get the images
  ];


  // Initial player positions for the offensive line and QB (for Alignment Challenge)
  const [players, setPlayers] = useState([
    { name: 'LT', row: 1, col: 8 },
    { name: 'LG', row: 1, col: 9 },
    { name: 'C', row: 1, col: 10 },
    { name: 'RG', row: 1, col: 11 },
    { name: 'RT', row: 1, col: 12 },
    { name: 'QB', row: 4, col: 10 }
  ]);

  // List of all possible Y player placement cells (for Alignment Challenge)
  const yPlayerPossibilities = [
    { row: 1, col: 13 },
    { row: 2, col: 13 },
    { row: 2, col: 16 },
    { row: 1, col: 7 },
    { row: 2, col: 7 },
    { row: 2, col: 4 }
  ];

  // List of all possible X player placement cells (for Alignment Challenge)
  const xPlayerPossibilities = [
    { row: 1, col: 1 },
    { row: 2, col: 1 }
  ];

  // List of all possible Z player placement cells (for Alignment Challenge)
  const zPlayerPossibilities = [
    { row: 1, col: 19 },
    { row: 2, col: 19 }
  ];

  // List of all possible H player placement cells (for Alignment Challenge)
  const hPlayerPossibilities = [
    { row: 5, col: 9 },
    { row: 5, col: 11 },
    { row: 2, col: 8 },
    { row: 2, col: 9 },
    { row: 2, col: 11 },
    { row: 2, col: 12 },
    { row: 2, col: 7 },
    { row: 2, col: 13 },
    { row: 2, col: 3 },
    { row: 2, col: 17 }
  ];

  // Mapping for the numbers above the grid with their 1-indexed column for display and target (for Alignment Challenge)
  // 'lineIndex' represents the 1-indexed grid line that the number should be centered over.
  // 'targetCol' is the actual column number the number represents.
  const gridNumberPositions = [
    { lineIndex: 2, num: '9', targetCol: 2 },  // "9" horizontally between 1:2 and 1:3 (above line 2)
    { lineIndex: 6, num: '7', targetCol: 6 },  // "7" horizontally between 1:6 and 1:7 (above line 6)
    { lineIndex: 7, num: '5', targetCol: 7 },  // "5" horizontally between 1:7 and 1:8 (above line 7)
    { lineIndex: 8, num: '3', targetCol: 8 },  // "3" horizontally between 1:8 and 1:9 (above line 8)
    { lineIndex: 9, num: '1', targetCol: 9 },  // "1" horizontally between 1:9 and 1:10 (above line 9)
    { lineIndex: 10, num: '0', targetCol: 10 }, // "0" horizontally between 1:10 and 1:11 (above line 10)
    { lineIndex: 11, num: '2', targetCol: 11 }, // "2" horizontally between 1:11 and 1:12 (above line 11)
    { lineIndex: 12, num: '4', targetCol: 12 }, // "4' horizontally between 1:12 and 1:13 (above line 12)
    { lineIndex: 13, num: '6', targetCol: 13 }, // "6" horizontally between 1:13 and 1:14 (above line 13)
    { lineIndex: 17, num: '8', targetCol: 17 }, // "8" horizontally between 1:17 and 1:18 (above line 17)
  ];

  // Mapping for the last digit of the play call to the target column for the run spot (for Alignment Challenge)
  const runSpotColumnMapping = {
    0: 10, // '0' spot is column 10
    1: 9,  // '1' spot is column 9
    2: 11, // '2' spot is column 11
    3: 8,  // '3' spot is column 8
    4: 12, // '4' spot is column 12
    5: 7,  // '5' spot is column 7
    6: 13, // '6' spot is column 13
    7: 6,  // '7' spot is column 6
    8: 17, // '8' spot is column 17
    9: 2,  // '9' spot is column 2
  };

  /**
   * Generates a new random play call and resets the game state for Alignment Challenge.
   */
  const generatePlayCall = () => {
    // Arrays of possible values for the play call
    const firstNames = ["Right", "Rip", "Rock", "Left", "Liz", "Lex"];
    const secondValues = ["1", "2", "3", "4", "A", "B", "C", "D"];
    const thirdValuesDecades = [10, 20, 40, 50, 60, 70];

    let randomFirstName, randomSecondValue, randomThirdValue, tempPlayCall;

    // Use a do-while loop to generate a new call until it is not a forbidden combination.
    do {
      randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      randomSecondValue = secondValues[Math.floor(Math.random() * secondValues.length)];
      tempPlayCall = randomFirstName + ' ' + randomSecondValue;
    } while (
      tempPlayCall === "Rip C" ||
      tempPlayCall === "Liz C" ||
      tempPlayCall === "Rock D" ||
      tempPlayCall === "Lex D"
    );

    // Generate the third value from the specified decades
    const randomDecade = thirdValuesDecades[Math.floor(Math.random() * thirdValuesDecades.length)];
    const randomDigit = Math.floor(Math.random() * 10);
    randomThirdValue = randomDecade + randomDigit;

    // Final concatenated value with all three parts
    const finalPlayCall = `${tempPlayCall} ${randomThirdValue}`;

    // Determine the correct runner player based on the first digit of randomThirdValue
    const runnerDigit = Math.floor(randomThirdValue / 10);
    let runnerPlayerName;
    switch (runnerDigit) {
      case 1: runnerPlayerName = 'QB'; break;
      case 2: runnerPlayerName = 'F'; break;
      case 4: runnerPlayerName = 'H'; break;
      case 5: runnerPlayerName = 'Y'; break;
      case 6: runnerPlayerName = 'X'; break;
      case 7: runnerPlayerName = 'Z'; break;
      default: runnerPlayerName = 'Unknown'; break; // Fallback, should not happen with current decades
    }
    setCorrectRunnerPlayer(runnerPlayerName);

    // Determine the correct run spot based on the last digit of randomThirdValue
    const lastDigit = randomThirdValue % 10;
    const targetCol = runSpotColumnMapping[lastDigit];
    setCorrectRunSpot({ row: 1, col: targetCol }); // Run spot is always in row 1

    // --- Logic to pre-calculate CORRECT positions for X, Y, Z, and H players based on the play call ---
    let newCorrectXPosition, newCorrectYPosition, newCorrectZPosition, newCorrectHPosition;
    
    // Y-Player Logic
    switch (randomFirstName) {
      case 'Right':
        newCorrectYPosition = { row: 1, col: 13 };
        break;
      case 'Rip':
        newCorrectYPosition = { row: 2, col: 13 };
        break;
      case 'Rock':
        newCorrectYPosition = { row: 2, col: 16 };
        break;
      case 'Left':
        newCorrectYPosition = { row: 1, col: 7 };
        break;
      case 'Liz':
        newCorrectYPosition = { row: 2, col: 7 };
        break;
      case 'Lex':
        newCorrectYPosition = { row: 2, col: 4 };
        break;
      default:
        newCorrectYPosition = null; // Should not happen with the current logic
        break;
    }

    // X and Z Player Logic
    switch (randomFirstName) {
      case 'Left':
        newCorrectXPosition = { row: 2, col: 1 };
        newCorrectZPosition = { row: 1, col: 19 }; 
        break;
      case 'Liz':
      case 'Lex':
        newCorrectXPosition = { row: 1, col: 1 };
        newCorrectZPosition = { row: 1, col: 19 };
        break;
      case 'Right':
        newCorrectXPosition = { row: 1, col: 1 };
        newCorrectZPosition = { row: 2, col: 19 };
        break;
      case 'Rip':
      case 'Rock':
        newCorrectXPosition = { row: 1, col: 1 };
        newCorrectZPosition = { row: 1, col: 19 };
        break;
      default:
        newCorrectXPosition = { row: 1, col: 1 };
        newCorrectZPosition = { row: 1, col: 19 };
        break;
    }

    // H-Player Logic
    const yIsOnRight = ['Right', 'Rip', 'Rock'].includes(randomFirstName);
    const secondValueIsLetter = ['A', 'B', 'C', 'D'].includes(randomSecondValue);
    const hIsOnRight = (yIsOnRight && secondValueIsLetter) || (!yIsOnRight && !secondValueIsLetter);

    // Determine H's position based on the second value and the side
    switch (randomSecondValue) {
      case 'A':
        newCorrectHPosition = hIsOnRight ? [{ row: 5, col: 11 }] : [{ row: 5, col: 9 }];
        break;
      case 'B':
        // For 'B' plays, the positions are always "in between"
        newCorrectHPosition = hIsOnRight ? [{ row: 2, col: 11 }, { row: 2, col: 12 }] : [{ row: 2, col: 8 }, { row: 2, col: 9 }];
        break;
      case 'C':
        newCorrectHPosition = hIsOnRight ? [{ row: 2, col: 13 }] : [{ row: 2, col: 7 }];
        break;
      case 'D':
        newCorrectHPosition = hIsOnRight ? [{ row: 2, col: 17 }] : [{ row: 2, col: 3 }];
        break;
      case '1':
        newCorrectHPosition = hIsOnRight ? [{ row: 5, col: 11 }] : [{ row: 5, col: 9 }];
        break;
      case '2':
        // For '2' plays, the positions are always "in between"
        newCorrectHPosition = hIsOnRight ? [{ row: 2, col: 11 }, { row: 2, col: 12 }] : [{ row: 2, col: 8 }, { row: 2, col: 9 }];
        break;
      case '3':
        newCorrectHPosition = hIsOnRight ? [{ row: 2, col: 13 }] : [{ row: 2, col: 7 }];
        break;
      case '4':
        newCorrectHPosition = hIsOnRight ? [{ row: 2, col: 17 }] : [{ row: 2, col: 3 }];
        break;
      default:
        newCorrectHPosition = null;
        break;
    }

    // Update state with new play call and reset the game for a new round
    setPlayCall(finalPlayCall);
    setCorrectXPosition(newCorrectXPosition);
    setCorrectYPosition(newCorrectYPosition);
    setCorrectZPosition(newCorrectZPosition);
    setCorrectHPosition(newCorrectHPosition);
    
    setXPlayerPositionUser(null);
    setYPlayerPositionUser(null);
    setZPlayerPositionUser(null);
    setHPlayerPositionUser(null);
    
    // Initial feedback for the new placement order
    setFeedbackMessage('Place the Y player on the grid.');
    setIsXPlayerCorrect(null);
    setIsYPlayerCorrect(null);
    setIsZPlayerCorrect(null);
    setIsHPlayerCorrect(null);
    
    // Start the placement with 'Y'
    setPlayerToPlace('Y');
    // Ensure runner popup is hidden when a new play is generated
    setShowRunnerPopup(false);
    // Clear runner popup message on new play
    setRunnerPopupMessage('');
    // Reset game phase
    setGamePhase('alignment');
  };

  // Only generate a play call if the game mode is 'playAlignment'
  useEffect(() => {
    if (gameMode === 'playAlignment') {
      generatePlayCall();
    } else if (gameMode === 'guessPlayCall') {
      // Initialize the first play for the Guess Play Call Challenge
      // This will now use the currentPlayIndex which should be 0 from selectGameMode
      // And then increment it for the *next* play.
      loadNextPlayImage(); 
    }
  }, [gameMode]); // Run this effect when gameMode changes

  /**
   * Handles the user's click on a grid cell (for Alignment Challenge).
   */
  const handleCellClick = (row, col) => {
    // Prevent clicks on the grid if the runner popup is active or if not in alignment phase
    if (showRunnerPopup || gamePhase !== 'alignment' || gameMode !== 'playAlignment') {
      return;
    }

    const newPosition = { row: row + 1, col: col + 1 };

    // Clear any previous feedback colors and message
    setIsXPlayerCorrect(null);
    setIsYPlayerCorrect(null);
    setIsZPlayerCorrect(null);
    setIsHPlayerCorrect(null);
    setFeedbackMessage('');

    // Check if the clicked cell is occupied by a fixed player (OL or QB)
    const isFixedOccupied = players.some(p => p.row === newPosition.row && p.col === newPosition.col);
    if (isFixedOccupied) {
      setFeedbackMessage("That cell is already occupied by a fixed player!");
      return;
    }
    
    // Logic to handle "picking up" a user-placed player
    if (yPlayerPositionUser && yPlayerPositionUser.row === newPosition.row && yPlayerPositionUser.col === newPosition.col) {
        setYPlayerPositionUser(null);
        setPlayerToPlace('Y');
        setFeedbackMessage('You picked up the Y player. Place it in a new spot.');
        return;
    }
    if (xPlayerPositionUser && xPlayerPositionUser.row === newPosition.row && xPlayerPositionUser.col === newPosition.col) {
        setXPlayerPositionUser(null);
        setPlayerToPlace('X');
        setFeedbackMessage('You picked up the X player. Place it in a new spot.');
        return;
    }
    if (zPlayerPositionUser && zPlayerPositionUser.row === newPosition.row && zPlayerPositionUser.col === newPosition.col) {
        setZPlayerPositionUser(null);
        setPlayerToPlace('Z');
        setFeedbackMessage('You picked up the Z player. Place it in a new spot.');
        return;
    }
    if (hPlayerPositionUser && hPlayerPositionUser.row === newPosition.row && hPlayerPositionUser.col === newPosition.col) {
        setHPlayerPositionUser(null);
        setPlayerToPlace('H');
        setFeedbackMessage('You picked up the H player. Place it in a new spot.');
        return;
    }

    // Check if the new position is occupied by another user-placed player
    const isUserOccupied = (xPlayerPositionUser && xPlayerPositionUser.row === newPosition.row && xPlayerPositionUser.col === newPosition.col) ||
                            (yPlayerPositionUser && yPlayerPositionUser.row === newPosition.row && yPlayerPositionUser.col === newPosition.row) ||
                            (zPlayerPositionUser && zPlayerPositionUser.row === newPosition.row && zPlayerPositionUser.col === newPosition.col) ||
                            (hPlayerPositionUser && hPlayerPositionUser.row === newPosition.row && hPlayerPositionUser.col === newPosition.col);
    if (isUserOccupied) {
      setFeedbackMessage("That cell is already occupied by a player!");
      return;
    }

    // Place the current player in the clicked cell
    switch (playerToPlace) {
      case 'Y':
        setYPlayerPositionUser(newPosition);
        if (!xPlayerPositionUser) {
          setPlayerToPlace('X');
          setFeedbackMessage('Place the X player on the grid.');
        } else if (!zPlayerPositionUser) {
          setPlayerToPlace('Z');
          setFeedbackMessage('Place the Z player on the grid.');
        } else if (!hPlayerPositionUser) {
          setPlayerToPlace('H');
          setFeedbackMessage('Place the H player on the grid.');
        } else {
          setPlayerToPlace(null);
          setFeedbackMessage('All players are placed. When ready, click the "Check Alignment" button below to see how you did.');
        }
        break;
      case 'X':
        setXPlayerPositionUser(newPosition);
        if (!zPlayerPositionUser) {
          setPlayerToPlace('Z');
          setFeedbackMessage('Place the Z player on the grid.');
        } else if (!hPlayerPositionUser) {
          setPlayerToPlace('H');
          setFeedbackMessage('Place the H player on the grid.');
        } else if (!yPlayerPositionUser) {
          setPlayerToPlace('Y');
          setFeedbackMessage('Place the Y player on the grid.');
        } else {
          setPlayerToPlace(null);
          setFeedbackMessage('All players are placed. When ready, click the "Check Alignment" button below to see how you did.');
        }
        break;
      case 'Z':
        setZPlayerPositionUser(newPosition);
        if (!hPlayerPositionUser) {
          setPlayerToPlace('H');
          setFeedbackMessage('Place the H player on the grid.');
        } else if (!yPlayerPositionUser) {
          setPlayerToPlace('Y');
          setFeedbackMessage('Place the Y player on the grid.');
        } else if (!xPlayerPositionUser) {
          setPlayerToPlace('X');
          setFeedbackMessage('Place the X player on the grid.');
        } else {
          setPlayerToPlace(null);
          setFeedbackMessage('All players are placed. When ready, click the "Check Alignment" button below to see how you did.');
        }
        break;
      case 'H':
        setHPlayerPositionUser(newPosition);
        if (!yPlayerPositionUser) {
          setPlayerToPlace('Y');
          setFeedbackMessage('Place the Y player on the grid.');
        } else if (!xPlayerPositionUser) {
          setPlayerToPlace('X');
          setFeedbackMessage('Place the X player on the grid.');
        } else if (!zPlayerPositionUser) {
          setPlayerToPlace('Z');
          setFeedbackMessage('Place the Z player on the grid.');
        } else {
          setPlayerToPlace(null);
          setFeedbackMessage('All players are placed. When ready, click the "Check Alignment" button below to see how you did.');
        }
        break;
      default:
        // If all players are already placed and no player was "picked up",
        // the user is clicking on an empty space. We reset the placement.
        setXPlayerPositionUser(null);
        setYPlayerPositionUser(null);
        setZPlayerPositionUser(null);
        setHPlayerPositionUser(null);
        setPlayerToPlace('Y');
        setFeedbackMessage('You have cleared the previous placements. Start by placing the Y player on the grid.');
        break;
    }
  };

  /**
   * Checks if the user's player placements are correct based on the play call (for Alignment Challenge).
   */
  const checkAlignment = () => {
    // Check if all players have been placed
    if (!xPlayerPositionUser || !yPlayerPositionUser || !zPlayerPositionUser || !hPlayerPositionUser) {
      setFeedbackMessage("Please place all four players before checking.");
      return;
    }
    
    // Compare user's positions with the correct positions.
    const xCorrect = xPlayerPositionUser.row === correctXPosition.row && xPlayerPositionUser.col === correctXPosition.col;
    const yCorrect = yPlayerPositionUser.row === correctYPosition.row && yPlayerPositionUser.col === correctYPosition.col;
    const zCorrect = zPlayerPositionUser.row === correctZPosition.row && zPlayerPositionUser.col === correctZPosition.col;
    const hCorrect = correctHPosition.some(pos => pos.row === hPlayerPositionUser.row && pos.col === hPlayerPositionUser.col);
    
    // Set the correctness states, which will trigger the useEffect below to update the message
    setIsXPlayerCorrect(xCorrect);
    setIsYPlayerCorrect(yCorrect);
    setIsZPlayerCorrect(zCorrect);
    setIsHPlayerCorrect(hCorrect);

    // If all players are correct, show the runner popup and change phase
    if (xCorrect && yCorrect && zCorrect && hCorrect) {
      setRunnerPopupMessage('Correct on the alignments! Now, who is running the ball?'); // Set initial popup message
      setShowRunnerPopup(true);
      setGamePhase('runnerGuess'); // Change phase to runner guess
    } else {
      let message = 'Feedback:';
      message += ` X: ${xCorrect ? 'Correct' : 'Try again'}.`;
      message += ` Y: ${yCorrect ? 'Correct' : 'Try again'}.`;
      message += ` Z: ${zCorrect ? 'Correct' : 'Try again'}.`;
      message += ` H: ${hCorrect ? 'Correct' : 'Try again'}.`;
      setFeedbackMessage(message + ' To try again, click on a player to move them, or click on an empty cell to start over.');
    }
  };

  /**
   * Handles the user's guess for the runner player (for Alignment Challenge).
   */
  const handleRunnerGuess = (guessedPlayer) => {
    if (guessedPlayer === correctRunnerPlayer) {
      setShowRunnerPopup(false); // Close the popup on correct guess
      setRunnerPopupMessage(''); // Clear popup message
      setFeedbackMessage(`Correct! Now, select where the ${correctRunnerPlayer} player is running.`); // New prompt
      setGamePhase('runSpotGuess'); // Change phase to run spot guess
    } else {
      // If incorrect, update feedback within the popup
      setRunnerPopupMessage(`Try again. Who is running the ball?`);
      // The popup remains open
    }
  };

  /**
   * Handles the user's click on a number above the grid to guess the run spot (for Alignment Challenge).
   */
  const handleNumberClick = (guessedNumberCol) => {
    if (gamePhase !== 'runSpotGuess') {
      return; // Only allow clicks on numbers during the run spot guess phase
    }

    // The correct run spot is always in row 1
    const isCorrectRunSpot = correctRunSpot && correctRunSpot.row === 1 && correctRunSpot.col === guessedNumberCol;

    if (isCorrectRunSpot) {
      setScore(prevScore => prevScore + 1000);
      // Updated message as per user request
      setFeedbackMessage(`Correct! You earned 1000 points! Click "Next Play" to continue.`);
      setGamePhase('readyForNewPlay'); // Transition to a state where a new play can be generated
    } else {
      setFeedbackMessage(`Try again. Select where the ${correctRunnerPlayer} player is running.`);
    }
  };

  /**
   * This effect runs whenever the correctness states are updated after a check.
   * It's responsible for setting the final feedback message.
   * This useEffect is now primarily for initial alignment feedback before the runner popup.
   */
  useEffect(() => {
    // Only run this when a check has actually been performed and popup is not shown
    if (isXPlayerCorrect !== null && isYPlayerCorrect !== null && isZPlayerCorrect !== null && isHPlayerCorrect !== null && !showRunnerPopup && gamePhase === 'alignment') {
      // The feedback message for correct alignment is now set directly in checkAlignment
      // The feedback message for incorrect alignment is also set directly in checkAlignment
    }
  }, [isXPlayerCorrect, isYPlayerCorrect, isZPlayerCorrect, isHPlayerCorrect, showRunnerPopup, gamePhase]);
  
  const getPlayerColorClass = (isCorrect, isUserPlaced) => {
    if (!isUserPlaced) {
      return 'bg-slate-600 border-slate-400'; // Default color for fixed players
    }
    if (isCorrect === true) {
      return 'bg-green-500 border-green-300';
    } else if (isCorrect === false) {
      return 'bg-red-500 border-red-300';
    }
    // New logic: if it's a user-placed player but hasn't been checked yet, use the yellow class
    return 'bg-yellow-300 border-yellow-100 text-black';
  };

  // Helper function to check if the play call is one of the 'in-between' ones
  const isHInBetweenPlay = () => {
    if (!playCall) return false;
    const secondValue = playCall.split(' ')[1];
    return secondValue === 'B' || secondValue === '2';
  };

  // Helper function to get the position for the in-between H player
  const getHInBetweenPosition = () => {
    // This is the key logic to only show the "in-between" visual for the correct plays and user placements
    if (!hPlayerPositionUser || !isHInBetweenPlay()) return null;
    
    // Check if the user's placement is in one of the two valid "in-between" spots
    const isRightSidePlacement = hPlayerPositionUser.row === 2 && (hPlayerPositionUser.col === 11 || hPlayerPositionUser.col === 12);
    const isLeftSidePlacement = hPlayerPositionUser.row === 2 && (hPlayerPositionUser.col === 8 || hPlayerPositionUser.col === 9);

    if (isRightSidePlacement) {
        return {
          row: 2,
          col: 12
        };
    } else if (isLeftSidePlacement) {
        return {
          row: 2,
          col: 9
        };
    }
    return null; // Return null if the user clicked a cell that is not part of the "in-between" placement
  };

  const hInBetweenPos = getHInBetweenPosition();

  // Function to load the next play image and its correct play call for the "Guess Play Call" challenge
  const loadNextPlayImage = () => {
    if (playsData.length === 0) {
      setFeedbackMessage("No play images available.");
      setCurrentPlayImage('');
      setCorrectPlayCallForImage('');
      return;
    }
    // Use currentPlayIndex to get the play
    const nextPlay = playsData[currentPlayIndex];
    setCurrentPlayImage(nextPlay.image);
    setCorrectPlayCallForImage(nextPlay.playCall);
    // Increment index for the *next* time this function is called
    setCurrentPlayIndex(prevIndex => (prevIndex + 1) % playsData.length); 
    setUserPlayCallGuess(''); // Clear previous guess
    setGuessPlayCallFeedback(''); // Clear feedback
    setFeedbackMessage('Type your guess for the play call.');
  };

  // Function to handle game mode selection
  const selectGameMode = (mode) => {
    setGameMode(mode);
    // Reset scores and feedback when switching modes
    setScore(0);
    setFeedbackMessage('');
    setShowRunnerPopup(false);
    setRunnerPopupMessage('');
    setGuessPlayCallFeedback(''); // Clear specific feedback for guess mode

    // For alignment mode, also reset player positions and generate a new play
    if (mode === 'playAlignment') {
      setXPlayerPositionUser(null);
      setYPlayerPositionUser(null);
      setZPlayerPositionUser(null);
      setHPlayerPositionUser(null);
      setPlayerToPlace('Y');
      // The useEffect for gameMode will handle generatePlayCall()
    } else if (mode === 'guessPlayCall') {
      setCurrentPlayIndex(0); // Explicitly reset index to 0 when entering this mode
      // The useEffect below will then call loadNextPlayImage with this fresh index (0)
      // and load the first play correctly.
    }
  };

  // Function to handle submitting a guess in "Guess Play Call" mode
  const handleSubmitPlayCallGuess = () => {
    if (userPlayCallGuess.trim().toLowerCase() === correctPlayCallForImage.toLowerCase()) {
      setGuessPlayCallFeedback('Correct!');
      setScore(prevScore => prevScore + 1000);
      setFeedbackMessage('Correct! You earned 1000 points! Click "Next Play" to continue.');
    } else {
      setGuessPlayCallFeedback(`Incorrect. The correct answer was: "${correctPlayCallForImage}".`);
      setFeedbackMessage('Try again or click "Next Play" to get a new play.');
    }
  };

  return (
    <div className="bg-neutral-800 text-white min-h-screen flex items-center justify-center p-4 font-sans">
      <div className="max-w-4xl w-full bg-neutral-900 rounded-xl shadow-2xl p-6 md:p-8 flex flex-col gap-8">
        {/* Header and Play Call Display - Conditional based on gameMode */}
        <div className="text-center">
          {gameMode === 'selection' ? (
            // This entire block handles the display when in 'selection' mode
            <>
              <img 
                src="image_7eb42c.png" 
                alt="ZYFL Logo" 
                className="max-w-[200px] mx-auto mb-4" // Added mx-auto for centering
                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/200x200/cccccc/000000?text=ZYFL+Logo"; }}
              />
              <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-400 mb-2">ZYFL Base Playbook Game</h1>
              <div className="mb-6" /> {/* Added a div for extra space */}
              <h2 className="text-2xl font-bold text-white">Mode Selection</h2>
              <h2 className="text-2xl font-bold text-white">Choose Your Challenge</h2> {/* Re-added this line */}
            </>
          ) : (
            <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-400 mb-2">Offensive Play Call</h1>
          )}
          {gameMode === 'playAlignment' && (
            <div className="bg-neutral-700 rounded-lg p-4 font-mono text-xl md:text-3xl text-yellow-300 tracking-wider shadow-inner">
              {playCall}
            </div>
          )}
          {gameMode !== 'selection' && (
            <div className="text-xl md:text-2xl font-bold text-white mt-2">
              Score: {score}
            </div>
          )}
        </div>

        {/* Game Mode Selection */}
        {gameMode === 'selection' && (
          <div className="flex flex-col items-center gap-6 mt-8">
            {/* The image, app title, and "Mode Selection" heading are now handled above in the header conditional rendering */}
            <button
              onClick={() => selectGameMode('playAlignment')}
              className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 text-xl"
            >
              Alignment Challenge {/* Changed button text */}
            </button>
            <button
              onClick={() => selectGameMode('guessPlayCall')}
              className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 text-xl"
            >
              Play Call Challenge {/* Changed button text */}
            </button>
          </div>
        )}

        {/* Play Alignment Game UI (Conditionally Rendered) */}
        {gameMode === 'playAlignment' && (
          <>
            {/* The Football Field Visual */}
            <div className="bg-emerald-700 rounded-lg shadow-lg p-4 flex flex-col items-center">
              {/* Green space above the grid */}
              <div className="w-full bg-emerald-700 h-12 rounded-t-lg relative">
                {/* Numbers above the grid */}
                {gridNumberPositions.map((item) => (
                  <div 
                    key={item.num}
                    className={`absolute text-white font-bold text-lg cursor-pointer ${gamePhase === 'runSpotGuess' ? 'hover:text-yellow-300' : 'cursor-default'}`}
                    style={{ 
                      left: `calc(${item.lineIndex * (100 / 19)}%)`, // Position at the right grid line of the column
                      bottom: '0px', // Align to the bottom of the green space
                      transform: 'translateX(-50%)' // Center the number itself over the line
                    }}
                    onClick={() => handleNumberClick(item.targetCol)} // Pass item.targetCol as the guessed column
                  >
                    {item.num}
                  </div>
                ))}
              </div>
              
              {/* Grid Container */}
              <div className="w-full max-w-[calc(19*50px)] border border-neutral-600 rounded-lg overflow-hidden relative">
                {/* Loop to create 5 rows */}
                {Array.from({ length: 5 }).map((_, rowIndex) => (
                  <div key={rowIndex} className="flex">
                    {/* Loop to create 19 cells per row */}
                    {Array.from({ length: 19 }).map((_, colIndex) => {
                      const cellRow = rowIndex + 1;
                      const cellCol = colIndex + 1;
                      
                      const playerInCell = players.find(p => p.row === cellRow && p.col === cellCol);
                      const xPlayerInCell = xPlayerPositionUser && xPlayerPositionUser.row === cellRow && xPlayerPositionUser.col === cellCol;
                      const yPlayerInCell = yPlayerPositionUser && yPlayerPositionUser.row === cellRow && yPlayerPositionUser.col === cellCol;
                      const zPlayerInCell = zPlayerPositionUser && zPlayerPositionUser.row === cellRow && zPlayerPositionUser.col === cellCol;
                      
                      // Only render the H player inside a cell if it's a single-cell placement
                      const hPlayerInCell = hPlayerPositionUser && hPlayerPositionUser.row === cellRow && hPlayerPositionUser.col === cellCol && !isHInBetweenPlay();
                      
                      // Check if the cell is a potential player placement location
                      const isYPlayerCandidate = yPlayerPossibilities.some(pos => pos.row === cellRow && pos.col === cellCol) && playerToPlace === 'Y';
                      const isXPlayerCandidate = xPlayerPossibilities.some(pos => pos.row === cellRow && pos.col === cellCol) && playerToPlace === 'X';
                      const isZPlayerCandidate = zPlayerPossibilities.some(pos => pos.row === cellRow && pos.col === cellCol) && playerToPlace === 'Z';
                      const isHPlayerCandidate = hPlayerPossibilities.some(pos => pos.row === cellRow && pos.col === cellCol) && playerToPlace === 'H';
                      
                      return (
                        <div 
                          key={colIndex} 
                          className={`w-1/19 bg-emerald-700 border-r border-b border-neutral-600 aspect-square flex items-center justify-center relative cursor-pointer ${isYPlayerCandidate || isXPlayerCandidate || isZPlayerCandidate || isHPlayerCandidate ? 'border-2 border-white' : ''}`}
                          style={{ width: `calc(100% / 19)` }}
                          onClick={() => handleCellClick(rowIndex, colIndex)}
                        >
                          {playerInCell && (
                            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white bg-slate-600 border-2 border-slate-400">
                              {playerInCell.name}
                            </div>
                          )}
                          {xPlayerInCell && (
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white border-2 ${getPlayerColorClass(isXPlayerCorrect, true)}`}>
                              X
                            </div>
                          )}
                          {yPlayerInCell && (
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 ${getPlayerColorClass(isYPlayerCorrect, true)}`}>
                              Y
                            </div>
                          )}
                          {zPlayerInCell && (
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white border-2 ${getPlayerColorClass(isZPlayerCorrect, true)}`}>
                              Z
                            </div>
                          )}
                          {hPlayerInCell && (
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white border-2 ${getPlayerColorClass(isHPlayerCorrect, true)}`}>
                              H
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
                {/* Visual element for "in-between" H player placement */}
                {hInBetweenPos && (
                    <div
                        className={`absolute z-10 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white border-2 ${getPlayerColorClass(isHPlayerCorrect, true)}`}
                        style={{
                            top: `${(hInBetweenPos.row - 1) * (100 / 5)}%`,
                            left: `${(hInBetweenPos.col - 1) * (100 / 19)}%`,
                            transform: 'translate(-50%, 0)'
                        }}
                    >
                        H
                    </div>
                )}
              </div>
              {feedbackMessage && (
                <p className={`mt-4 text-center font-bold text-lg text-white`}>
                  {feedbackMessage}
                </p>
              )}
            </div>
            
            {/* Control Buttons */}
            <div className="flex justify-center gap-4">
              <button
                onClick={generatePlayCall}
                className={`flex items-center gap-2 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50
                  ${gamePhase === 'readyForNewPlay' || gamePhase === 'alignment' ? '' : 'opacity-50 cursor-not-allowed'}`}
                disabled={!(gamePhase === 'readyForNewPlay' || gamePhase === 'alignment')}
              >
                {/* Replaced lucide-react with an inline SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M21.5 2v6h-6"/><path d="M2.5 22v-6h6"/><path d="M2.5 16a9 9 0 0 1 14.8-9 9 9 0 0 1 5.2 7.7L21.5 16"/><path d="M21.5 16a9 9 0 0 1-14.8 9 9 9 0 0 1-5.2-7.7L2.5 16"/>
                </svg>
                Generate New Play
              </button>
              <button
                onClick={checkAlignment}
                disabled={!xPlayerPositionUser || !yPlayerPositionUser || !zPlayerPositionUser || !hPlayerPositionUser || gamePhase !== 'alignment'}
                className={`flex items-center gap-2 px-6 py-3 font-bold rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-opacity-50
                  ${(!xPlayerPositionUser || !yPlayerPositionUser || !zPlayerPositionUser || !hPlayerPositionUser || gamePhase !== 'alignment')
                    ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                    : 'bg-yellow-500 hover:bg-yellow-600 text-black focus:ring-yellow-500'}`
                }
              >
                Check Alignment
              </button>
            </div>

            {/* Back to Mode Selection Button for Play Alignment Challenge */}
            <div className="flex justify-center mt-4">
                <button
                    onClick={() => selectGameMode('selection')}
                    className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-gray-500 focus:ring-opacity-50"
                >
                    Back to Mode Selection
                </button>
            </div>

            {/* Runner Guess Popup */}
            {showRunnerPopup && (
              <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                <div className="bg-neutral-800 rounded-xl shadow-2xl p-6 md:p-8 text-center max-w-md w-full">
                  <h2 className="text-2xl font-bold text-indigo-300 mb-4">
                    {runnerPopupMessage || 'Correct on the alignments! Now, who is running the ball?'}
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {['QB', 'F', 'H', 'Y', 'X', 'Z'].map(player => (
                      <button
                        key={player}
                        onClick={() => handleRunnerGuess(player)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
                      >
                        {player}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Guess Play Call Game UI (Conditionally Rendered) */}
        {gameMode === 'guessPlayCall' && (
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <h2 className="text-3xl font-bold text-yellow-300 mb-4">Guess the Play Call!</h2>
            {currentPlayImage && (
              <img src={currentPlayImage} alt="Football Play" className="max-w-full h-auto rounded-lg shadow-md mb-6" />
            )}
            <input
              type="text"
              className="p-3 mb-4 rounded-lg bg-neutral-700 text-white border border-neutral-600 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Type play call here (e.g., Right 2 43)"
              value={userPlayCallGuess}
              onChange={(e) => setUserPlayCallGuess(e.target.value)}
            />
            <div className="flex gap-4">
              <button
                onClick={handleSubmitPlayCallGuess}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Submit Guess
              </button>
              <button
                onClick={loadNextPlayImage}
                className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
              >
                Next Play
              </button>
            </div>
            {guessPlayCallFeedback && (
              <p className={`mt-4 text-center font-bold text-lg ${guessPlayCallFeedback.startsWith('Correct') ? 'text-green-400' : 'text-red-400'}`}>
                {guessPlayCallFeedback}
              </p>
            )}
            <button
              onClick={() => selectGameMode('selection')}
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-full shadow-lg transition-all duration-200 mt-6"
            >
              Back to Mode Selection
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

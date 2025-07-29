const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;


const FULL_NAME = "jiya jain";
const DOB = "21102004";
const EMAIL = "jiya1723.be22@chitkara.edu.in";
const ROLL_NUMBER = "2210991723";

// Middleware
app.use(cors());
app.use(express.json());

// Helper functions
function isNumeric(str) {
    return /^\d+$/.test(str);
}

function isAlphabetic(str) {
    return /^[a-zA-Z]$/.test(str);
}

function isSpecialCharacter(str) {
    return !isNumeric(str) && !isAlphabetic(str);
}

function createAlternatingCapsReverse(alphabetChars) {
    if (alphabetChars.length === 0) return "";

    let result = "";
    let shouldBeUpper = true;

    // Reverse the order and apply alternating caps
    for (let i = alphabetChars.length - 1; i >= 0; i--) {
        const char = alphabetChars[i];
        if (shouldBeUpper) {
            result += char.toUpperCase();
        } else {
            result += char.toLowerCase();
        }
        shouldBeUpper = !shouldBeUpper;
    }

    return result;
}

// POST endpoint for /bfhl
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                user_id: `${FULL_NAME.toLowerCase()}_${DOB}`,
                message: "Invalid input: 'data' should be an array"
            });
        }

        // Initialize arrays
        const evenNumbers = [];
        const oddNumbers = [];
        const alphabets = [];
        const specialCharacters = [];
        const alphabetChars = [];

        let sum = 0;

        // Process each element in the data array
        data.forEach(item => {
            const itemStr = String(item);

            if (isNumeric(itemStr)) {
                const number = parseInt(itemStr);
                sum += number;

                if (number % 2 === 0) {
                    evenNumbers.push(itemStr);
                } else {
                    oddNumbers.push(itemStr);
                }
            } else if (isAlphabetic(itemStr)) {
                alphabets.push(itemStr.toUpperCase());
                alphabetChars.push(itemStr);
            } else if (isSpecialCharacter(itemStr)) {
                specialCharacters.push(itemStr);
            }
        });

        // Create concatenation string with alternating caps in reverse order
        const concatString = createAlternatingCapsReverse(alphabetChars);

        // Build response
        const response = {
            is_success: true,
            user_id: `${FULL_NAME.toLowerCase()}_${DOB}`,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            odd_numbers: oddNumbers,
            even_numbers: evenNumbers,
            alphabets: alphabets,
            special_characters: specialCharacters,
            sum: String(sum),
            concat_string: concatString
        };

        res.status(200).json(response);

    } catch (error) {
        console.error('Error processing request:', error);
        res.status(400).json({
            is_success: false,
            user_id: `${FULL_NAME.toLowerCase()}_${DOB}`,
            message: "An error occurred while processing the request"
        });
    }
});

// GET endpoint for /bfhl (optional, for testing)
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

// Health check endpoint
app.get('/', (req, res) => {
    res.json({
        message: "Bajaj Finserv Assignment API is running!",
        endpoints: {
            post: "/bfhl",
            get: "/bfhl"
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📡 API endpoint: http://localhost:${PORT}/bfhl`);
    console.log(`🌐 Health check: http://localhost:${PORT}/`);
});

const axios = require('axios');

const API_URL = 'http://localhost:3000/bfhl';

async function testAPI() {

    // Test data
    const testData = {
        data: ["a", "1", "334", "4", "R", "$"]
    };

    try {
        console.log('📤 Sending POST request to:', API_URL);
        console.log('📤 Request data:', JSON.stringify(testData, null, 2));

        const response = await axios.post(API_URL, testData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('\n✅ Response Status:', response.status);
        console.log('📥 Response Data:');
        console.log(JSON.stringify(response.data, null, 2));

        const data = response.data;
        console.log('\n🔍 Verification:');
        console.log('✓ is_success:', data.is_success);
        console.log('✓ user_id format:', data.user_id.includes('_'));
        console.log('✓ odd_numbers:', data.odd_numbers);
        console.log('✓ even_numbers:', data.even_numbers);
        console.log('✓ alphabets:', data.alphabets);
        console.log('✓ special_characters:', data.special_characters);
        console.log('✓ sum:', data.sum);
        console.log('✓ concat_string:', data.concat_string);

        console.log('\n📤 Testing GET endpoint...');
        const getResponse = await axios.get(API_URL);
        console.log('✅ GET Response:', getResponse.data);

    } catch (error) {
        console.error('❌ Error testing API:', error.message);
        if (error.response) {
            console.error('Response data:', error.response.data);
        }
    }
}

try {
    require('axios');
    testAPI();
} catch (e) {
    console.log('📝 Manual testing instructions:');
    console.log('1. Install axios: npm install axios');
    console.log('2. Start server: npm start');
    console.log('3. Run this test: node test.js');
    console.log('\nOr use curl:');
    console.log('curl -X POST http://localhost:3000/bfhl -H "Content-Type: application/json" -d \'{"data":["a","1","334","4","R","$"]}\'');
}

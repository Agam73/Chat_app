// test-email.js
const axios = require('axios');

const invalidEmails = ["Test@x.com", "test@x.com", "test.com", "@test.com"];

(async () => {
    for (const email of invalidEmails) {
        try {
            const res = await axios.post('http://localhost:3000/api/v1/signUp', {
                firstName: "Test",
                lastName: "User",
                email,
                password: "password123",
                confirmPassword: "password123"
            });
            console.log(email, "→", res.status, res.data.message);
        } catch (e) {
            console.log(email, "→", e.response.status, e.response.data.message);
        }
    }
})();
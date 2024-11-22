const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// Endpoint to update gift card balance
exports.updateBalance = functions.https.onRequest((req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).send({ message: 'Only POST requests are allowed' });
    }

    const { balance } = req.body;
    if (typeof balance !== 'number' || balance < 0) {
        return res.status(400).send({ message: 'Invalid balance' });
    }

    // Example: Update a specific card's balance in Firestore (or database)
    const cardRef = admin.firestore().collection('giftCards').doc('yourCardID');
    cardRef.update({ balance })
        .then(() => {
            return res.status(200).send({ message: 'Balance updated successfully!' });
        })
        .catch(error => {
            return res.status(500).send({ message: 'Error updating balance', error });
        });
});

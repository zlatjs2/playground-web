const googleapis = require('googleapis')
const functions = require('firebase-functions')

const cors = require('cors')({
  origin: true,
})

const { google } = googleapis
const { GOOGLE_AUTH_EMAIL, GOOGLE_AUTH_PRIVATE_KEY, SPREAD_SHEET_ID } =
  process.env

exports.sheets = functions.https.onRequest((req, res) =>
  cors(req, res, async function () {
    const authorize = new google.auth.JWT(
      GOOGLE_AUTH_EMAIL,
      null,
      '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDmwl628r+H6WTB\nBWMxxX29Ak4PsP6Cc783NFGKE4rfTxzBL9wG0FqtZFxOdKCsgq0qhReHBh/rnmzK\n+JsyTHw00W7wj0MnGUDuDmtEE0jNMLB/JlYWweEYpzTvqMWqiJYqZ3dS2H/clpx5\nY+L6s8n17VRr0XS4yqRZdT54WVeJdo58y3lZXoxQJZaxD/X4fOeIsxPp1g6u1oHs\nIeWL9eCakUKgNKAHcaOK0pewdcMnygSi1Qo+HtlI1WERHyOrR8E49HMi2IOnRL6y\nIeuiUB8mj++z24bw23V/HvbhyR2goGEzTEAzlC9mrKm7YTCtoFuRZDVLM1VYnJ/+\ni418f+fdAgMBAAECggEAFrp4R767HLDhSp20OnfAPbiXZbZCKykpYU+W5GmuWPZa\n17BWFJm7BK8I5HVaSgOI+NIpEhSJWlS9VHSOHLMp3K3wJmOF8rjrC0eCSy83EXbF\nO5DUE+O+vwXhEeXmqjhPyhdsyk0mstxmxxIOjjDdKIrasM/tljHnZCRHJeVu2MwT\nrJZtbvJHzgYjC7B38tJgVYeD+/OpbG+S5y7k28AJ0K5LrsfJbrFM+ZkXsyhBNn5p\nvb0C3smH/yHwIRLWUkp9yeTBGBz5X83xPMa0pxv1LrQsvc91T4lwbhQMzZ8fSpqx\n7pRqW9MGUEvmV5jtPAE8F774AJ2Huv42oxd5KnRRZQKBgQD8mBkGoL2TRLHo+epW\nRy4ucZGJwfkYx9xwwIzeKFU7eaMdeeM8eAknYy8YGQK1paj8uxnGGNg6uKw/KwcV\nlZ6JBONMkP12x8WQ1s18yp4xz5bbpaNrW69zqV5Ru6BWIsZbGiRfD8eqIiP6JFTW\nr/d8eVtpEqpeOqJ37a/+kx6E/wKBgQDp3ucdXB2DNIqE/gmFEd1e8uNz42zokqlY\n4jiAmgtEIifBZ2FIpvntqdZKPXbsuFujSKsZzC93jUSlP+I4yt8IrSoi7SX8nx4N\nWO7E/VjXTXrxymTgztilF16SmgG36pkATBB7pHpNN3AcjcHg1bRKGFllKcK8Ka3J\noBAEYo9HIwKBgBTILsbs0qwbKsgQR8dxc8s+bMr4upXfW7OrI+vjRZ/vEgyKyrde\n6OHktys0Y5SuXIjum+BAiwnJx+IqmBqehLyhOlJCW5g6N3cDNUTfJsTSX4cSya87\ni+PoO2peFYMAuXElZXisw7CrvmoGMzS2pZYIJg0vC/VUvalAVQqM8CXhAoGBAITZ\nZhe7d9hMRFN/qxC4MTP6bVIrYnZKuYAQIWCMINI3RLYMb6rBjz9+Nog9mgymPQfo\nA6nH3z7eNJxaSbtRIpjfJQxqAiYajQuv9RJZh9nl3Wz0N5Gsbkx5lfNZIJjE3tzY\nWJSjvgWW9EyEChoZyyw74KwiqMgSNPJPxkl3Y0RZAoGBAJWBsnHksP/+uu1we2wp\nmRFHLf9lRF2u8gMRU7qopuo7Z1WkBLoPiHzsDGaSXh/VFrTh7fWj5lQakJihuQtm\nBRzM6zRbGSCGHNfOkshPQD+hfTqg1WrWbBrvHK1eHmnDJ5uMxpW2y+8/w/G5yY6+\nwj/q5NPQHZmr5eMY3C6c7dDq\n-----END PRIVATE KEY-----\n',
      ['https://www.googleapis.com/auth/spreadsheets'],
    )
    const sheets = google.sheets({
      version: 'v4',
      auth: authorize,
    })

    const context = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREAD_SHEET_ID,
      range: 'A1:I4',
    })

    return res.status(200).send(context.data.values)
  }),
)

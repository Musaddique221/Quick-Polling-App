Quick Polling App - Backend

git clone https://github.com/Quick-Polling-App
cd backend
npm install

Set up the environment variables by creating a .env file:
ORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/Quick-Polling-App
npm run dev

cd frontend 
npm install
npm start


API Endpoints

Get All Polls
URL: GET /api/polls


Create a Poll
URL: POST /api/polls

Vote on a Poll
URL: POST /api/polls/:id/vote










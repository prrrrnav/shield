Routes 


Confirmed ->
Authentication -> (completed)

Register
Login

Not confirmed
Unauthenticated -> ()

dashboard (protected)
Sms (protected)
Evidence (protected) -> this uploads locally
upload route (protected ) -> it uploades to r2Bucket



🌐 1. User Registration (Backend + Frontend)
🔁 Route:
POST /api/auth/register

✅ Backend:
Input validation (name, email, phone, password, role: victim/witness/police).

Hash password (bcrypt).

Store user in MongoDB.

Send confirmation or verification (optional: OTP via email/SMS).

🖥 Frontend:
Registration form.

Role selector (dropdown).

Success/failure message.

Redirect to login on success.



🔐 2. User Login + JWT Auth
🔁 Route:
POST /api/auth/login

✅ Backend:
Validate credentials.

Compare hashed password.

Generate JWT token (send in response).

Attach role & user ID in payload.

🖥 Frontend:
Login form with role toggle.

Store JWT in localStorage or SecureStore (for React Native).

Navigate based on role (Victim → Home, Police → Dashboard).



📱 3. Main Dashboard Flow (Role-Based)
For Victim/Witness:
Submit Report
POST /api/report

Data: incident type, description, location, timestamp, media file (optional).

Save report with status = "pending".

Link it to userId.

For Police:
Get All Reports
GET /api/report/all

Auth middleware: police-only.

Fetch all pending + active reports.

Update Report Status
PATCH /api/report/:id/status

Body: status: investigating/closed.

📸 4. Evidence Upload (Optional)
Attach Photo/Video
POST /api/report/:id/evidence

Use multer for file upload.

Upload to Cloud storage (Cloudinary or R2).

Store file URL in DB.

📍 5. Location Tracking (Live Crime Map)
Geolocation (frontend) on report submit.

Map reports on police dashboard using Google Maps API or Leaflet.

🔔 6. Real-Time Notification (Socket.io)
When a new report is submitted → Notify police:

"New incident reported in your area"

Use Socket.IO:

Emit on report_created

Police clients listen and update UI in real-time.

🧑‍💻 7. Admin/Police Dashboard
Total reports

Reports by status (pending, investigating, closed)

Filter by date, location, type

View report details + evidence

Take action (change status, assign officers)

🧾 8. User Profile & Report History
GET /api/user/profile

GET /api/report/user/:id → View all submitted reports by a user

Allow user to delete or update their report if not reviewed yet.

🔒 9. Security
JWT Middleware for protected routes.

Role-based access control middleware:

auth, isPolice, isVictim

Input validation/sanitization.

Secure file uploads.

🚀 10. Final Deployment Stack
Backend: Node.js + Express + MongoDB (Atlas)

Frontend: React or React Native (Android app)

Cloud Upload: Cloudinary or Cloudflare R2

Deployment:

Backend → Render or Railway

Frontend → Netlify / Vercel (Web) or Android Build (for APK)

Database → MongoDB Atlas
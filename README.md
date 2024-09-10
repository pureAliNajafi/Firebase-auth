# Firebase Authentication with React

This project demonstrates how to implement Firebase Authentication in a React application. Please note that the code may not be perfect, and the overall structure may be at a low level. The primary focus of this project is on authentication, rather than optimizing code or architectural practices.

## Demo

You can view the live demo [here](https://firebase-auth-liard.vercel.app/).

## Run Locally

To run this project on your local machine, follow these steps:

1. **Set Up Firebase:**
   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Create a new account and project if you haven't already.
   - Navigate to your project settings and copy the Firebase app configuration.
   - Ensure that you have enabled **Email/Password Authentication** under the **Authentication** section in your Firebase project.

2. **Clone the Repository:**
   ```bash
   git clone https://github.com/pureAliNajafi/Firebase-auth.git
   cd Firebase-auth
   
3. **Create the Environment File:**
   In the root directory of your project, create a `.env` or `.env.local` file. Fill in the Firebase configuration like this:

   ```plaintext
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id

4. **Disable Email Enumeration Protection in Firebase**
After Allowing Authentication with email / password ,To enable email address updates within Firebase Authentication, you must disable the email enumeration protection feature. This protection prevents attackers from determining whether an email address is registered in your Firebase project. However, to allow email updates in your application, you'll need to disable this feature.

![Disable email enumeration protection in Firebase](https://github.com/pureAliNajafi/Firebase-auth/blob/main/email-update-error-firebase.jpg?raw=true)

For more details, refer to the official [Email Enumeration Protection Documentation](https://cloud.google.com/identity-platform/docs/admin/email-enumeration-protection?hl=en&authuser=0).
5. **Install Dependencies:**
   Run the following command to install the required dependencies:

   ```bash
   npm install

6. **Start the Development Server:**
   Use the following command to start the development server:

   ```bash
   npm start



Let me know if you need further assistance.

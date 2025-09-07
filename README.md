

### Installation & how to run locally

 1. **Clone the repository**

   git clone <repository-url>
   cd music_app
   

 2. **Install dependencies**
   npm install

 3. **Start the development server**
   # 1: Start both apps together
   npm run dev
   
   # 2: Start individually
   npm run dev  # Main app on localhost:5173
   cd music-library && npm run dev  # Music library on localhost:5174


 4. **Access the application**
   - **Main App**: `http://localhost:5173` (Full app)
   - **Music Library**: `http://localhost:5174` (micro frontend)







###  Deployment 

  Before deploying, test your production build locally:

  # Install dependencies
   npm install

  # Build for production
   npm run build

  # Preview production build
   npm run preview

  The build will be created in the "dist" folder.

  ###  Deployment 
   # Quick Deploy
   # Build and deploy
   # Deployed on Vercel

    1. Push your code to GitHub
    2. Connect your repo to "vercel.com"
    3. Vercel will auto-deploy





##  Demo Credentials

   ### Admin User
     - **Username**: `admin`
     - **Password**: `admin123`

   ### Regular User
     - **Username**: `user`
     - **Password**: `user123`






## Key Implementation Details :-

  ### Authentication Flow
   1. User enters credentials
   2. Mock JWT token is created and stored in localStorage
   3. Token payload contains user role and expiration
   4. Role determines UI permissions and available actions

  ### Micro Frontend Communication

   1. Main app loads music library component via Module Federation
   2. User role is passed as prop to music library
   3. Music library renders appropriate UI based on role
   4. No direct communication needed props-based integration

  ### Role-Based Access
   - **Admin**: Full CRUD operations (Create, Read, Update, Delete)
   - **User**: Read-only access with full filtering and sorting capabilities












# Soundscape: Music Uploading and Listening Application

Soundscape is a full-stack web application built with Django on the backend and React on the frontend. It provides users with a seamless platform to upload their favorite music tracks and enjoy listening to a wide variety of songs. Whether you're an artist looking to showcase your music or a music enthusiast exploring new tunes, Soundscape has you covered.

Visit the live demo: [https://soundscape.koredeycode.tech](https://soundscape.koredeycode.tech)

## Features

- **User Authentication:** Secure user authentication system for creating accounts and logging in.
- **Music Upload:** Easily upload music tracks with details such as title, artist, and album information.
- **Music Player:** Play, pause, skip, and control the volume of your favorite tracks.
- **User Profiles:** Customize your profile, manage uploaded tracks, and view your favorite songs.
- **Search Functionality:** Find songs, artists, and albums quickly with the search feature.
- **Responsive Design:** Enjoy Soundscape on various devices with its responsive layout.

## Technologies Used

- **Backend:** Django,
- **Frontend:** React, React Router
- **Database:** Sqlite, PostgreSQL (or your preferred database)
- **Deployment:** Nginx, Gunicorn (for production deployment)

## Installation and Usage

### Backend (Django)

1. Clone the repository:

   ```bash
   git clone https://github.com/koredeycode/soundscape.git
   cd backend
   ```

2. Create a virtual environment and install dependencies:

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

3. Apply database migrations

```bash
python manage.py migrate
```

4. Start the Django development server:

```bash
python manage.py runserver
```

### Frontend (React)

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies and build the production version:

```bash
npm install
npm run build
```

3. Serve the built files using `serve`:

```bash
npm install -g serve
serve -s build
```

## Author

- **Name:** Yusuf Yusuf
- **GitHub:** [Github](https://github.com/koredeycode)
- **Twitter:** [@koredeycode](https://twitter.com/koredeycode)

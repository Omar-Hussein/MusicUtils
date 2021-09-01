# Music Utils

Music Utils app where you can download, get songs lyrics and rearrange music files.

---

## Features

* ### Download from Spotify

  Download songs/albums/playlists/discographies with the link with metadata, artwork, and synced lyrics embedded to the audio file.

* ### Get lyrics from Genius

  Get the lyrics of a song straight from [Genius](https://genius.com) by provided the song name and artist.

* ### A download script for Tampermonkey

  There's a Tampermonkey script at ``/tampermonkey/script.js`` to communicate with the server from Spotify's web app to download tracks, playlists, albums and discographies without the need to manually call the api.

  ![Screen shot for the button in action](/assets/screenshot_1.png)
  The button is on the top right.

* ### Rearrange file structure for the audio files

  Arrange the file structure of music files based on metadata.

---

## Setting configurations

Create ``.env`` file to the root folder and add the following configuration

```bash
# DEEZER
# For deezer you could enter the credentials which won't expire (preferred)
DEEZER_EMAIL=example@gmail.com
DEEZER_PASSWORD=12345678

# or provide the ari toke which will expire
DEEZER_ARI_TOKEN=ari_token

# GENIUS
# You can get the access token (free) at https://genius.com/api-clients
GENIUS_CLIENT_ACCESS_TOKEN=token
```

## Start a virtual environment

```powershell
py -m virtualenv env

.\env\Scripts\Activate.ps1
```

### Install requirements

```powershell
pip install -r requirements.txt
```

---

## CLI

For help run

```bash
py CLI.py --help
```

* ### To download an album, playlist or discography

  ```bash
  # --link is required
  py CLI.py download --link https://open.spotify.com/artist/2WX2uTcsvV5OnS0inACecP
  ```

* ### To get song lyrics

  ```bash
  # --song is required
  # --artist isn't required
  py CLI.py lyrics --song Habibi --artist Tamino
  ```

* ### To rearrange the ``/files`` folder

  ```bash
  py CLI.py rearrange
  ```

---

## API

To run the server start ``/scripts/start-api.ps1``. Will run the server on port ``5001``.

### Endpoints

* #### /download

  ```link
  http://localhost:5001/download?link=https://open.spotify.com/album/4Phh1rw8gbMtui8W5LN8KJ
  ```

  **Download query string options**

  **link**: required, the Spotify link you want to download, it could be an album, playlist or artist link (in case of the artist link it'll download the whole discography).

  > The downloaded files will be found in ``/files`` folder.

* #### /lyrics

  ```link
  http://localhost:5001/lyrics?song=We will rock you&artist=Queen
  ```

  **Lyrics query string options**

  **song**: required, the song you want the lyrics for.

  **artist**: not required, the artist of the song you want the lyrics for.

* #### /rearrange

  To rearrange the files in ``/files``.

  ```link
  http://localhost:5001/rearrange
  ```

---

## Tampermonkey script

Copy ``/tampermonkey/script.js`` file in a Tampermonkey script to be able to download straight from Spotify.

> Note that the server has to be run to work.

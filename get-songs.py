import requests

def search_itunes_preview(term, limit=2):
  url = "https://itunes.apple.com/search"
  params = {"term": term, "media": "music", "entity": "song", "limit": limit}

  try:
    response = requests.get(url, params=params, timeout=10)
    response.raise_for_status()
    data = response.json()

    results = []
    for item in data.get("results", []):
      track_name = item.get("trackName")
      artist_name = item.get("artistName")
      preview_url = item.get("previewUrl")
      artwork_url = item.get("artworkUrl100")

      if preview_url:
        results.append({
            "track": track_name,
            "artist": artist_name,
            "previewUrl": preview_url,
            "artworkUrl": artwork_url
        })

    return results

  except requests.exceptions.RequestException as e:
    print(f"Error fetching data from iTunes API: {e}")
    return []

if __name__ == "__main__":
  search_term = "Stray Kids Hello Stranger"
  print(f"Searching iTunes for '{search_term}'...\n")

  tracks = search_itunes_preview(search_term, limit=5)

  for idx, t in enumerate(tracks, 1):
    print(f"{idx}. {t['track']} - {t['artist']}")
    print(f"   Preview: {t['previewUrl']}\n")
    print(f"   Artwork: {t['artworkUrl']}\n")
function getTrackDiscsAndTracksInfo(albumTracks, { trackNumber, discNumber }, albumType) {
  // Handle if track or playlist
  const sharedData = { trackNumber, discNumber }
  if (!albumTracks || albumType === "playlist") return sharedData

  // Get the tracks and discs full count data
  const tracksCountData = albumTracks.reduce((accumulator, currentTrack) => {
    const existingDisc = accumulator.find(value => value.disc === currentTrack.disc_number)
    if (existingDisc) {
      existingDisc.totalTracks += 1
      return accumulator
    }
    return [...accumulator, { disc: currentTrack.disc_number, totalTracks: 1 }]
  }, [])

  // Return the data
  return {
    ...sharedData,
    tracks: tracksCountData.find(trackCountData => trackCountData.disc === sharedData.discNumber).totalTracks,
    discs: tracksCountData[tracksCountData.length - 1].disc,
  }
}

module.exports = getTrackDiscsAndTracksInfo

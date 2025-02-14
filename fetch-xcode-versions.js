import fetch from 'node-fetch';

async function fetchXcodeData() {
  try {
    const response = await fetch('https://xcodereleases.com/data.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

function formatVersion(version) {
  return version ? version : 'N/A';
}

async function displayXcodeVersions() {
  const xcodeData = await fetchXcodeData();
  
  if (!xcodeData) {
    console.log('Failed to fetch Xcode data.');
    return;
  }

  xcodeData.forEach(release => {
    console.log(`Xcode ${release.version} (Build ${release.build}):`);
    console.log(`  Clang:  ${formatVersion(release.compilers.clang.version)}`);
    console.log(`  Swift:  ${formatVersion(release.compilers.swift.version)}`);
    console.log(`  SDK:    ${formatVersion(release.sdks.macosx)}`);
    console.log('---');
  });
}

displayXcodeVersions();


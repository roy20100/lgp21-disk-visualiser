function generateData() {
    const totalTracks = 64;
    const sectorsPerTrack = 64;
    const bitsPerSectorData = 32;
    const bitsPerSectorClock = 64;
    const data = new Uint8Array((totalTracks * sectorsPerTrack * bitsPerSectorData / 8) + (4 * sectorsPerTrack * bitsPerSectorClock / 8));
    let index = 0;

    // Generate logical tracks
    for (let track = 0; track < totalTracks; track++) {
        for (let sector = 0; sector < sectorsPerTrack; sector++) {
            // Embed track and sector number
            const embeddedData = (track << 8) | sector; // 8 bits for track, 8 bits for sector
            data[index++] = (embeddedData >> 24) & 0xFF;
            data[index++] = (embeddedData >> 16) & 0xFF;
            data[index++] = (embeddedData >> 8) & 0xFF;
            data[index++] = embeddedData & 0xFF;
            // Fill the rest of the sector with zeros
            for (let i = 4; i < (bitsPerSectorData / 8); i++) {
                data[index++] = 0;
            }
        }
    }

    // Generate clock tracks
    for (let clockTrack = 0; clockTrack < 4; clockTrack++) {
        for (let sector = 0; sector < sectorsPerTrack; sector++) {
            // Set alternating bits (01010101...)
            for (let i = 0; i < (bitsPerSectorClock / 8); i++) {
                data[index++] = (i % 2 === 0) ? 0xAA : 0x55;
            }
        }
    }

    return data;
}

const generatedData = generateData();
console.log(generatedData);

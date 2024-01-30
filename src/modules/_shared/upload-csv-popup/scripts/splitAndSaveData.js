const splitAndSaveData = async ({ data, saveCallback }) => {
  const chunkSize = 100;
  const chunksCount = Math.ceil(data.length / chunkSize);
  let processedChunkIndex = 1;
  try {
    for (; processedChunkIndex <= chunksCount; processedChunkIndex += 1) {
      // eslint-disable-next-line no-await-in-loop
      await saveCallback(data.slice(
        (processedChunkIndex - 1) * chunkSize,
        processedChunkIndex * chunkSize,
      ));
    }
  } catch (err) {
    const errMessage = JSON.stringify(err instanceof Error
      ? err.message
      : err);
    // eslint-disable-next-line no-throw-literal
    throw new Error(`An error occurred during saving ${(processedChunkIndex -
      1) * chunkSize}-${processedChunkIndex *
    chunkSize} data chunk: ${errMessage}`);
  }
};

export default splitAndSaveData;

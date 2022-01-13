import * as fs from 'fs';

describe('NodeJS: Pipes', () => {
  const fullFilePath = './src/learning/pipes/full.txt';
  const emptyFilePath = './src/learning/pipes/empty.txt';

  afterEach(() => {
    // Empty file
    // fs.rmSync(emptyFilePath);
    // fs.closeSync(fs.openSync(emptyFilePath, 'w'));
  });

  const readFromFileToFile = async (source: string, target: string) => {
    const readableStream = fs.createReadStream(source, 'utf8');
    const writeableStream = fs.createWriteStream(target);

    readableStream.on('data', chunk => {
      writeableStream.write(chunk);
    });

    readableStream.close();
    writeableStream.close();
  };

  it.todo('Copy content from file to file and check it');
  it.skip('Read file', async () => {
    await readFromFileToFile(fullFilePath, emptyFilePath);

    // Try this: https://stackoverflow.com/questions/37837132/how-to-wait-for-a-stream-to-finish-piping-nodejs/37908676
    // Promise.all(promises).then(async (responses) => {
    //   for (...) {
    //     await new Promise(fulfill => stream.on("finish", fulfill));
    //     //extract the text out of the PDF
    //   }
    // })

    const content: Buffer = fs.readFileSync(emptyFilePath);
    const contentString: string = content.toString('utf8');
    console.log(contentString);
    expect(contentString).not.toEqual('');
  });
});

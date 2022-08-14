import {NFTStorage, File} from 'nft.storage';

const symbol = 'TUT';

const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDdGNzk1OTlEQTNmYTc4NUUzNTY2NmY3ODA4NDkzNDlhNTA1MTA3NjkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2MDQ2NDIyNTAxMywibmFtZSI6IkdBQU5BUEFUSFkifQ.pt5G1jAC_LB39zNYFtfPX8rIUihHsVkqsvmyx10Ry4o';
const client = new NFTStorage({token: apiKey});

const uploadToIpfs = async (name, description, imgFile) => {
  const metadata = await client.store({
    name: name,
    description: description,
    image: new File([imgFile], imgFile.name, {type: imgFile.type}),
    symbol: symbol,
    decimals: 0,
    shouldPreferSymbol: false,
    isBooleanAmount: true,
    artifactUri: new File([imgFile], imgFile.name, {type: imgFile.type}),
    displayUri: new File([imgFile], imgFile.name, {type: imgFile.type}),
    thumbnailUri: new File([imgFile], imgFile.name, {type: imgFile.type}),
    creators: ['Scooby'],
  });
  return metadata.url;
};

export {uploadToIpfs};
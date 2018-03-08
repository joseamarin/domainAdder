const { fileCopy } = require('./fs-copy');
const { fileRead, fileWrite } = require('./fs-promise'); 
const readline = require('readline');

const greenDomains = [
    
    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',

    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        
    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',

    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',

    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',

    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',

    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'

];

const orangeDomains = [

    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',

    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',

    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',

    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',

    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',

    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',

    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',

    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',

    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',

    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        
    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',

    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',

    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',

    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'

];

const getFilePath = () => {
    return new Promise((resolve, reject) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        const filePath = rl.question('Enter the file path: ', (filePath)=> {
            rl.close();
            resolve(filePath);
        });
    });
};

const getUnsub = (filePath) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    const input = rl.question('Enter The Advertiser Unsubscribe URL: ', (url) => {
        console.log(`#unsub# will be replaced with ${url}`)
        fileRead(filePath).then((content) => {
            const regex = /#unsub#/g;
            if (regex.test(content)) {
                const unsubURL = content.replace(/#unsub#/g, url);
                fileWrite(filePath, unsubURL).then((data) => {});
                const affids = [1010, 13, 1369, 1370, 1391, 1397, 1400, 1451, 1454, 1455, 1473, 1502, 1623, 1630, 1631, 1632, 1705, 183, 211, 309, 609];
                for (let i = 0; i < affids.length; i++) {
                    fileCopy(filePath, `${filePath.substring(0, filePath.length -5)}-${affids[i]}.html`).then((e) => {
                        for (let j = 0; j < greenDomains.length; j++) {
                            if (`${filePath.substring(0, filePath.length -5)}-${affids[i]}.html`.split('-')[1].split('.')[0] === greenDomains[j].split('=')[1].split('&')[0]) {
                                console.log(`${filePath.substring(0, filePath.length -5)}-${affids[i]}.html`);
                                console.log(greenDomains[j]);
                                fileRead(`${filePath.substring(0, filePath.length -5)}-${affids[i]}.html`).then((content) => {
                                    const regex = /#url<c=/g;
                                    if (regex.test(content)) {
                                        const domain = content.replace(regex, greenDomains[j]);
                                        fileWrite(`${filePath.substring(0, filePath.length -5)}-${affids[i]}.html`, domain).then((data) => {}); 
                                    }
                                });
                            }
                        }
                        for (let k = 0; k < orangeDomains.length; k++) {
                            if (`${filePath.substring(0, filePath.length -5)}-${affids[i]}.html`.split('-')[1].split('.')[0] === orangeDomains[k].split('=')[1].split('&')[0]) {
                                console.log(`${filePath.substring(0, filePath.length -5)}-${affids[i]}.html`);
                                console.log(orangeDomains[k]);
                                fileRead(`${filePath.substring(0, filePath.length -5)}-${affids[i]}.html`).then((content) => {
                                    const regex = /#url<c=/g;
                                    if (regex.test(content)) {
                                        const domain = content.replace(regex, orangeDomains[k]);
                                        fileWrite(`${filePath.substring(0, filePath.length -5)}-${affids[i]}.html`, domain).then((data) => {}); 
                                    }
                                });
                            }
                        }
                    }).catch((err) => {
                        console.log(err)
                    }); 
                }
            }
        });
        rl.close();
    });
    return input;
};

getFilePath().then((filePath) => {
    fileRead(filePath).then((content) => {
        const regex = /s1=>#/g;
        if (regex.test(content)) {
            const result = content.replace(regex, 's1=')
            fileWrite(filePath, result).then((data) => {
                fileRead(filePath).then((content) => {
                    const regex = /<img\s{1,}src="0jhkanbe9mxp.jpg"\s{1,}border="0"\s{1,}style="max-width:100%;max-height:100%;display:block;padding:0px;margin:0px;">/g;
                    if (regex.test(content)) {
                        const result = content.replace(regex, '')
                        fileWrite(filePath, result).then((data) => {
                            getUnsub(filePath);
                        });
                    }
                });
            });
        }
    });
});


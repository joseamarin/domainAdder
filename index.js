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
        const filePath = rl.question('Enter The File Path: ', (filePath)=> {
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
        fileRead(filePath).then((content) => {
            const regex = /#unsub#/g;
            if (regex.test(content)) {
                const unsubURL = content.replace(regex, url);
                fileWrite(filePath, unsubURL).then((data) => {});
                const affids = [1010, 13, 1369, 1370, 1391, 1397, 1400, 1451, 1454, 1455, 1473, 1502, 1623, 1630, 1631, 1632, 1705, 183, 211, 309, 609];
                for (let i = 0; i < affids.length; i++) {
                    // const regex = /#url<c=/g;
                    fileCopy(filePath, `${filePath.substring(0, filePath.length -5)}-${affids[i]}.html`).then((e) => {
                       /* for (let j = 0; j < greenDomains.length; j++) {
                            if (`${filePath.substring(0, filePath.length -5)}-${affids[i]}.html`.split('-')[1].split('.')[0] === greenDomains[j].split('=')[1].split('&')[0]) {
                                fileRead(`${filePath.substring(0, filePath.length -5)}-${affids[i]}.html`).then((content) => {
                                    if (regex.test(content)) {
                                        const domain = content.replace(regex, greenDomains[j]);
                                        fileWrite(`${filePath.substring(0, filePath.length -5)}-${affids[i]}.html`, domain).then((data) => {}); 
                                    }
                                });
                            }
                        }
                        for (let k = 0; k < orangeDomains.length; k++) {
                            if (`${filePath.substring(0, filePath.length -5)}-${affids[i]}.html`.split('-')[1].split('.')[0] === orangeDomains[k].split('=')[1].split('&')[0]) {
                                fileRead(`${filePath.substring(0, filePath.length -5)}-${affids[i]}.html`).then((content) => {
                                    if (regex.test(content)) {
                                        const domain = content.replace(regex, orangeDomains[k]);
                                        fileWrite(`${filePath.substring(0, filePath.length -5)}-${affids[i]}.html`, domain).then((data) => {}); 
                                    }
                                });
                            }
                        }*/
                        domainAdder(`${filePath.substring(0, filePath.length -5)}-${affids[i]}.html`, affids, greenDomains, orangeDomains); 
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

const domainAdder = (file, affids, green, orange) => {
    const domainList = green.concat(orange)
    const regex = /#url<c=/g;
    for (let i = 0; i < domainList.length; i++) {
        if (`${file.substring(0, file.length -5)}-${affids[i]}.html`.split('-')[1].split('.')[0] === domainList[i].split('=')[1].split('&')[0]) {
            console.log(`${file.substring(0, file.length -5)}-${affids[i]}.html`);
            fileRead(`${file.substring(0, file.length -5)}-${affids[i]}.html`).then((file) => {
                if (regex.test(file)) {
                    const domain = content.replace(regex, domainList[i]);
                    fileWrite(`${file.substring(0, file.length -5)}-${affids[i]}.html`, domain).then(() => {});
                }
            }).catch((err) => {
                console.log(err);
            }); 
        }
    }
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


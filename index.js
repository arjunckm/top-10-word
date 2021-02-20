const got = require('got');
const fs = require('fs');
const APIkey="dict.1.1.20210216T114936Z.e4989dccd61b9626.373cddfbfb8a3b2ff30a03392b4e0b076f14cff9";


(async () => {
    const fileUrl="http://norvig.com/big.txt";
	try {
		const response = await got(fileUrl);
		let fileContent = response.body;  
        // console.log(fileContent);      
        let finalResult = await getWordFrequency(fileContent,10);
        //console.log(finalResult);
	} catch (err) {
		console.log(err.response.body);
	}
})();

const getDetailsOfWord = ( async (wordSent)=>{
    try{
        const wordDirUrl=`https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${APIkey}&lang=en-en&text=${wordSent}`;
        //console.log(wordDirUrl);
        
        const wordData = await got(wordDirUrl);
        //console.log(wordData.body);
        return wordData.body;
    } catch (err){
        console.log(err.response.body);
    }

})

const getWordFrequency= (async(fileContent, noOfWords)=>{
    var promise = new Promise((resolve, reject) => {
    //remove symbols and clean file content;    
    let updatedContent = fileContent.replace(/[.,-/#!$%^&*;:{}=\-_`~()?<>'"]/g, ''); // /[&\/\\#,-_+()!$~%^.'";:*?=<>{}]/g
    updatedContent = (updatedContent.replace(/\n/g, ' ')).toLowerCase();

    //split updatedContent and creat array of words
    let wordList = updatedContent.split(' ') .filter(val => /\S/.test(val));

    let wordCount={};
    wordList.forEach((word)=>{
        wordCount[word] = wordCount[word] || 0;
        wordCount[word]++;
    })

    let topWords = Object.keys(wordCount).sort(function(a, b){ return wordCount[b]- wordCount[a]});
    topWords = topWords.slice(0, noOfWords);

    let finalOutput=[];
        
        topWords.forEach(async(word,i, array) =>{
            let detailsOfWord = await getDetailsOfWord(word);
            //console.log(`word is ${word} :`, detailsOfWord);
            let wordDetails = JSON.parse(detailsOfWord);
            let singleResult = {
                "wordCount": wordCount[word]
            }

            if (wordDetails.def[0]) {
                if ("syn" in wordDetails.def[0]) {
                    singleResult.synonyms = wordDetails.def[0].syn;
                } else {
                    if ("mean" in wordDetails.def[0]) {
                        singleResult.synonyms = wordDetails.def[0].mean;
                    } else {
                        singleResult.synonyms = "Synonyms not found";
                    }
                }
                if ("pos" in wordDetails.def[0]) {
                    singleResult.pos = wordDetails.def[0].pos;
                } else {
                    singleResult.pos = "POS not found";
                }
            } else {
                singleResult.synonyms = "Synonyms not found";
                singleResult.pos = "POS not found";
            }
            // console.log(singleResult);
            finalOutput.push({
                word,
                "output":singleResult
            });
            if (i === array.length -1) {
                setTimeout(()=>{
                    resolve(finalOutput);
                },1000)
            }      
        })       
    });

    promise.then((outputs) => {
        outputs = outputs.sort(function (a, b) {
            return b.output.wordCount - a.output.wordCount
        })
        fs.writeFileSync('output.json', JSON.stringify(outputs));
        console.log(outputs);
    });
})

// getDetailsOfWord('was');
const got = require('got');
const APIkey="dict.1.1.20210216T114936Z.e4989dccd61b9626.373cddfbfb8a3b2ff30a03392b4e0b076f14cff9"



const getInitialFile = (async () => {
    const fileUrl="http://norvig.com/big.txt";
	try {
		const response = await got(fileUrl);
		let fileContent = response.body;        
        getWordFrequency(fileContent,10);
	} catch (err) {
		console.log(err.response.body);
	}
});

const getDetailsOfWord = ( async (wordSent)=>{
    try{
        const wordDirUrl=`https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${APIkey}&lang=en-en&text=${wordSent}`;
        
        const wordData = await got(wordDirUrl);
        console.log(wordData.body);

    } catch (err){
        console.log(err.response.body);
    }

})

const getWordFrequency= (async(fileContent, noOfWords)=>{
    //remove symbols and clean file content;    
    let updatedContent = fileContent.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
    updatedContent = (updatedContent.replace(/\n/g, ' ')).toLowerCase();

    //split updatedContent and creat array of words
    let words = updatedContent.split(' ') .filter(val => /\S/.test(val));

    let wordCount={};
    words.forEach((word)=>{
        wordCount[word] = wordCount[word] || 0;
        wordCount[word]++;
    })


    console.log(wordCount);

})

//getDetailsOfWord('the');
getInitialFile();
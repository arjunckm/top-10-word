## Top 10 word count
### Description
1. Fetch document from given url http://norvig.com/big.txt
2. Analyse the document using asynchronous mechanism, fetched in step 1
  * a. Find occurrences count of word in document
  * b. Collect details for top 10 words(order by word Occurrences) from
  https://dictionary.yandex.net/api/v1/dicservice.json/lookup, check details of
  API given below
    * i. synonyms/means
    * ii. part Of Speech/pos

3. Show words list in JSON format for top 10 words.
  * a. Word: text
  * b. Output
    * i. Count of Occurrence in that Particular Document
    * ii. Synonyms
    * iii. Pos
## How to run?
1. Git clone the repo. " git clone https://github.com/arjunckm/top-10-word.git"
2. Enter inside repo and run  "npm install"
3. now just run "node index.js"
4. check output in terminal or check generated output.json file.
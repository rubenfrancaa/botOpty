var Twit = require('twit')
require('dotenv').config()
const cron = require('node-cron')

const Bot = new Twit({

    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    
    timeout_ms: 60 * 1000,
    StrictSSL:true,

})

console.log('Este bot está rodando...');

cron.schedule('**', () => {
    function BotInit() {
        var query = [
            'Opty DESGRAÇADA',
            'Opty FILHA DA PUTA'
        ]

        console.log(query);

        // Buca dos tweets
        Bot.get('search/tweets',query,BotGotLatestTweet);
    
        function BotGotLatestTweet (error, data, response) {
            if (error) {
                console.log('Bot não conseguiu encontrar o último tweet,: ' + error);
            } else {
                var id = {
                    id : data.statuses[0].id_str
                }
            }
            // RT
            if (id){
                Bot.post('statuses/retweet/:id', id, BotRetweeted);
    
                function BotRetweeted(error, response) {
                    if (error) {
                         console.log('Bot não conseguiu dar RT: ' + error)
                    } else {
                            console.log('Bot deu RT: ' + id.id)
                    }
                }
            } else {
                console.log('Não foi possível postar, não possui um ID válido');
            }
          }   
        }
    }
);

/* Inicialize o bot Bot */
BotInit();
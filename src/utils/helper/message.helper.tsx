import { parseCookies } from 'nookies';
import { GetServerSideProps } from 'next';


export const sendMessageCode: GetServerSideProps = async (ctx) => {

  const sendMessage = (number:string,code:string) =>{
    const accountSid = "ACa9d5805dc8ca2ccb066c2a2adce0b051";
    const authToken = "d30c1c3a90fb81d1d9faf85a56a09c8c"

    // require the Twilio module and create a REST client
    const client = require('twilio')(accountSid, authToken);

    client.messages.create({
        to: `${'+52'+number}`,
        from: '+18302823649',
        body: `${'Code: '+ code}`,
    })
    .then((message:any) => console.log(message.sid));
  }

    try {
        const cookies = parseCookies(ctx)
        const number = ({ cookies }.cookies.__number ? { cookies }.cookies.__number : "")
        const code =  ({ cookies }.cookies.__code ? { cookies }.cookies.__code : "")
        sendMessage(number,code)
        return { props: { } }
    } catch (err) {
        return {
          props: { }
        }
    }
}
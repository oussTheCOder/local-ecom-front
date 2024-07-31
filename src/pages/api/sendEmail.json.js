// import {Resend}from "resend"

// const resend = new Resend(import.meta.env.RESEND_API_KEY);


// export async function GET({params, request}) {
//     const send = await resend.emails.send({
//         from : 'digital8ouss@gmail.com',
//         to:'digital8ouss@gmail.com',
//         subject:'test',
//         html:'<p>its done</p>',
//         text:'test'
//     })
//     if(send.data){
//         return new Response(
//             JSON.stringify({
//                 message : send.data
//             }),{
//                 status: 200,
//                 statusText :'ok'
//             }
//         );
//     }
//     else{
//         return new Response(
//             JSON.stringify({
//                 message : send.error
//             }),{
//                 status: 500,
//                 statusText :"internet server error"
//             }
//         );
//     }
    
//   }
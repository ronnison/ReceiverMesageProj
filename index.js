const amqp = require('amqplib/callback_api')
const url_amqp = process.env['URL_AMQP']

amqp.connect(url_amqp, function(error0, connection){
  if(error0){
    console.log(error0)
    return
  }

  connection.createChannel(function(error1, channel) {
    if(error1) {
      console.log(error1)
      return
    }

    var fila = 'hello'

    channel.assertQueue(fila, {
      durable : false
    })

    console.log('Tenha calma que já fui buscar a mensagem na fila: ', fila)
    channel.consume(fila, function(msg){
      console.log('Mesagem recebida: ', msg.content.toString())
    }, {
      noAck : true 
    })
  })
})

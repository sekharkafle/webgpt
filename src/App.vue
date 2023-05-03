

<template>
  <div class='app'>
    <div ref='messages' class='messages'>
      <Message
          v-for='message in messages'
          :key='message.id'
          :class='["message", { right: message.isBot }]'
          :dark='message.isBot'
          :text='message.text'
          :author='message.author'
      />
    </div>

    <ChatBox
        class='chat-box'
        @submit='onSubmit'
    />

  </div>
</template>

<script>
import Message from "@/components/Message.vue";
import ChatBox from "@/components/ChatBox.vue";
import { sendMessage } from "@/client/ChatClient.ts";
import { v1 as uid } from 'uuid';
export default {
  name: 'App',
  components: {
    ChatBox,
    Message
  },
  methods: {
    // This method will be called when a new message is sent
    async onSubmit(event, text) {
      event.preventDefault();
      if(text){
        let newMsg = {
          id:uid(),
          text,
          isBot:false,
          author:'You'
        };
        this.messages.push(newMsg);
        let msg = await sendMessage(newMsg);
        this.messages.push({
          id:uid(),
          text:msg,
          isBot:true,
          author:'GPT'
        });
      }
    }
  },
  data: () => ({
    user: undefined,
    messages: []
  })
}
</script>
<style>
@font-face {
  font-family: 'Georama';
  src: url('./assets/Georama.ttf');
}
@font-face {
  font-family: 'Georama';
  src: url('./assets/Georama.ttf');
  font-weight: bold;
}
* {
  box-sizing: border-box;
}
html {
  font-family: 'Georama', sans-serif;
}
body {
  margin: 0;
}
button {
  border: 0;
  background: #2a60ff;
  color: white;
  cursor: pointer;
  padding: 1rem;
}
input {
  border: 0;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.1);
}
</style>
<style scoped>
.app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.messages {
  flex-grow: 1;
  overflow: auto;
  padding: 1rem;
}
.message + .message {
  margin-top: 1rem;
}
.message.right {
  margin-left: 20px;
}
</style>
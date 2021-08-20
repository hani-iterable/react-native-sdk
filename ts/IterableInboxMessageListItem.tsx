'use strict'

import React from 'react'
import {
   View,
   Text,
   StyleSheet
} from 'react-native'

import Message from './messageType'
import Customization from './customizationType'

type MessageListItemProps = {
   message: Message,
   customization: Customization
}

const IterableInboxMessageListItem = ({ message, customization }: MessageListItemProps) => {
   const messageTitle = message.inboxMetadata.title
   const messageBody = message.inboxMetadata.subtitle
   const messageCreatedAt = message.createdAt

   styles = {...styles, ...customization}

   function messageRowStyle(message: Message) {
      return message.last ? {...messageRow, borderBottomWidth: 1} : messageRow 
   } 

   const {
      unreadIndicatorContainer,
      unreadIndicator,
      unreadMessageContainer,
      readMessageContainer,
      title,
      body,
      createdAt,
      messageRow
   } = styles

   return(
      <View style={messageRowStyle(message)}>
         <View style={unreadIndicatorContainer}>
            {message.read ? null : <View style={unreadIndicator}/>}
         </View>
         <View style={message.read ? readMessageContainer : unreadMessageContainer}>
            <Text style={title}>{messageTitle}</Text>
            <Text style={body}>{messageBody}</Text>
            <Text style={createdAt}>{messageCreatedAt}</Text>
         </View>
<<<<<<< HEAD
      </View>  
=======
      </>
>>>>>>> inbox
   )
}

let styles = StyleSheet.create({
   unreadIndicatorContainer: {
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'flex-start'
   },

   unreadIndicator: { 
      width: 15,
      height: 15,
      borderRadius: 15 / 2,
      backgroundColor: 'blue',
      marginLeft: 10,
      marginRight: 5,
      marginTop: 7
   },

   unreadMessageContainer: {
      paddingLeft: 5
   },

   readMessageContainer: {
      paddingLeft: 30
   },

   title: {
      fontSize: 22,
      paddingBottom: 10
   },

   body: {
      fontSize: 15,
      color: 'lightgray',
      paddingBottom: 10
   },

   createdAt: {
      fontSize: 12,
      color: 'lightgray'
   },

   messageRow: {
      flexDirection: 'row',
      backgroundColor: 'white',
      paddingTop: 10,
      paddingBottom: 10,
      width: '100%',
      height: 100,
      borderStyle: 'solid',
      borderColor: 'lightgray',
      borderTopWidth: 1
   }
})

export default IterableInboxMessageListItem
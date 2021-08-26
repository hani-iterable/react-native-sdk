'use strict'

import React, { useState, useEffect } from 'react'
import { Text, SafeAreaView, StyleSheet } from 'react-native'

import IterableInboxMessageList from './IterableInboxMessageList'
import IterableInboxEmptyState from './IterableInboxEmptyState'
import IterableInboxMessageDisplay from './IterableInboxMessageDisplay'

import InboxRowViewModel from './InboxRowViewModel'
import { IterableInAppDeleteSource } from './IterableInAppClasses'
import IterableInboxDataModel from './IterableInboxDataModel'
import Customization from './customizationType'

type inboxProps = {
   customization: Customization
}

const IterableInbox = ({ 
   customization
}: inboxProps) => {
   const defaultInboxTitle = "Inbox"
   const [isDisplayMessage, setIsDisplayMessage] = useState<boolean>(false)
   const [selectedMessageIdx, setSelectedMessageIdx] = useState<number>(0)
   const [rowViewModels, setRowViewModels] = useState<InboxRowViewModel[]>([])

   const inboxDataModel = new IterableInboxDataModel()
   // const inboxDeleteSource = new IterableInAppDeleteSource()

   const fetchData = async () => {
      let newRowViewModels = await inboxDataModel.refresh()

      newRowViewModels = newRowViewModels.map((rowViewModel, index) => {
         return {...rowViewModel, last: index === newRowViewModels.length - 1}
      })

      setRowViewModels(newRowViewModels)
   }

   useEffect(() => {
      fetchData()
   }, [])

   const selectedMessage = rowViewModels[selectedMessageIdx]

   function handleMessageSelect(id: string, index: number, rowViewModels: InboxRowViewModel[]) {
      let newRowViewModels = rowViewModels.map((rowViewModel) => {
         return (rowViewModel.inAppMessage.messageId === id) ?
            {...rowViewModel, read: true } : rowViewModel
      })
      setRowViewModels(rowViewModels)
      inboxDataModel.setItemAsRead(index)

      setIsDisplayMessage(true)
      setSelectedMessageIdx(index)
   }

   const deleteMessage = (id: string, index: number, rowViewModels: InboxRowViewModel[]) => {
      inboxDataModel.deleteItem(index, IterableInAppDeleteSource.inboxSwipe)
      
      let newRowViewModels = rowViewModels.filter((rowViewModel) => {
         return rowViewModel.inAppMessage.messageId !== id
      })

      console.log(newRowViewModels)

      // let newRowViewModels = rowViewModels.splice(index, 1)
      
      newRowViewModels[newRowViewModels.length - 1] = {...newRowViewModels[newRowViewModels.length - 1], last: true}
      setRowViewModels(newRowViewModels)
   }

   function returnToInbox() {
      setIsDisplayMessage(false)
   }
   
   function showMessageDisplay(message: InboxRowViewModel) {
      return (
         <IterableInboxMessageDisplay
            message={message}
            returnToInbox={() => returnToInbox()}
         ></IterableInboxMessageDisplay>)
   }

   function showMessageList() {
      return (
         <>
            <Text style={styles.headline}>
               {customization.navTitle ? customization.navTitle : defaultInboxTitle}
            </Text>
            { rowViewModels.length ?
               <IterableInboxMessageList 
                  rowViewModels={rowViewModels}
                  customization={customization}
                  deleteMessage={(id: string, index: number) => deleteMessage(id, index, rowViewModels)}
                  handleMessageSelect={(id: string, index: number) => handleMessageSelect(id, index, rowViewModels)}
               />  : 
               <IterableInboxEmptyState customization={customization} />
            }
         </>)
   }

   return(
      <SafeAreaView style={styles.container}>    
         {isDisplayMessage ? 
            showMessageDisplay(selectedMessage) : 
            showMessageList()}
      </SafeAreaView>
   )
}

const styles = StyleSheet.create({
   container: {
      height: '100%'
   },
   headline: {
      fontWeight: 'bold' ,
      fontSize: 40,
      width: '100%',
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 15,
      backgroundColor: 'whitesmoke'
   }
})

export default IterableInbox
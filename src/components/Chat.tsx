import React, { useState } from 'react';

//lib
import { IoMdChatbubbles } from 'react-icons/io';

// custom
import { ChatProps, Message } from '../types/ChatProps';
import { useMainContext } from '@/contexts/main_context';


const Chat: React.FC<ChatProps> = (props) => {
  const {player} = useMainContext()
  const [msgList , setMsgList] = useState<Message[]>([
    {name : 'CPU1' , text : "Hello"},
    {name : 'CPU2' , text : "Hello"},
    {name : 'CPU3' , text : "Hello"},
    {name : 'CPU4' , text : "Hello"},
    {name : 'CPU1' , text : "@You , are you here?"},
  ])
  const [currentMsg , serCurrentMsg] = useState<string>('')

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    serCurrentMsg(e.target.value);
  };

  const handleSendMsg = () => {
    if(currentMsg.length > 0){
      setMsgList( (prev) => [...prev , {name : 'You' , text : currentMsg}])
      serCurrentMsg('');
    }
  }

  return (
    <div className='w-full md:col-span-6 col-span-12 flex flex-col space-y-2 md:py-0 py-10'>
      {/* title */}
      <h2 className='flex flex-row items-center space-x-2'>
        <IoMdChatbubbles className='w-6 h-6 text-red-600' />
        <span className='text-2xl font-semibold'>Chat</span>
      </h2>
      {/* content */}
      <div className='w-full bg-gray-600  border border-gray-800 rounded-md h-[230px]'>
        {/* messages */}
        <div id={'chatSec'} className='h-[150px] max-h-[180px] overflow-y-auto pt-8 pb-2 px-4 flex flex-col space-y-2'>
          {/* msg item */}
          {(player.name.length > 0 && msgList.length > 0) && msgList.map( (msg) => {
            return (
                <p key={msg.name} className='flex flex-row items-center space-x-2'>
                  {/* name */}
                  <span className='text-sm text-pink-700 font-semibold'>
                    {`${msg.name} :`}
                  </span>
                  {/* content */}
                  <span className='text-white text-xs bg-gray-500 rounded-md p-1'>
                    {msg.text}
                  </span>
                </p>
            )
          })}

        </div>
        {/* msg form */}
        <div className='w-full h-[80px] bg-gray-800 rounded-b-md flex flex-row space-x-3 items-center justify-center px-2'>
          <input
            type="text"
            value={currentMsg}
            onChange={handleInput}
            className='outline-none bg-clr-main-black-1 py-2 px-5 rounded-md w-9/12'
            disabled={player.name.length === 0}
          />
          <button
            onClick={handleSendMsg}
            className='py-2 px-4 text-white bg-pink-700 bg-gradient-to-r from-pink-700 to-orange-500 hover:shadow hover:shadow-pink-700 rounded-md w-3/12'
            disabled={player.name.length === 0}
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
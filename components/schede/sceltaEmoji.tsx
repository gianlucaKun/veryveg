import React from 'react'
import { Entypo } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';

interface sceltaEmojiProps{
    risultato?: string;
    colore?: string;
}

const SceltaEmoji: React.FC<sceltaEmojiProps> = ({risultato , colore}) => {
    switch (risultato){
        case 'ok':
            return (<Entypo name="emoji-happy" size={36} color={colore} />);
        break;
        case 'mmh':
            return (<Entypo name="emoji-neutral" size={36} colore={colore} />);
        break;
        case 'nope':
            return(<Entypo name="emoji-sad" size={36} color={colore} />);
        break;
        case 'flirt':
            return (<Entypo name="emoji-flirt" size={36} color={colore} />);
        break;
        case '?':
            return (<FontAwesome6 name="circle-question" size={36} color='#926FFF' />);
        break
    }
}

export default SceltaEmoji;
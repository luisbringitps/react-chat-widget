import format from 'date-fns/format';
import markdownIt from 'markdown-it';
import markdownItSup from 'markdown-it-sup';
import markdownItSanitizer from 'markdown-it-sanitizer';
import markdownItClass from '@toycode/markdown-it-class';
import markdownItLinkAttributes from 'markdown-it-link-attributes';

import { MessageTypes } from 'src/store/types';

import './styles.scss';

type Props = {
  message: MessageTypes;
  showTimeStamp: boolean;
  bottom: string;
}

function Message({ message }: Props) {
  
  
  const sanitizedHTML = markdownIt({ break: true })
    .use(markdownItClass, {
      img: ['rcw-message-img']
    })
    .use(markdownItSup)
    .use(markdownItSanitizer)
    .use(markdownItLinkAttributes, { attrs: { target: '_blank', rel: 'noopener' } })
    .render(message.text);

  return (
    <div className={`rcw-${message.sender}`}>
      {
        isLink(message.text) ?
          <div className="rcw-message-text">
            <a href={starLink(message.text)} className="rcw-link" target="_blank" rel="noopener noreferrer">
              {message.text}
            </a>
          </div>
        :
          <div className="rcw-message-text" dangerouslySetInnerHTML={{ __html: sanitizedHTML.replace(/\n$/,'') }} />
      }
      
      {<span className="rcw-timestamp">{message.footer} </span>}
    </div>
  );
}

function isLink(message:string){
  return validURL(message);
}

function validURL(str:string) {
  // var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  //   '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
  //   '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  //   '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  //   '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  //   '(\\#[-a-z\\d_]*)?$','i'); // fragment locator


  // return !!pattern.test(str);
  const res = str.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  return (res !== null)
}

function starLink(link:string){
  return link.includes("http://") || link.includes("https://") ? link : `\\/\\${link}`;
}

export default Message;

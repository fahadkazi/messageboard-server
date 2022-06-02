import { Message } from 'entities/Message'
import { EventSubscriber, EntitySubscriberInterface } from 'typeorm'

@EventSubscriber()
export class MessageSubscriber implements EntitySubscriberInterface<Message> {
  /**
   * Indicates that this subscriber only listen to Post events.
   */
  listenTo() {
    return Message
  }
}

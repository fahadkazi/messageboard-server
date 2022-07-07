import { Arg, InputType, Int, Mutation, Query, Resolver, Subscription, PubSub, PubSubEngine, Root } from 'type-graphql'
import { Message } from '../entities/Message'
@InputType()
@Resolver(Message)
export class MessageResolver {
  @Query(() => [Message])
  async messages(): Promise<Message[]> {
    return Message.find()
  }

  @Query(() => Message, { nullable: true })
  message(@Arg('_id', () => Int) _id: number): Promise<Message | undefined> {
    return Message.findOne(_id)
  }

  @Mutation(() => Message)
  async createMessage(@Arg('text') text: string, @PubSub() pubSub: PubSubEngine): Promise<Message> {
    const message = await Message.create({ text }).save()
    await pubSub.publish('MESSAGE_CREATED', message)
    return message
  }

  @Mutation(() => Message, { nullable: true })
  async updateMessage(@Arg('_id', () => Int) _id: number, @Arg('text') text: string): Promise<Message | null> {
    const msg = await Message.findOne(_id)
    if (!msg) {
      return null
    }
    if (typeof text !== 'undefined') {
      await Message.update({ _id }, { text })
    }
    return msg
  }

  @Mutation(() => Boolean)
  async deleteMessage(@Arg('_id', () => Int) _id: number): Promise<boolean> {
    await Message.delete(_id)
    return true
  }

  @Subscription({ topics: 'MESSAGE_CREATED' })
  messageSent(@Root() message: Message): Message {
    return message
  }
}
